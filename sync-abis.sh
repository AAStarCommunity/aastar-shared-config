#!/bin/bash

# Sync ABIs from SuperPaymaster repository
# This script copies the latest compiled ABIs from SuperPaymaster to shared-config

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Paths
SUPERPAYMASTER_DIR="${SUPERPAYMASTER_DIR:-../SuperPaymaster}"
ABIS_DIR="./src/abis"

echo "🔄 Syncing ABIs from SuperPaymaster"
echo "==================================="
echo ""

# Check if SuperPaymaster directory exists
if [ ! -d "$SUPERPAYMASTER_DIR" ]; then
    echo -e "${RED}❌ Error: SuperPaymaster directory not found at $SUPERPAYMASTER_DIR${NC}"
    echo "   Please set SUPERPAYMASTER_DIR environment variable or ensure ../SuperPaymaster exists"
    exit 1
fi

# Check if out directory exists
if [ ! -d "$SUPERPAYMASTER_DIR/out" ]; then
    echo -e "${YELLOW}⚠️  Warning: $SUPERPAYMASTER_DIR/out not found. Running forge build...${NC}"
    (cd "$SUPERPAYMASTER_DIR" && forge build)
fi

# Function to sync ABI
sync_abi() {
    local contract_name=$1
    local sol_file=$2
    local output_name=${3:-$contract_name}

    local source_file="$SUPERPAYMASTER_DIR/out/$sol_file/$contract_name.json"
    local dest_file="$ABIS_DIR/$output_name.json"

    if [ ! -f "$source_file" ]; then
        echo -e "${RED}❌ Source ABI not found: $source_file${NC}"
        return 1
    fi

    # Extract only the ABI field (compact single-line format)
    cat "$source_file" | jq -c '.abi' > "$dest_file"

    echo -e "${GREEN}✅ Synced $contract_name${NC}"
    echo "   Source: $source_file"
    echo "   Dest:   $dest_file"

    # Show contract version if available
    local version=$(cat "$source_file" | jq -r '.abi[] | select(.name == "VERSION") | .outputs[0].internalType' 2>/dev/null || echo "")
    if [ ! -z "$version" ]; then
        echo "   Has VERSION interface"
    fi

    echo ""
}

# Sync each contract ABI
echo "Syncing contract ABIs..."
echo ""

# Core System
sync_abi "Registry" "Registry.sol" "Registry"
sync_abi "GToken" "GToken.sol" "GToken"
sync_abi "GTokenStaking" "GTokenStaking.sol" "GTokenStaking"
sync_abi "SuperPaymasterV2" "SuperPaymasterV2.sol" "SuperPaymasterV2"
sync_abi "PaymasterFactory" "PaymasterFactory.sol" "PaymasterFactory"

# Token System
sync_abi "xPNTsToken" "xPNTsToken.sol" "xPNTsToken"
sync_abi "MySBT_v2_4_3" "MySBT_v2.4.3.sol" "MySBT"
sync_abi "xPNTsFactory" "xPNTsFactory.sol" "xPNTsFactory"

# Monitoring System
sync_abi "DVTValidator" "DVTValidator.sol" "DVTValidator"
sync_abi "BLSAggregator" "BLSAggregator.sol" "BLSAggregator"

echo "==================================="
echo -e "${GREEN}✅ ABI sync completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Review the changes: git diff src/abis/"
echo "2. Update src/abis/index.ts if new ABIs were added"
echo "3. Run: npm run build"
echo "4. Commit the changes"
