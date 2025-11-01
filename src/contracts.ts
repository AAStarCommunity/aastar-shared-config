/**
 * AAstar Smart Contract Addresses
 *
 * Last Updated: 2025-11-01
 * Source: SuperPaymaster/SUPERPAYMASTER_PRODUCT_OVERVIEW.md
 *
 * For detailed version information (VERSION, VERSION_CODE, features),
 * see contract-versions.ts
 */

/**
 * Contract category types
 */
export type ContractCategory =
  | 'core'          // SuperPaymaster V2, Registry, GToken, GTokenStaking
  | 'tokens'        // xPNTs, MySBT, aPNTs
  | 'testTokens'    // Mock tokens for testing (USDT, etc.)
  | 'factories'     // PaymasterFactory
  | 'paymaster'     // PaymasterV4_1 (AOA mode)
  | 'monitoring'    // DVT, BLS
  | 'official';     // EntryPoint

/**
 * Sepolia Testnet Contracts
 */
export const SEPOLIA_CONTRACTS = {
  // ========================================
  // Core System (AOA+ Mode)
  // ========================================
  core: {
    /** SuperPaymaster V2 - Shared paymaster for AOA+ mode (deployed: 2025-11-01) */
    superPaymasterV2: '0xB97A20aca3D6770Deca299a1aD9DAFb12d1e5eCf',

    /** Registry v2.1.3 - Community registration with transferCommunityOwnership (deployed: 2025-11-01) */
    registry: '0x4572cEEA2B9f7d1f202c533474DeaaCe3E38b1dB',

    /** GToken - Governance token (sGT) (deployed: 2025-10-24) */
    gToken: '0x868F843723a98c6EECC4BF0aF3352C53d5004147',

    /** GTokenStaking v2.0.0 - User-level slash + 1:1 shares (deployed: 2025-11-01) */
    gTokenStaking: '0x7b0bb7D5a5bf7A5839A6e6B53bDD639865507A69',
  },

  // ========================================
  // Token System
  // ========================================
  tokens: {
    /** xPNTsFactory v2.0.0 - Unified architecture gas token factory (deployed: 2025-11-01) */
    xPNTsFactory: '0x787409E0510edc750d6cAd58792D01B9e3f52714',

    /** MySBT v2.4.0 - White-label SBT with NFT refactor (deployed: 2025-11-01) */
    mySBT: '0x65Cf6C4ab3d40f3C919b6F3CADC09Efb72817920',

    /** aPNTs (xPNTsToken) - AAStar community gas token (deployed: 2025-10-30) */
    aPNTs: '0xD11527ae56B6543a679e50408BE4aeE0f418ef9f',
  },

  // ========================================
  // Test Tokens (For Development & Testing)
  // ========================================
  testTokens: {
    /** Mock USDT - Test token for payment testing (6 decimals) */
    mockUSDT: '0x14EaC6C3D49AEDff3D59773A7d7bfb50182bCfDc',
  },

  // ========================================
  // Factory System
  // ========================================
  factories: {
    /** PaymasterFactory v1.0.0 - Permissionless Paymaster deployment using EIP-1167 (deployed: 2025-11-01) */
    paymasterFactory: '0xA32bcb29295Dbc19c92cFC1B0701A7A0e12D26B5',
  },

  // ========================================
  // Paymaster V4_1 (AOA Mode - Independent Paymaster)
  // ========================================
  paymaster: {
    /** PaymasterV4_1 - Independent paymaster for AOA mode (deployed: 2025-10-15) */
    paymasterV4_1: '0x4D6A367aA183903968833Ec4AE361CFc8dDDBA38',
  },

  // ========================================
  // DVT/BLS Monitoring System
  // ========================================
  monitoring: {
    /** DVTValidator v2.0.0 - Distributed validator management (deployed: 2025-11-01) */
    dvtValidator: '0x95B20d8FdF173a1190ff71e41024991B2c5e58eF',

    /** BLSAggregator v2.0.0 - BLS signature aggregation (deployed: 2025-11-01) */
    blsAggregator: '0x22560129Ba328F6895805CC0Fe884E8c84F5FCD8',
  },

  // ========================================
  // Official Dependencies
  // ========================================
  official: {
    /** EntryPoint v0.7 - ERC-4337 official EntryPoint (cross-chain address) */
    entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
  },
} as const;

/**
 * All supported networks
 */
export const CONTRACTS = {
  sepolia: SEPOLIA_CONTRACTS,
  // Future networks can be added here:
  // optimism: OPTIMISM_CONTRACTS,
  // mainnet: MAINNET_CONTRACTS,
} as const;

/**
 * Supported network types for contracts
 */
export type ContractNetwork = keyof typeof CONTRACTS;

/**
 * Contract addresses for a specific network
 */
export type NetworkContracts = typeof SEPOLIA_CONTRACTS;

/**
 * Get all contracts for a specific network
 *
 * @param network - Network name (e.g., 'sepolia')
 * @returns All contract addresses for the network
 *
 * @example
 * ```ts
 * const contracts = getContracts('sepolia');
 * console.log(contracts.core.superPaymasterV2);
 * ```
 */
export function getContracts(network: ContractNetwork): NetworkContracts {
  const contracts = CONTRACTS[network];
  if (!contracts) {
    throw new Error(`Network '${network}' is not supported`);
  }
  return contracts;
}

