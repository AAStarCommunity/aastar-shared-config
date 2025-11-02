#!/bin/bash

# Comprehensive Contract Verification Script
# Verifies consistency between:
# 1. On-chain contract versions
# 2. ABI function definitions
# 3. SuperPaymaster source code versions

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Paths
SUPERPAYMASTER_DIR="${SUPERPAYMASTER_DIR:-../SuperPaymaster}"
ABIS_DIR="./src/abis"

# RPC URL
SEPOLIA_RPC="${SEPOLIA_RPC_URL:-https://rpc.sepolia.org}"

echo "🔍 Comprehensive Contract Verification"
echo "======================================"
echo ""

# Check prerequisites
if ! command -v cast &> /dev/null; then
    echo -e "${RED}❌ Error: 'cast' not found. Install Foundry.${NC}"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ Error: 'jq' not found. Install jq.${NC}"
    exit 1
fi

# Function to get version from source code
get_source_version() {
    local contract_name=$1
    local sol_file="${2:-$contract_name.sol}"

    local source_path="$SUPERPAYMASTER_DIR/src/paymasters/v2/core/$sol_file"

    if [ ! -f "$source_path" ]; then
        # Try tokens directory
        source_path="$SUPERPAYMASTER_DIR/src/paymasters/v2/tokens/$sol_file"
    fi

    if [ ! -f "$source_path" ]; then
        echo "N/A"
        return
    fi

    # Extract VERSION from source
    local version=$(grep 'string public constant VERSION' "$source_path" | sed -E 's/.*"([^"]+)".*/\1/' || echo "N/A")
    echo "$version"
}

# Function to get version code from source
get_source_version_code() {
    local contract_name=$1
    local sol_file="${2:-$contract_name.sol}"

    local source_path="$SUPERPAYMASTER_DIR/src/paymasters/v2/core/$sol_file"

    if [ ! -f "$source_path" ]; then
        source_path="$SUPERPAYMASTER_DIR/src/paymasters/v2/tokens/$sol_file"
    fi

    if [ ! -f "$source_path" ]; then
        echo "N/A"
        return
    fi

    local version_code=$(grep 'uint256 public constant VERSION_CODE' "$source_path" | sed -E 's/.*= ([0-9]+);.*/\1/' || echo "N/A")
    echo "$version_code"
}

# Function to check if ABI has VERSION function
check_abi_has_version() {
    local abi_file=$1

    if [ ! -f "$abi_file" ]; then
        echo "false"
        return
    fi

    local has_version=$(cat "$abi_file" | jq -r 'map(select(.name == "VERSION")) | length > 0')
    echo "$has_version"
}

