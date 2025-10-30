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
- **Network configurations** with RPC URLs and block explorers
- **Helper functions** for common queries
- **Contract ABIs** for direct integration
- **Deployment metadata** tracking
- **Multi-chain support** (Sepolia testnet, with mainnet support coming soon)

## Quick Start

```typescript
import {
  getContracts,
  getSuperPaymasterV2,
  getNetworks,
  getTxUrl
} from '@aastar/shared-config';

// Get all contracts for Sepolia
const contracts = getContracts('sepolia');
console.log(contracts.core.superPaymasterV2);
// Output: '0x50c4Daf685170aa29513BA6dd89B8417b5b0FE4a'

// Get specific contract address
const superPaymaster = getSuperPaymasterV2('sepolia');

// Generate transaction URL
const txUrl = getTxUrl('sepolia', '0x123...');
// Output: 'https://sepolia.etherscan.io/tx/0x123...'
```

## Contract Addresses

### Core System Contracts (AOA+ Mode)

```typescript
import { getCoreContracts } from '@aastar/shared-config';

const core = getCoreContracts('sepolia');

// SuperPaymaster V2 - Shared paymaster for AOA+ mode
const superPaymasterV2 = core.superPaymasterV2;

// Registry v2.1 - Community registration with node types
const registry = core.registry;

// GToken - Governance token (sGT)
const gToken = core.gToken;

// GTokenStaking - Stake, lock, slash management
const gTokenStaking = core.gTokenStaking;
```

### Token System

```typescript
import { getTokenContracts } from '@aastar/shared-config';

const tokens = getTokenContracts('sepolia');

// xPNTsFactory - Unified architecture gas token factory
const factory = tokens.xPNTsFactory;

// MySBT v2.3 - White-label SBT for community identity
const mySBT = tokens.mySBT;
```

### Paymaster V4 (AOA Mode)

```typescript
import { getPaymasterV4 } from '@aastar/shared-config';

// PaymasterV4_1 - Independent paymaster for AOA mode
const paymasterV4 = getPaymasterV4('sepolia');
```

### Official Dependencies

```typescript
import { getEntryPoint } from '@aastar/shared-config';

// EntryPoint v0.7 - ERC-4337 official EntryPoint
const entryPoint = getEntryPoint('sepolia');
// Cross-chain address: 0x0000000071727De22E5E9d8BAf0edAc6f37da032
```

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

## Contract Categories

```typescript
import { getContract, type ContractCategory } from '@aastar/shared-config';

// Available categories:
// - 'core': SuperPaymaster V2, Registry, GToken, GTokenStaking
// - 'tokens': xPNTs, MySBT
// - 'paymaster': PaymasterV4 (AOA mode)
// - 'monitoring': DVT, BLS
// - 'official': EntryPoint

const address = getContract('sepolia', 'core', 'registry');
```

## Deployment Metadata

```typescript
import { getDeploymentDate, CONTRACT_METADATA } from '@aastar/shared-config';

// Get deployment date for a specific contract
const deployDate = getDeploymentDate('sepolia', 'superPaymasterV2');
console.log(deployDate); // '2025-10-25'

// Access all metadata
const metadata = CONTRACT_METADATA.sepolia;
console.log(metadata.lastUpdated); // '2025-10-30'
```

## Network Validation

```typescript
import { isNetworkSupported, getSupportedNetworks } from '@aastar/shared-config';

// Check if network is supported
if (isNetworkSupported('sepolia')) {
  const contracts = getContracts('sepolia');
}

// Get all supported networks
const networks = getSupportedNetworks();
console.log(networks); // ['sepolia']
```

## Using ABIs

Contract ABIs are included in the package but not exported from the main entry point to avoid TypeScript declaration issues. Import them directly from the JSON files:

```typescript
import { ethers } from 'ethers';
import { getPaymasterV4 } from '@aastar/shared-config';
// Import ABI from JSON file
import PaymasterV4ABI from '@aastar/shared-config/src/abis/PaymasterV4.json';

// Create contract instance
const paymasterAddress = getPaymasterV4('sepolia');
const paymaster = new ethers.Contract(
  paymasterAddress,
  PaymasterV4ABI,
  provider
);

// Call contract methods
const isSupported = await paymaster.isSupportedSBT(sbtAddress);
```

