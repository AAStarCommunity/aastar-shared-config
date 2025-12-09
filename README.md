# @aastar/shared-config

Centralized configuration package for AAstar Community projects. Provides contract addresses, network configurations, ABIs, and constants for all AAstar ecosystem applications.

## Installation

```bash
npm install @aastar/shared-config
# or
pnpm add @aastar/shared-config
# or
yarn add @aastar/shared-config
```

## Features

- **Type-safe contract addresses** for all AAstar ecosystem contracts
- **Contract version tracking** with VERSION interface support
- **Network configurations** with RPC URLs and block explorers
- **Helper functions** for common queries
- **Contract ABIs** for direct integration (13 ABIs included)
- **Deployment metadata** tracking
- **Verification scripts** for contract version validation
- **Multi-chain support** (Sepolia testnet, with mainnet support coming soon)

## Quick Start

```typescript
import {
  getContracts,
  getSuperPaymasterV2,
  getNetworks,
  getTxUrl,
  getV2ContractByName
} from '@aastar/shared-config';

// Get all contracts for Sepolia
const contracts = getContracts('sepolia');
console.log(contracts.core.superPaymasterV2);
// Output: '0x95B20d8FdF173a1190ff71e41024991B2c5e58eF'

// Get contract version info
const registry = getV2ContractByName('Registry');
console.log(registry.version); // '2.1.4'
console.log(registry.versionCode); // 20104

// Generate transaction URL
const txUrl = getTxUrl('sepolia', '0x123...');
// Output: 'https://sepolia.etherscan.io/tx/0x123...'
```

## Contract Addresses (Sepolia Testnet)

### Core System Contracts (V2 with VERSION Interface)

| Contract | Version | Address | Deployed | Features |
|----------|---------|---------|----------|----------|
| **Registry** | 2.1.4 | `0xf384c592D5258c91805128291c5D4c069DD30CA6` | 2025-11-02 | allowPermissionlessMint default true |
| **GToken** | 2.0.0 | `0x99cCb70646Be7A5aeE7aF98cE853a1EA1A676DCc` | 2025-11-01 | Governance token |
| **GTokenStaking** | 2.0.0 | `0x60Bd54645b0fDabA1114B701Df6f33C4ecE87fEa` | 2025-11-01 | 1:1 shares, user-level slash |
| **SuperPaymasterV2** | 2.0.0 | `0x95B20d8FdF173a1190ff71e41024991B2c5e58eF` | 2025-11-01 | Unified architecture |
| **PaymasterFactory** | 1.0.0 | `0x65Cf6C4ab3d40f3C919b6F3CADC09Efb72817920` | 2025-11-01 | EIP-1167 proxy factory |

### Token System

| Contract | Version | Address | Deployed | Features |
|----------|---------|---------|----------|----------|
| **xPNTsFactory** | 2.0.0 | `0x9dD72cB42427fC9F7Bf0c949DB7def51ef29D6Bd` | 2025-11-01 | Gas token factory |
| **MySBT** | 2.4.0 | `0x73E635Fc9eD362b7061495372B6eDFF511D9E18F` | 2025-11-01 | NFT architecture refactor |
| **aPNTs** (test) | 2.0.0 | `0xBD0710596010a157B88cd141d797E8Ad4bb2306b` | 2025-11-01 | AAStar community token |
| **bPNTs** (test) | 2.0.0 | `0xF223660d24c436B5BfadFEF68B5051bf45E7C995` | 2025-11-01 | BuilderDAO community token |

### Monitoring System

| Contract | Version | Address | Deployed | Features |
|----------|---------|---------|----------|----------|
| **DVTValidator** | 2.0.0 | `0x937CdD172fb0674Db688149093356F6dA95498FD` | 2025-11-01 | Distributed validator |
| **BLSAggregator** | 2.0.0 | `0x3Cf0587912c692aa0f5FEEEDC52959ABEEEFaEc6` | 2025-11-01 | BLS signature aggregation |

### Official Dependencies

| Contract | Address | Network |
|----------|---------|---------|
| **EntryPoint v0.7** | `0x0000000071727De22E5E9d8BAf0edAc6f37da032` | Cross-chain |

## Contract Version Interface

All V2 contracts implement the VERSION interface:

```solidity
interface IVersioned {
    function VERSION() external view returns (string memory);
    function VERSION_CODE() external view returns (uint256);
}
```

You can query contract versions on-chain:

```typescript
import { ethers } from 'ethers';
import { RegistryABI } from '@aastar/shared-config';

const registry = new ethers.Contract(registryAddress, RegistryABI, provider);
const version = await registry.VERSION(); // "2.1.4"
const versionCode = await registry.VERSION_CODE(); // 20104
```

## Using Contract Addresses

```typescript
import { getCoreContracts } from '@aastar/shared-config';

const core = getCoreContracts('sepolia');

// Registry v2.1.4 - Community registration
const registry = core.registry;

// GToken - Governance token
const gToken = core.gToken;

// GTokenStaking - Stake management
const gTokenStaking = core.gTokenStaking;

// SuperPaymaster V2 - Shared paymaster
const superPaymasterV2 = core.superPaymasterV2;

// PaymasterFactory - Permissionless deployment
const paymasterFactory = core.paymasterFactory;
```

## Using ABIs

This package includes 13 contract ABIs. Import them directly from the JSON files:

```typescript
import { ethers } from 'ethers';
import { getSuperPaymasterV2 } from '@aastar/shared-config';

// Import ABIs
import RegistryABI from '@aastar/shared-config/src/abis/Registry.json';
import GTokenABI from '@aastar/shared-config/src/abis/GToken.json';
import SuperPaymasterV2ABI from '@aastar/shared-config/src/abis/SuperPaymasterV2.json';

// Create contract instance
const registryAddress = getContracts('sepolia').core.registry;
const registry = new ethers.Contract(registryAddress, RegistryABI, provider);

// Call contract methods
const version = await registry.VERSION();
const community = await registry.communities(communityAddress);
```

### Available ABIs

**Core System (5 ABIs)**
- `Registry.json` - Registry v2.1.4 (11-field CommunityProfile)
- `GToken.json` - Governance token
- `GTokenStaking.json` - Staking with user-level slash
- `SuperPaymasterV2.json` - Unified architecture paymaster
- `PaymasterFactory.json` - EIP-1167 proxy factory

**Token System (3 ABIs)**
- `xPNTsToken.json` - Gas token implementation (for aPNTs, bPNTs)
- `xPNTsFactory.json` - Gas token factory
- `MySBT.json` - Soulbound token v2.4.0

**Monitoring System (2 ABIs)**
- `DVTValidator.json` - Distributed validator
- `BLSAggregator.json` - BLS signature aggregation

**Legacy/Third-party (3 ABIs)**
- `PaymasterV4.json` - Legacy paymaster
- `SimpleAccount.json` - ERC-4337 account
- `SimpleAccountFactory.json` - ERC-4337 factory

All V2 ABIs include VERSION() and VERSION_CODE() functions for on-chain version querying.

## Network Utilities

```typescript
import {
  getNetwork,
  getChainId,
  getRpcUrl,
  getBlockExplorer,
  getTxUrl,
  getAddressUrl
} from '@aastar/shared-config';

// Get network configuration
const network = getNetwork('sepolia');
console.log(network.chainId); // 11155111

// Get chain ID
const chainId = getChainId('sepolia'); // 11155111

// Get RPC URL
const rpcUrl = getRpcUrl('sepolia');

// Get block explorer
const explorer = getBlockExplorer('sepolia');

// Generate transaction URL
const txUrl = getTxUrl('sepolia', '0xabc123...');
// https://sepolia.etherscan.io/tx/0xabc123...

// Generate address URL
const addressUrl = getAddressUrl('sepolia', '0xdef456...');
// https://sepolia.etherscan.io/address/0xdef456...
```

## Contract Version Tracking

```typescript
import {
  getAllV2Contracts,
  getV2ContractByName,
  getV2ContractByAddress,
  isV2Contract
} from '@aastar/shared-config';

// Get all V2 contracts
const allContracts = getAllV2Contracts();
console.log(`Total contracts: ${allContracts.length}`);

// Get specific contract by name
const registry = getV2ContractByName('Registry');
console.log(registry.version); // '2.1.4'
console.log(registry.versionCode); // 20104
console.log(registry.features); // Array of features

// Get contract by address
const contract = getV2ContractByAddress('0xf384c592D5258c91805128291c5D4c069DD30CA6');
console.log(contract?.name); // 'Registry'

// Check if address is a V2 contract
if (isV2Contract('0xf384...')) {
  console.log('This is a V2 contract with VERSION interface');
}
```

## Development Scripts

This package includes verification and maintenance scripts:

### Sync ABIs from SuperPaymaster

```bash
./sync-abis.sh
```

Syncs the latest compiled ABIs from the SuperPaymaster repository.