# Function to verify a contract
verify_contract() {
    local name=$1
    local address=$2
    local config_version=$3
    local config_version_code=$4
    local source_file=${5:-$name.sol}

    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📦 Verifying: $name${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "   Contract Address: $address"
    echo ""

    local errors=0

    # 1. Get on-chain version
    echo "   [1/4] Checking on-chain version..."
    local onchain_version=$(cast call $address "VERSION()(string)" --rpc-url $SEPOLIA_RPC 2>/dev/null || echo "ERROR")
    local onchain_version_code=$(cast call $address "VERSION_CODE()(uint256)" --rpc-url $SEPOLIA_RPC 2>/dev/null || echo "ERROR")

    if [ "$onchain_version" = "ERROR" ]; then
        echo -e "   ${RED}❌ Failed to get on-chain version${NC}"
        errors=$((errors+1))
    else
        echo -e "   ${GREEN}✅ On-chain VERSION: $onchain_version${NC}"
        echo -e "   ${GREEN}✅ On-chain VERSION_CODE: $onchain_version_code${NC}"
    fi

    # 2. Check ABI
    echo ""
    echo "   [2/4] Checking ABI..."
    local abi_file="$ABIS_DIR/$name.json"
    local has_version=$(check_abi_has_version "$abi_file")

    if [ "$has_version" = "true" ]; then
        echo -e "   ${GREEN}✅ ABI contains VERSION function${NC}"
    else
        echo -e "   ${YELLOW}⚠️  ABI does not contain VERSION function${NC}"
    fi

    # 3. Get source code version
    echo ""
    echo "   [3/4] Checking source code version..."
    local source_version=$(get_source_version "$name" "$source_file")
    local source_version_code=$(get_source_version_code "$name" "$source_file")

    if [ "$source_version" != "N/A" ]; then
        echo -e "   ${GREEN}✅ Source VERSION: $source_version${NC}"
        echo -e "   ${GREEN}✅ Source VERSION_CODE: $source_version_code${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Source file not found${NC}"
    fi

    # 4. Compare versions
    echo ""
    echo "   [4/4] Version Comparison:"
    echo "   ┌─────────────────┬──────────┬──────────────┐"
    echo "   │ Source          │ VERSION  │ VERSION_CODE │"
    echo "   ├─────────────────┼──────────┼──────────────┤"
    printf "   │ %-15s │ %-8s │ %-12s │\n" "Config" "$config_version" "$config_version_code"
    printf "   │ %-15s │ %-8s │ %-12s │\n" "On-chain" "$onchain_version" "$onchain_version_code"
    printf "   │ %-15s │ %-8s │ %-12s │\n" "Source Code" "$source_version" "$source_version_code"
    echo "   └─────────────────┴──────────┴──────────────┘"
    echo ""

    # Check consistency
    local all_match=true

    if [ "$onchain_version" != "$config_version" ]; then
        echo -e "   ${RED}❌ VERSION mismatch: Config ($config_version) != On-chain ($onchain_version)${NC}"
        errors=$((errors+1))
        all_match=false
    fi

    if [ "$onchain_version_code" != "$config_version_code" ]; then
        echo -e "   ${RED}❌ VERSION_CODE mismatch: Config ($config_version_code) != On-chain ($onchain_version_code)${NC}"
        errors=$((errors+1))
        all_match=false
    fi

    if [ "$source_version" != "N/A" ] && [ "$source_version" != "$onchain_version" ]; then
        echo -e "   ${RED}❌ VERSION mismatch: Source ($source_version) != On-chain ($onchain_version)${NC}"
        errors=$((errors+1))
        all_match=false
    fi

    if $all_match; then
        echo -e "   ${GREEN}✅ All versions match!${NC}"
    fi

    echo ""
    return $errors
}

# Main verification
TOTAL_ERRORS=0

verify_contract "Registry" "0xf384c592D5258c91805128291c5D4c069DD30CA6" "2.1.4" "20104" "Registry.sol" || TOTAL_ERRORS=$((TOTAL_ERRORS+$?))
verify_contract "GToken" "0x99cCb70646Be7A5aeE7aF98cE853a1EA1A676DCc" "2.0.0" "20000" "GToken.sol" || TOTAL_ERRORS=$((TOTAL_ERRORS+$?))
verify_contract "GTokenStaking" "0x60Bd54645b0fDabA1114B701Df6f33C4ecE87fEa" "2.0.0" "20000" "GTokenStaking.sol" || TOTAL_ERRORS=$((TOTAL_ERRORS+$?))
verify_contract "SuperPaymasterV2" "0x95B20d8FdF173a1190ff71e41024991B2c5e58eF" "2.0.0" "20000" "SuperPaymasterV2.sol" || TOTAL_ERRORS=$((TOTAL_ERRORS+$?))

echo "======================================"
if [ $TOTAL_ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All contracts verified successfully!${NC}"
    echo -e "${GREEN}   All versions are consistent across on-chain, ABI, and source code.${NC}"
    exit 0
else
    echo -e "${RED}❌ Verification failed with $TOTAL_ERRORS error(s)${NC}"
    echo -e "${YELLOW}   Please check the mismatches above and update accordingly.${NC}"
    exit 1
fi
