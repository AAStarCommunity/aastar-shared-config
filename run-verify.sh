#!/bin/bash
# Load environment variables from SuperPaymaster
set -a
source ../SuperPaymaster/env/.env
set +a

# Run verification
./verify-onchain-versions.sh
