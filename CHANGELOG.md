# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-11-08

### Added
- **Registry v2.2.0**: New deployment with auto-stake registration functionality (`0x028aB52B4E0EF26820043ca4F1B5Fe14FfC1EF75`)
  - `registerCommunityWithAutoStake()` - One-click registration + staking
  - Node type configuration (AOA/Super/ANode/KMS)
  - MySBT-style auto-stake pattern
- **SuperPaymasterV2 v2.0.1**: Updated deployment with Oracle security enhancements (`0xfaB5B2A129DF8308a70DA2fE77c61001e4Df58BC`)
  - Chainlink oracle `answeredInRound` validation
  - Price data staleness check (1 hour timeout)
  - Price bounds validation ($100 - $100,000)
- **Updated ABIs**: Registry.json and SuperPaymasterV2.json with latest contract versions

### Changed
- **Registry**: Updated from `0xf384c592D5258c91805128291c5D4c069DD30CA6` to `0x028aB52B4E0EF26820043ca4F1B5Fe14FfC1EF75`
- **SuperPaymasterV2**: Updated from `0x95B20d8FdF173a1190ff71e41024991B2c5e58eF` to `0xfaB5B2A129DF8308a70DA2fE77c61001e4Df58BC`

### Fixed
- **Deployment Order**: SuperPaymasterV2 now correctly references Registry v2.2.0 (immutable REGISTRY field)
- **Oracle Security**: Enhanced Chainlink price feed validation to prevent stale data usage

### Notes
- SuperPaymasterV2 v2.0.1 is deployed with correct dependency on Registry v2.2.0
- Previous deployments (`0x33A31d52db2ef2497e93226e0ed1B5d587D7D5e8`, `0x5675062cA5D98c791972eAC24eFa3BC3EBc096f3`) deprecated due to incorrect deployment order
- GTokenStaking lockers configured for MySBT, SuperPaymasterV2, and Registry

## [0.2.2] - 2025-10-30

### Added
- **Test Tokens category**: Added `testTokens` section for development and testing contracts
- **Mock USDT**: Added Mock USDT contract address (`0x14EaC6C3D49AEDff3D59773A7d7bfb50182bCfDc`)
- **getTestTokenContracts()**: New helper function to retrieve test token addresses

### Changed
- Updated `ContractCategory` type to include `'testTokens'`

## [0.2.1] - 2025-10-30

### Fixed
- Fixed TypeScript declaration file issues with JSON imports
- Removed ABI exports from main entry point to avoid type errors
- ABIs are now imported directly from JSON files (see README for usage)
- Significantly reduced bundle size (50KB → 9KB)

### Changed
- Updated README with correct ABI import instructions

## [0.2.0] - 2025-10-30

### Added
- Comprehensive contract address management system
- Type-safe helper functions for contract queries
- Network configuration with utility functions
- Deployment metadata tracking with dates
- Enhanced constants with node stake amounts
- Complete TypeScript type definitions
- Extensive JSDoc documentation with examples

### Changed
- Removed `process.env` dependencies from constants
- Renamed `SupportedNetwork` to `ContractNetwork` in contracts module to avoid naming conflicts
- Updated all contract addresses to latest deployments (as of 2025-10-30)
- Enhanced README with complete usage examples

### Fixed
- Fixed type conflicts between contracts and networks modules
- Removed environment variable dependencies for better npm package compatibility

## [0.1.0] - 2025-10-24

### Added
- Initial release
- Basic contract addresses
- Network configurations
- ABIs for core contracts
- Branding and links configuration
