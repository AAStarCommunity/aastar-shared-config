#!/bin/bash

# Shared-Config Contract Verification Script
# Verifies that on-chain contracts match ABI versions and source code versions

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# RPC URL (replace with your private RPC)
SEPOLIA_RPC="${SEPOLIA_RPC_URL:-https://rpc.sepolia.org}"

echo "🔍 Contract Verification Script"
echo "================================"
echo ""

# Load contract addresses from config
REGISTRY_ADDR="0xf384c592D5258c91805128291c5D4c069DD30CA6"
GTOKEN_ADDR="0x99cCb70646Be7A5aeE7aF98cE853a1EA1A676DCc"
GTOKEN_STAKING_ADDR="0x60Bd54645b0fDabA1114B701Df6f33C4ecE87fEa"
SUPER_PAYMASTER_ADDR="0x95B20d8FdF173a1190ff71e41024991B2c5e58eF"

# Check if cast is available
if ! command -v cast &> /dev/null; then
    echo -e "${RED}❌ Error: 'cast' command not found. Please install Foundry.${NC}"
    exit 1
fi

# Function to check contract version
check_contract() {
    local name=$1
    local address=$2
    local expected_version=$3
    local expected_version_code=$4

    echo "📦 Checking $name"
    echo "   Address: $address"

    # Get on-chain VERSION
    local onchain_version=$(cast call $address "VERSION()(string)" --rpc-url $SEPOLIA_RPC 2>/dev/null || echo "N/A")
    echo "   On-chain VERSION: $onchain_version"

    # Get on-chain VERSION_CODE
    local onchain_version_code=$(cast call $address "VERSION_CODE()(uint256)" --rpc-url $SEPOLIA_RPC 2>/dev/null || echo "N/A")
    echo "   On-chain VERSION_CODE: $onchain_version_code"

    # Compare versions
    if [ "$onchain_version" = "$expected_version" ]; then
        echo -e "   ${GREEN}✅ VERSION matches (expected: $expected_version)${NC}"
    else
        echo -e "   ${RED}❌ VERSION mismatch (expected: $expected_version, got: $onchain_version)${NC}"
        return 1
    fi

    if [ "$onchain_version_code" = "$expected_version_code" ]; then
        echo -e "   ${GREEN}✅ VERSION_CODE matches (expected: $expected_version_code)${NC}"
    else
        echo -e "   ${RED}❌ VERSION_CODE mismatch (expected: $expected_version_code, got: $onchain_version_code)${NC}"
        return 1
    fi

    echo ""
    return 0
}

# Check each contract
FAILED=0

check_contract "Registry" "$REGISTRY_ADDR" "2.1.4" "20104" || FAILED=$((FAILED+1))
check_contract "GToken" "$GTOKEN_ADDR" "2.0.0" "20000" || FAILED=$((FAILED+1))
check_contract "GTokenStaking" "$GTOKEN_STAKING_ADDR" "2.0.0" "20000" || FAILED=$((FAILED+1))
check_contract "SuperPaymasterV2" "$SUPER_PAYMASTER_ADDR" "2.0.0" "20000" || FAILED=$((FAILED+1))

echo "================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All contracts verified successfully!${NC}"
    exit 0
else
    echo -e "${RED}❌ $FAILED contract(s) failed verification${NC}"
    exit 1
fi
