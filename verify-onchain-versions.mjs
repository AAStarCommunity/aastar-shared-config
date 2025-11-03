#!/usr/bin/env node
/**
 * Verify on-chain contract versions against config
 * Dynamically reads contracts from contract-versions.ts instead of hardcoding
 */

import { execSync } from 'child_process';
import { getAllV2Contracts } from './dist/index.js';

const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org';

// Colors
const colors = {
  green: '\033[0;32m',
  red: '\033[0;31m',
  yellow: '\033[1;33m',
  blue: '\033[0;34m',
  nc: '\033[0m',
};

console.log('╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                                    On-Chain Version Verification Table                                                     ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`RPC: ${SEPOLIA_RPC}`);
console.log('');

// Check if cast is available
try {
  execSync('cast --version', { stdio: 'pipe' });
} catch {
  console.error(`${colors.red}❌ Error: 'cast' command not found. Please install Foundry.${colors.nc}`);
  process.exit(1);
}

function getOnchainVersion(address) {
  try {
    const result = execSync(
      `cast call "${address}" "VERSION()(string)" --rpc-url "${SEPOLIA_RPC}"`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );
    return result.trim().replaceAll('"', '');
  } catch {
    return 'ERROR';
  }
}

function getOnchainVersionCode(address) {
  try {
    const result = execSync(
      `cast call "${address}" "VERSION_CODE()(uint256)" --rpc-url "${SEPOLIA_RPC}"`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );
    return result.trim().split(/\s+/)[0];
  } catch {
    return 'ERROR';
  }
}

// Table Header
const header = `| %-18s | %-42s | %-7s | %-7s | %s | %-12s | %-12s | %s |`;
console.log(
  `| Contract Name      | Address                                    | Config  | On-Chain | ✓ | Config Code  | On-Chain Code | ✓ |`
);
console.log(
  '|────────────────────|──────────────────────────────────────────|─────────|─────────|───|──────────────|──────────────|───|'
);

// Get all V2 contracts from config (no hardcoding!)
const contracts = getAllV2Contracts();

// Print each contract
contracts.forEach((contract) => {
  process.stdout.write(`Checking ${contract.name}...`);

  const onchainVersion = getOnchainVersion(contract.address);
  const onchainVersionCode = getOnchainVersionCode(contract.address);

  // Clear the "Checking..." line
  process.stdout.write('\r\x1b[K');

  const versionMatch = onchainVersion === contract.version ? '✅' : '❌';
  const versionCodeMatch = onchainVersionCode === String(contract.versionCode) ? '✅' : '❌';

  console.log(
    `| ${contract.name.padEnd(18)} | ${contract.address.padEnd(42)} | ${contract.version.padEnd(7)} | ${onchainVersion.padEnd(7)} | ${versionMatch} | ${String(contract.versionCode).padEnd(12)} | ${onchainVersionCode.padEnd(12)} | ${versionCodeMatch} |`
  );
});

console.log('');
console.log('Legend: ✅ = Match, ❌ = Mismatch or Error');
console.log('');
console.log('Note: This verification queries on-chain data and may take a few minutes depending on RPC response time.');
