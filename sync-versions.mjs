#!/usr/bin/env node
/**
 * Auto-sync contract versions from on-chain data
 * Reads VERSION and VERSION_CODE from deployed contracts and updates contract-versions.ts
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { getAllV2Contracts } from './dist/index.js';

// Load .env file if it exists
function loadEnvFile(filePath) {
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf-8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...values] = trimmed.split('=');
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join('=').trim();
        }
      }
    });
  }
}

// Load .env files in order of precedence
loadEnvFile('.env.local');
loadEnvFile('.env');

const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org';

// Colors
const colors = {
  green: '\x1b[0;32m',
  red: '\x1b[0;31m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[0;34m',
  nc: '\x1b[0m',
};

console.log('🔄 Auto-syncing contract versions from on-chain data');
console.log('==================================================');
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
    return null;
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
    return null;
  }
}

// Read current contract-versions.ts file
const versionsFilePath = './src/contract-versions.ts';
let content = readFileSync(versionsFilePath, 'utf-8');

// Get all V2 contracts from config
const contracts = getAllV2Contracts();
let hasUpdates = false;

console.log('Checking contracts for version updates...');
console.log('');

contracts.forEach((contract) => {
  process.stdout.write(`Checking ${contract.name}...`);

  const onchainVersion = getOnchainVersion(contract.address);
  const onchainVersionCode = getOnchainVersionCode(contract.address);

  // Clear the "Checking..." line
  process.stdout.write('\r\x1b[K');

  if (!onchainVersion || !onchainVersionCode) {
    console.log(`${colors.yellow}⚠️  ${contract.name}: No VERSION interface found${colors.nc}`);
    return;
  }

  const versionChanged = onchainVersion !== contract.version;
  const versionCodeChanged = onchainVersionCode !== String(contract.versionCode);

  if (versionChanged || versionCodeChanged) {
    hasUpdates = true;
    
    console.log(`${colors.yellow}🔄 ${contract.name}: Update needed${colors.nc}`);
    console.log(`   Version: ${contract.version} → ${onchainVersion}`);
    console.log(`   Code: ${contract.versionCode} → ${onchainVersionCode}`);
    
    // Update version in the file
    const versionRegex = new RegExp(`(${contract.name}:[\\s\\S]*?version:\\s*['"])${contract.version}(['"])`, 'g');
    content = content.replace(versionRegex, `$1${onchainVersion}$2`);
    
    // Update version code in the file
    const versionCodeRegex = new RegExp(`(${contract.name}:[\\s\\S]*?versionCode:\\s*)${contract.versionCode}`, 'g');
    content = content.replace(versionCodeRegex, `$1${onchainVersionCode}`);
    
    // Update deployedAt to today's date
    const today = new Date().toISOString().split('T')[0];
    const deployedAtRegex = new RegExp(`(${contract.name}:[\\s\\S]*?deployedAt:\\s*['"])[^'"]*(['"])`, 'g');
    content = content.replace(deployedAtRegex, `$1${today}$2`);
    
  } else {
    console.log(`${colors.green}✅ ${contract.name}: Up to date${colors.nc}`);
  }
});

console.log('');

if (hasUpdates) {
  // Write updated content back to file
  writeFileSync(versionsFilePath, content);
  console.log(`${colors.green}✅ Contract versions updated successfully!${colors.nc}`);
  console.log('');
  console.log('Updated file: src/contract-versions.ts');
  console.log('');
  console.log('Next steps:');
  console.log('1. Review the changes: git diff src/contract-versions.ts');
  console.log('2. Run: npm run build');
  console.log('3. Commit the changes');
} else {
  console.log(`${colors.green}✅ All contracts are up to date!${colors.nc}`);
}

console.log('');
console.log('Note: This script only updates contracts with VERSION interface.');