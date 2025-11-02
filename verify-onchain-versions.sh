#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# RPC URL
SEPOLIA_RPC="${SEPOLIA_RPC_URL:-https://rpc.sepolia.org}"

echo "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗"
echo "║                                    On-Chain Version Verification Table                                                     ║"
echo "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "RPC: $SEPOLIA_RPC"
echo ""

# Check if cast is available
if ! command -v cast &> /dev/null; then
    echo -e "${RED}❌ Error: 'cast' command not found. Please install Foundry.${NC}"
    exit 1
fi

get_onchain_version() {
    local address=$1
    local version=$(cast call "$address" "VERSION()(string)" --rpc-url "$SEPOLIA_RPC" 2>/dev/null || echo "ERROR")
    echo "$version"
}

get_onchain_version_code() {
    local address=$1
    local version_code=$(cast call "$address" "VERSION_CODE()(uint256)" --rpc-url "$SEPOLIA_RPC" 2>/dev/null || echo "ERROR")
    echo "$version_code"
}

print_verification_row() {
    local name=$1
    local address=$2
    local config_version=$3
    local config_version_code=$4
    
    echo -ne "Checking $name..."
    
    local onchain_version=$(get_onchain_version "$address")
    local onchain_version_code=$(get_onchain_version_code "$address")
    
    # Clear the "Checking..." line
    echo -ne "\r\033[K"
    
    # Status indicators
    local version_match="❌"
    local version_code_match="❌"
    
    if [ "$onchain_version" = "$config_version" ]; then
        version_match="✅"
    fi
    
    if [ "$onchain_version_code" = "$config_version_code" ]; then
        version_code_match="✅"
    fi
    
    printf "| %-18s | %-42s | %-7s | %-7s | %s | %-12s | %-12s | %s |\n" \
        "$name" "$address" "$config_version" "$onchain_version" "$version_match" \
        "$config_version_code" "$onchain_version_code" "$version_code_match"
}

# Table Header
printf "| %-18s | %-42s | %-7s | %-7s | %s | %-12s | %-12s | %s |\n" \
    "Contract Name" "Address" "Config" "On-Chain" "✓" "Config Code" "On-Chain Code" "✓"
echo "|────────────────────|──────────────────────────────────────────|─────────|─────────|───|──────────────|──────────────|───|"

# Core System
print_verification_row "Registry" "0xf384c592D5258c91805128291c5D4c069DD30CA6" "2.1.4" "20104"
print_verification_row "GToken" "0x99cCb70646Be7A5aeE7aF98cE853a1EA1A676DCc" "2.0.0" "20000"
print_verification_row "GTokenStaking" "0x60Bd54645b0fDabA1114B701Df6f33C4ecE87fEa" "2.0.0" "20000"
print_verification_row "SuperPaymasterV2" "0x95B20d8FdF173a1190ff71e41024991B2c5e58eF" "2.0.0" "20000"
print_verification_row "PaymasterFactory" "0x65Cf6C4ab3d40f3C919b6F3CADC09Efb72817920" "1.0.0" "10000"

# Token System
print_verification_row "xPNTsFactory" "0x9dD72cB42427fC9F7Bf0c949DB7def51ef29D6Bd" "2.0.0" "20000"
print_verification_row "MySBT" "0x73E635Fc9eD362b7061495372B6eDFF511D9E18F" "2.4.0" "20400"

# Test Tokens (same ABI as xPNTsToken)
print_verification_row "aPNTs" "0xBD0710596010a157B88cd141d797E8Ad4bb2306b" "2.0.0" "20000"
print_verification_row "bPNTs" "0xF223660d24c436B5BfadFEF68B5051bf45E7C995" "2.0.0" "20000"

# Monitoring System
print_verification_row "DVTValidator" "0x937CdD172fb0674Db688149093356F6dA95498FD" "2.0.0" "20000"
print_verification_row "BLSAggregator" "0x3Cf0587912c692aa0f5FEEEDC52959ABEEEFaEc6" "2.0.0" "20000"

echo ""
echo "Legend: ✅ = Match, ❌ = Mismatch or Error"
echo ""
echo "Note: This verification queries on-chain data and may take a few minutes depending on RPC response time."