/**
 * Get a specific contract address
 *
 * @param network - Network name
 * @param category - Contract category
 * @param name - Contract name
 * @returns Contract address
 *
 * @example
 * ```ts
 * const address = getContract('sepolia', 'core', 'superPaymasterV2');
 * ```
 */
export function getContract(
  network: ContractNetwork,
  category: ContractCategory,
  name: string
): string {
  const contracts = getContracts(network);
  const categoryContracts = contracts[category] as Record<string, string>;

  if (!categoryContracts) {
    throw new Error(`Category '${category}' not found in network '${network}'`);
  }

  const address = categoryContracts[name];
  if (!address) {
    throw new Error(`Contract '${name}' not found in category '${category}' for network '${network}'`);
  }

  return address;
}

/**
 * Get core system contracts
 *
 * @param network - Network name
 * @returns Core contract addresses
 *
 * @example
 * ```ts
 * const core = getCoreContracts('sepolia');
 * console.log(core.superPaymasterV2);
 * console.log(core.registry);
 * ```
 */
export function getCoreContracts(network: ContractNetwork) {
  return getContracts(network).core;
}

/**
 * Get token system contracts
 *
 * @param network - Network name
 * @returns Token contract addresses
 *
 * @example
 * ```ts
 * const tokens = getTokenContracts('sepolia');
 * console.log(tokens.xPNTsFactory);
 * console.log(tokens.mySBT);
 * ```
 */
export function getTokenContracts(network: ContractNetwork) {
  return getContracts(network).tokens;
}

/**
 * Get test token contracts (for development & testing)
 *
 * @param network - Network name
 * @returns Test token contract addresses
 *
 * @example
 * ```ts
 * const testTokens = getTestTokenContracts('sepolia');
 * console.log(testTokens.mockUSDT);
 * ```
 */
export function getTestTokenContracts(network: ContractNetwork) {
  return getContracts(network).testTokens;
}

/**
 * Get PaymasterV4_1 address (AOA mode)
 *
 * @param network - Network name
 * @returns PaymasterV4_1 address
 *
 * @example
 * ```ts
 * const paymaster = getPaymasterV4_1('sepolia');
 * ```
 */
export function getPaymasterV4_1(network: ContractNetwork): string {
  return getContracts(network).paymaster.paymasterV4_1;
}

/**
 * Get SuperPaymaster V2 address (AOA+ mode)
 *
 * @param network - Network name
 * @returns SuperPaymaster V2 address
 *
 * @example
 * ```ts
 * const superPaymaster = getSuperPaymasterV2('sepolia');
 * ```
 */
export function getSuperPaymasterV2(network: ContractNetwork): string {
  return getContracts(network).core.superPaymasterV2;
}

/**
 * Get EntryPoint v0.7 address
 *
 * @param network - Network name
 * @returns EntryPoint address
 *
 * @example
 * ```ts
 * const entryPoint = getEntryPoint('sepolia');
 * ```
 */
export function getEntryPoint(network: ContractNetwork): string {
  return getContracts(network).official.entryPoint;
}

/**
 * Check if a network is supported for contracts
 *
 * @param network - Network name to check
 * @returns True if network is supported
 *
 * @example
 * ```ts
 * if (isContractNetworkSupported('sepolia')) {
 *   const contracts = getContracts('sepolia');
 * }
 * ```
 */
export function isContractNetworkSupported(network: string): network is ContractNetwork {
  return network in CONTRACTS;
}

/**
 * Get all supported contract network names
 *
 * @returns Array of supported network names
 *
 * @example
 * ```ts
 * const networks = getContractNetworks();
 * // ['sepolia']
 * ```
 */
export function getContractNetworks(): ContractNetwork[] {
  return Object.keys(CONTRACTS) as ContractNetwork[];
}

/**
 * Contract deployment metadata
 */
export const CONTRACT_METADATA = {
  sepolia: {
    lastUpdated: '2025-11-01',
    networkId: 11155111,
    deploymentDates: {
      // Core System
      superPaymasterV2: '2025-11-01',  // v2.0.0 with VERSION interface
      registry: '2025-11-01',          // v2.1.3 with VERSION interface
      gToken: '2025-10-24',
      gTokenStaking: '2025-11-01',     // v2.0.0 with VERSION interface

      // Tokens
      xPNTsFactory: '2025-11-01',      // v2.0.0 with VERSION interface
      mySBT: '2025-11-01',             // v2.4.0 with VERSION interface + NFT refactor

      // Paymaster
      paymasterV4_1: '2025-10-15',

      // Tokens
      aPNTs: '2025-10-30',

      // Factories
      paymasterFactory: '2025-11-01',      // v1.0.0

      // Monitoring
      dvtValidator: '2025-11-01',      // v2.0.0 with VERSION interface
      blsAggregator: '2025-11-01',     // v2.0.0 with VERSION interface
    },
  },
} as const;

/**
 * Get contract deployment date
 *
 * @param network - Network name
 * @param contractName - Contract name
 * @returns Deployment date string (YYYY-MM-DD)
 *
 * @example
 * ```ts
 * const date = getDeploymentDate('sepolia', 'superPaymasterV2');
 * // '2025-10-25'
 * ```
 */
export function getDeploymentDate(network: ContractNetwork, contractName: string): string | undefined {
  const metadata = CONTRACT_METADATA[network];
  if (!metadata) return undefined;

  return (metadata.deploymentDates as Record<string, string>)[contractName];
}