### Generate Comparison Table

```bash
./generate-comparison-table.sh
```

Generates a table comparing contract versions, ABIs, and addresses.

### Verify On-Chain Versions

```bash
./verify-onchain-versions.sh
```

Queries on-chain VERSION() and VERSION_CODE() for all contracts and compares with config.

### Comprehensive Verification

```bash
./verify-all.sh
```

Performs comprehensive verification:
- On-chain version vs config
- ABI version interface
- Source code version consistency

## TypeScript Support

Full type definitions included:

```typescript
import type {
  SupportedNetwork,
  NetworkContracts,
  ContractCategory,
  ContractVersion
} from '@aastar/shared-config';

function deployContract(network: SupportedNetwork) {
  const contracts: NetworkContracts = getContracts(network);
  // Full type safety
}
```

## Constants

```typescript
import {
  SERVICE_FEE_RATE,
  BPS_DENOMINATOR,
  NODE_STAKE_AMOUNTS,
  DEFAULT_APNTS_PRICE_USD,
  FAUCET_API_URL
} from '@aastar/shared-config';

// Service fee: 2%
const feeRate = SERVICE_FEE_RATE; // 200 basis points

// Calculate fee
const fee = (amount * SERVICE_FEE_RATE) / BPS_DENOMINATOR;

// Node stake requirements
const liteNodeStake = NODE_STAKE_AMOUNTS.LITE; // 30 sGT
const superNodeStake = NODE_STAKE_AMOUNTS.SUPER; // 300 sGT
```

## Complete Example: Registry Integration

```typescript
import { ethers } from 'ethers';
import { getContracts, getRpcUrl } from '@aastar/shared-config';
import RegistryABI from '@aastar/shared-config/src/abis/Registry.json';
import GTokenStakingABI from '@aastar/shared-config/src/abis/GTokenStaking.json';

async function registerCommunity() {
  const network = 'sepolia';
  const provider = new ethers.JsonRpcProvider(getRpcUrl(network));
  const contracts = getContracts(network).core;

  // Registry v2.1.4 uses 11-field CommunityProfile
  const registry = new ethers.Contract(contracts.registry, RegistryABI, signer);
  const staking = new ethers.Contract(contracts.gTokenStaking, GTokenStakingABI, signer);

  // Approve stGToken for Registry
  const stakeAmount = ethers.parseEther('50'); // 50 GToken
  await staking.approve(contracts.registry, stakeAmount);

  // Register community (11 fields)
  const profile = {
    name: 'My Community',
    ensName: 'mycommunity.eth',
    xPNTsToken: ethers.ZeroAddress,
    supportedSBTs: [],
    nodeType: 0, // PAYMASTER_AOA
    paymasterAddress: ethers.ZeroAddress,
    community: await signer.getAddress(),
    registeredAt: 0,
    lastUpdatedAt: 0,
    isActive: true,
    allowPermissionlessMint: true, // Default: true
  };

  const tx = await registry.registerCommunity(profile, stakeAmount);
  console.log('Transaction:', tx.hash);
}
```

## Building

```bash
pnpm build
```

## Publishing

```bash
pnpm build
npm publish
```

## Version History

- **v0.2.12** (2025-11-02)
  - Fixed on-chain version verification script
  - Strip quotes from VERSION() string output
  - Extract numeric value from VERSION_CODE() output
  - Add run-verify.sh wrapper to load private RPC
  - All 11 contracts now verify successfully ✅

- **v0.2.11** (2025-11-02)
  - Updated Registry to v2.1.4 with allowPermissionlessMint default true
  - Added 5 new ABIs (MySBT, xPNTsFactory, PaymasterFactory, DVTValidator, BLSAggregator)
  - Total 13 ABIs with VERSION interface support
  - Added verification scripts
  - 100% ABI coverage for all V2 contracts

- **v0.2.x** (2025-11-01)
  - V2 contract deployment with VERSION interface
  - All core contracts updated to v2.0.0

## License

MIT

## Links

- [AAstar Website](https://aastar.io)
- [GitHub](https://github.com/AAStarCommunity)
- [Documentation](https://docs.aastar.io)
- [Discord](https://discord.gg/aastar)

## Maintenance

This package is maintained by the AAstar Community team. Contract addresses are updated whenever new contracts are deployed from the [SuperPaymaster repository](https://github.com/AAStarCommunity/SuperPaymaster).

All V2 contracts implement the VERSION interface for on-chain version verification.

For contract deployment updates, please open an issue or PR in the GitHub repository.
