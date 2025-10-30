/**
 * AAstar Smart Contract Addresses
 *
 * Last Updated: 2025-10-30
 * Source: SuperPaymaster/SUPERPAYMASTER_PRODUCT_OVERVIEW.md
 */

/**
 * Contract category types
 */
export type ContractCategory =
  | 'core'          // SuperPaymaster V2, Registry, GToken, GTokenStaking
  | 'tokens'        // xPNTs, MySBT
  | 'paymaster'     // PaymasterV4 (AOA mode)
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
    /** SuperPaymaster V2 - Shared paymaster for AOA+ mode (deployed: 2025-10-25) */
    superPaymasterV2: '0x50c4Daf685170aa29513BA6dd89B8417b5b0FE4a',

    /** Registry v2.1 - Community registration with node types (deployed: 2025-10-27) */
    registry: '0x529912C52a934fA02441f9882F50acb9b73A3c5B',

    /** GToken - Governance token (sGT) (deployed: 2025-10-24) */
    gToken: '0x868F843723a98c6EECC4BF0aF3352C53d5004147',

    /** GTokenStaking - Stake, lock, slash management (deployed: 2025-10-24) */
    gTokenStaking: '0x92eD5b659Eec9D5135686C9369440D71e7958527',
  },

  // ========================================
  // Token System
  // ========================================
  tokens: {
    /** xPNTsFactory - Unified architecture gas token factory (deployed: 2025-10-30) */
    xPNTsFactory: '0xC2AFEA0F736403E7e61D3F7C7c6b4E5E63B5cab6',

    /** MySBT v2.3 - White-label SBT for community identity (deployed: 2025-10-28) */
    mySBT: '0xc1085841307d85d4a8dC973321Df2dF7c01cE5C8',
  },

  // ========================================
  // Paymaster V4 (AOA Mode)
  // ========================================
  paymaster: {
    /** PaymasterV4_1 - Independent paymaster for AOA mode (deployed: 2025-10-15) */
    paymasterV4: '0x4D6A367aA183903968833Ec4AE361CFc8dDDBA38',
  },

  // ========================================
  // DVT/BLS Monitoring System
  // ========================================
  monitoring: {
    /** DVTValidator - Distributed validator management (deployed: 2025-10-25) */
    dvtValidator: '0x8E03495A45291084A73Cee65B986f34565321fb1',

    /** BLSAggregator - BLS signature aggregation (deployed: 2025-10-25) */
    blsAggregator: '0xA7df6789218C5a270D6DF033979698CAB7D7b728',
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
 * Get PaymasterV4 address (AOA mode)
 *
 * @param network - Network name
 * @returns PaymasterV4 address
 *
 * @example
 * ```ts
 * const paymaster = getPaymasterV4('sepolia');
 * ```
 */
export function getPaymasterV4(network: ContractNetwork): string {
  return getContracts(network).paymaster.paymasterV4;
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
    lastUpdated: '2025-10-30',
    networkId: 11155111,
    deploymentDates: {
      // Core System
      superPaymasterV2: '2025-10-25',
      registry: '2025-10-27',
      gToken: '2025-10-24',
      gTokenStaking: '2025-10-24',

      // Tokens
      xPNTsFactory: '2025-10-30',
      mySBT: '2025-10-28',

      // Paymaster
      paymasterV4: '2025-10-15',

      // Monitoring
      dvtValidator: '2025-10-25',
      blsAggregator: '2025-10-25',
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
