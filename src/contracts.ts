/**
 * AAstar Smart Contract Addresses
 *
 * Last Updated: 2025-11-02
 * Source: SuperPaymaster/SUPERPAYMASTER_PRODUCT_OVERVIEW.md
 *
 * For detailed version information (VERSION, VERSION_CODE, features),
 * see contract-versions.ts
 */

/**
 * Contract category types
 */
export type ContractCategory =
  | 'core'          // SuperPaymaster V2, Registry, GToken, GTokenStaking, PaymasterFactory
  | 'tokens'        // xPNTsFactory, MySBT
  | 'testTokens'    // Mock tokens for testing (USDT, aPNTs, bPNTs)
  | 'paymaster'     // PaymasterV4_1 (AOA mode)
  | 'monitoring'    // DVT, BLS
  | 'official'      // EntryPoint
  | 'communities';  // Registered communities (AAStar, BuilderDAO)

/**
 * Sepolia Testnet Contracts
 */
export const SEPOLIA_CONTRACTS = {
  // ========================================
  // Core System (AOA+ Mode)
  // ========================================
  core: {
    /** SuperPaymaster V2 - Shared paymaster for AOA+ mode (deployed: 2025-11-01) */
    superPaymasterV2: '0x95B20d8FdF173a1190ff71e41024991B2c5e58eF',

    /** Registry v2.1.4 - Community registration with allowPermissionlessMint default true (deployed: 2025-11-02) */
    registry: '0xf384c592D5258c91805128291c5D4c069DD30CA6',

    /** GToken v2.0.0 - Governance token with VERSION interface (deployed: 2025-11-01) */
    gToken: '0x99cCb70646Be7A5aeE7aF98cE853a1EA1A676DCc',

    /** GTokenStaking v2.0.0 - User-level slash + 1:1 shares with new GToken (deployed: 2025-11-01) */
    gTokenStaking: '0x60Bd54645b0fDabA1114B701Df6f33C4ecE87fEa',

    /** PaymasterFactory v1.0.0 - Permissionless Paymaster deployment using EIP-1167 (deployed: 2025-11-01) */
    paymasterFactory: '0x65Cf6C4ab3d40f3C919b6F3CADC09Efb72817920',
  },

  // ========================================
  // Token System
  // ========================================
  tokens: {
    /** xPNTsFactory v2.0.0 - Unified architecture gas token factory (deployed: 2025-11-01) */
    xPNTsFactory: '0x9dD72cB42427fC9F7Bf0c949DB7def51ef29D6Bd',

    /** MySBT v2.4.0 - White-label SBT with NFT refactor (deployed: 2025-11-01) */
    mySBT: '0x73E635Fc9eD362b7061495372B6eDFF511D9E18F',
  },

  // ========================================
  // Test Tokens (For Development & Testing)
  // ========================================
  testTokens: {
    /** Mock USDT - Test token for payment testing (6 decimals) */
    mockUSDT: '0x14EaC6C3D49AEDff3D59773A7d7bfb50182bCfDc',

    /** aPNTs v2.0.0 - AAStar community gas token for testing (deployed: 2025-11-01) */
    aPNTs: '0xBD0710596010a157B88cd141d797E8Ad4bb2306b',

    /** bPNTs v2.0.0 - BreadCommunity gas token for testing (deployed: 2025-11-03) */
    bPNTs: '0x70Da2c1B7Fcf471247Bc3B09f8927a4ab1751Ba3',
  },

  // ========================================
  // Paymaster V4_1 (AOA Mode - Independent Paymaster)
  // ========================================
  paymaster: {
    /** PaymasterV4_1 - Independent paymaster for AOA mode (deployed: 2025-10-15) */
    paymasterV4_1: '0x4D6A367aA183903968833Ec4AE361CFc8dDDBA38',

    /** PaymasterV4_1i Implementation - Factory deployment version (deployed: 2025-11-02) */
    paymasterV4_1iImplementation: '0x3E1C6a741f4b3f8bE24f324342539982324a6f8a',
  },

  // ========================================
  // DVT/BLS Monitoring System
  // ========================================
  monitoring: {
    /** DVTValidator v2.0.0 - Distributed validator management (deployed: 2025-11-01) */
    dvtValidator: '0x937CdD172fb0674Db688149093356F6dA95498FD',

    /** BLSAggregator v2.0.0 - BLS signature aggregation (deployed: 2025-11-01) */
    blsAggregator: '0x3Cf0587912c692aa0f5FEEEDC52959ABEEEFaEc6',
  },

  // ========================================
  // Official Dependencies
  // ========================================
  official: {
    /** EntryPoint v0.7 - ERC-4337 official EntryPoint (cross-chain address) */
    entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
  },

  // ========================================
  // Test Communities (For Development & Testing)
  // ========================================
  communities: {
    /** AAStar Community - Test community for development (registered: 2025-11-01) */
    aastar: {
      owner: '0x411BD567E46C0781248dbB6a9211891C032885e5', // Deployer 1
      gasToken: '0xBD0710596010a157B88cd141d797E8Ad4bb2306b', // aPNTs (test token)
      ensName: 'aastar.eth',
      name: 'AAStar',
      stake: '50', // 50 GToken staked in Registry
    },

    /** BreadCommunity - Test community for development (registered: 2025-11-03) */
    breadCommunity: {
      owner: '0xe24b6f321B0140716a2b671ed0D983bb64E7DaFA', // OWNER2
      gasToken: '0x70Da2c1B7Fcf471247Bc3B09f8927a4ab1751Ba3', // bPNTs (test token)
      ensName: 'bread.eth',
      name: 'BreadCommunity',
      stake: '50', // 50 GToken staked in Registry
    },
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
    lastUpdated: '2025-11-02',
    networkId: 11155111,
    deploymentDates: {
      // Core System
      gToken: '2025-11-01',            // v2.0.0 with VERSION interface
      superPaymasterV2: '2025-11-01',  // v2.0.0 with VERSION interface
      registry: '2025-11-02',          // v2.1.4 with allowPermissionlessMint default true
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

/**
 * Get registered communities
 *
 * @param network - Network name
 * @returns Communities object
 *
 * @example
 * ```ts
 * const communities = getCommunities('sepolia');
 * console.log(communities.aastar.owner);
 * ```
 */
export function getCommunities(network: ContractNetwork) {
  return getContracts(network).communities;
}

/**
 * Get a specific community
 *
 * @param network - Network name
 * @param communityName - Community name (aastar, builderDao)
 * @returns Community information
 *
 * @example
 * ```ts
 * const aastar = getCommunity('sepolia', 'aastar');
 * console.log(aastar.gasToken); // aPNTs address
 * ```
 */
export function getCommunity(network: ContractNetwork, communityName: 'aastar' | 'breadCommunity') {
  return getCommunities(network)[communityName];
}