Available ABIs:
- `@aastar/shared-config/src/abis/PaymasterV4.json`
- `@aastar/shared-config/src/abis/GasTokenV2.json`
- `@aastar/shared-config/src/abis/SimpleAccount.json`
- `@aastar/shared-config/src/abis/SimpleAccountFactory.json`

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

## Branding

```typescript
import { BRANDING, LINKS } from '@aastar/shared-config';

// Use AAstar branding
const logo = BRANDING.logo;
const primaryColor = BRANDING.colors.primary;

// Access official links
const website = LINKS.main; // https://aastar.io
const github = LINKS.github; // https://github.com/AAStarCommunity
```

## TypeScript Support

This package is written in TypeScript and provides full type definitions:

```typescript
import type {
  SupportedNetwork,
  NetworkContracts,
  ContractCategory
} from '@aastar/shared-config';

function deployContract(network: SupportedNetwork) {
  const contracts: NetworkContracts = getContracts(network);
  // Full type safety
}
```

## Complete Example: Sending a Transaction

```typescript
import { ethers } from 'ethers';
import {
  getSuperPaymasterV2,
  getEntryPoint,
  getRpcUrl,
  getTxUrl,
  SimpleAccountABI
} from '@aastar/shared-config';

async function sendGaslessTransaction() {
  // Get network configuration
  const network = 'sepolia';
  const rpcUrl = getRpcUrl(network);
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Get contract addresses
  const superPaymaster = getSuperPaymasterV2(network);
  const entryPoint = getEntryPoint(network);

  // Create contract instance
  const account = new ethers.Contract(
    accountAddress,
    SimpleAccountABI,
    wallet
  );

  // Build UserOperation with paymaster
  const userOp = {
    sender: accountAddress,
    // ... other fields
    paymaster: superPaymaster,
  };

  // Send transaction
  const tx = await entryPoint.handleOps([userOp], beneficiary);
  console.log('Transaction:', getTxUrl(network, tx.hash));

  return tx;
}
```

## Development

### Building

```bash
pnpm build
```

### Publishing

```bash
pnpm build
npm publish
```

## Multi-Chain Support (Coming Soon)

```typescript
// Future: Optimism support
const optimismContracts = getContracts('optimism');

// Future: Mainnet support
const mainnetContracts = getContracts('mainnet');
```

## Contract Addresses (Sepolia Testnet)

| Contract | Address | Deployed |
|----------|---------|----------|
| SuperPaymaster V2 | `0x50c4Daf685170aa29513BA6dd89B8417b5b0FE4a` | 2025-10-25 |
| Registry v2.1 | `0x529912C52a934fA02441f9882F50acb9b73A3c5B` | 2025-10-27 |
| GToken (sGT) | `0x868F843723a98c6EECC4BF0aF3352C53d5004147` | 2025-10-24 |
| GTokenStaking | `0x92eD5b659Eec9D5135686C9369440D71e7958527` | 2025-10-24 |
| xPNTsFactory | `0xC2AFEA0F736403E7e61D3F7C7c6b4E5E63B5cab6` | 2025-10-30 |
| MySBT v2.3 | `0xc1085841307d85d4a8dC973321Df2dF7c01cE5C8` | 2025-10-28 |
| PaymasterV4_1 | `0x4D6A367aA183903968833Ec4AE361CFc8dDDBA38` | 2025-10-15 |
| EntryPoint v0.7 | `0x0000000071727De22E5E9d8BAf0edAc6f37da032` | Official |

## License

MIT

## Links

- [AAstar Website](https://aastar.io)
- [GitHub](https://github.com/AAStarCommunity)
- [Documentation](https://docs.aastar.io)
- [Discord](https://discord.gg/aastar)

## Maintenance

This package is maintained by the AAstar Community team. Contract addresses are updated whenever new contracts are deployed from the [SuperPaymaster repository](https://github.com/AAStarCommunity/SuperPaymaster).

For contract deployment updates, please open an issue or PR in the GitHub repository.
