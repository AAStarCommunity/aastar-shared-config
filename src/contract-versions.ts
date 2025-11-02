/**
 * AAstar V2 Contract Versions
 *
 * All V2 contracts implement the VERSION interface:
 * - VERSION: string (e.g., "2.0.0")
 * - VERSION_CODE: uint256 (e.g., 20000)
 *
 * Last Updated: 2025-11-01
 */

/**
 * Contract version information
 */
export interface ContractVersion {
  /** Contract name */
  name: string;
  /** Semantic version string (e.g., "2.0.0") */
  version: string;
  /** Numeric version code (e.g., 20000) */
  versionCode: number;
  /** Deployment date (YYYY-MM-DD) */
  deployedAt: string;
  /** Contract address on network */
  address: string;
  /** Key features in this version */
  features?: string[];
}

/**
 * V2 Contract Versions on Sepolia
 */
export const SEPOLIA_V2_VERSIONS = {
  // ========================================
  // Core System
  // ========================================
  core: {
    gToken: {
      name: 'GToken',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x99cCb70646Be7A5aeE7aF98cE853a1EA1A676DCc',
      features: [
        'VERSION interface',
        'ERC20 governance token',
        'Mintable with cap',
        'Ownable',
      ],
    } as ContractVersion,

    superPaymasterV2: {
      name: 'SuperPaymasterV2',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x95B20d8FdF173a1190ff71e41024991B2c5e58eF',
      features: [
        'VERSION interface',
        'Unified architecture',
        'xPNTs gas token support',
        'Reputation-based pricing',
        'Multi-operator support',
      ],
    } as ContractVersion,

    registry: {
      name: 'Registry',
      version: '2.1.4',
      versionCode: 20104,
      deployedAt: '2025-11-02',
      address: '0xf384c592D5258c91805128291c5D4c069DD30CA6',
      features: [
        'VERSION interface',
        'allowPermissionlessMint defaults to true',
        'transferCommunityOwnership',
        'Community registration',
        'GToken staking requirement',
        'Slash mechanism',
        'Uses new GTokenStaking with GToken v2.0.0',
      ],
    } as ContractVersion,

    gTokenStaking: {
      name: 'GTokenStaking',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x60Bd54645b0fDabA1114B701Df6f33C4ecE87fEa',
      features: [
        'VERSION interface',
        'User-level slash tracking',
        '1:1 shares model',
        'Lock mechanism',
        'Percentage-based exit fee',
        'Multiple locker support',
        'Uses new GToken v2.0.0',
      ],
    } as ContractVersion,

    paymasterFactory: {
      name: 'PaymasterFactory',
      version: '1.0.0',
      versionCode: 10000,
      deployedAt: '2025-11-01',
      address: '0x65Cf6C4ab3d40f3C919b6F3CADC09Efb72817920',
      features: [
        'EIP-1167 Minimal Proxy',
        'Version management',
        'Permissionless Paymaster deployment',
        'Operator tracking',
        'Gas-efficient (~100k gas per deployment)',
      ],
    } as ContractVersion,
  },

  // ========================================
  // Token System
  // ========================================
  tokens: {
    xPNTsFactory: {
      name: 'xPNTsFactory',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x9dD72cB42427fC9F7Bf0c949DB7def51ef29D6Bd',
      features: [
        'VERSION interface',
        'Unified architecture',
        'Gas token creation',
        'Community-specific tokens',
        'Auto-approved spenders',
      ],
    } as ContractVersion,

    mySBT: {
      name: 'MySBT',
      version: '2.4.0',
      versionCode: 20400,
      deployedAt: '2025-11-01',
      address: '0x73E635Fc9eD362b7061495372B6eDFF511D9E18F',
      features: [
        'VERSION interface',
        'NFT architecture refactor',
        'Soulbound token (SBT)',
        'Time-based reputation',
        'Membership management',
        'GToken mint fee (burn)',
      ],
    } as ContractVersion,
  },

  // ========================================
  // Test Tokens (For Development & Testing)
  // ========================================
  testTokens: {
    aPNTs: {
      name: 'aPNTs',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0xBD0710596010a157B88cd141d797E8Ad4bb2306b',
      features: [
        'VERSION interface',
        'AAStar community gas token',
        'Test token for development',
        'Auto-approved spenders',
      ],
    } as ContractVersion,

    bPNTs: {
      name: 'bPNTs',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0xF223660d24c436B5BfadFEF68B5051bf45E7C995',
      features: [
        'VERSION interface',
        'BuilderDAO community gas token',
        'Test token for development',
        'Auto-approved spenders',
      ],
    } as ContractVersion,
  },

  // ========================================
  // Monitoring System
  // ========================================
  monitoring: {
    dvtValidator: {
      name: 'DVTValidator',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x937CdD172fb0674Db688149093356F6dA95498FD',
      features: [
        'VERSION interface',
        'Distributed validator technology',
        'Validator set management',
        'Threshold validation',
      ],
    } as ContractVersion,

    blsAggregator: {
      name: 'BLSAggregator',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x3Cf0587912c692aa0f5FEEEDC52959ABEEEFaEc6',
      features: [
        'VERSION interface',
        'BLS signature aggregation',
        'Multi-signature support',
        'Gas optimization',
      ],
    } as ContractVersion,
  },
} as const;

/**
 * Get all V2 contracts with VERSION interface
 *
 * @returns Array of all V2 contract versions
 *
 * @example
 * ```ts
 * const allV2Contracts = getAllV2Contracts();
 * for (const contract of allV2Contracts) {
 *   console.log(`${contract.name} v${contract.version} at ${contract.address}`);
 * }
 * ```
 */
export function getAllV2Contracts(): ContractVersion[] {
  const contracts: ContractVersion[] = [];

  // Core system
  contracts.push(SEPOLIA_V2_VERSIONS.core.gToken);
  contracts.push(SEPOLIA_V2_VERSIONS.core.superPaymasterV2);
  contracts.push(SEPOLIA_V2_VERSIONS.core.registry);
  contracts.push(SEPOLIA_V2_VERSIONS.core.gTokenStaking);
  contracts.push(SEPOLIA_V2_VERSIONS.core.paymasterFactory);

  // Token system
  contracts.push(SEPOLIA_V2_VERSIONS.tokens.xPNTsFactory);
  contracts.push(SEPOLIA_V2_VERSIONS.tokens.mySBT);

  // Test tokens
  contracts.push(SEPOLIA_V2_VERSIONS.testTokens.aPNTs);
  contracts.push(SEPOLIA_V2_VERSIONS.testTokens.bPNTs);

  // Monitoring system
  contracts.push(SEPOLIA_V2_VERSIONS.monitoring.dvtValidator);
  contracts.push(SEPOLIA_V2_VERSIONS.monitoring.blsAggregator);

  return contracts;
}

/**
 * Get V2 contract by name
 *
 * @param name - Contract name
 * @returns Contract version info or undefined
 *
 * @example
 * ```ts
 * const contract = getV2ContractByName('SuperPaymasterV2');
 * if (contract) {
 *   console.log(`Version: ${contract.version}`);
 * }
 * ```
 */
export function getV2ContractByName(name: string): ContractVersion | undefined {
  const all = getAllV2Contracts();
  return all.find(c => c.name === name);
}

/**
 * Get V2 contract by address
 *
 * @param address - Contract address (case-insensitive)
 * @returns Contract version info or undefined
 *
 * @example
 * ```ts
 * const contract = getV2ContractByAddress('0xB97A20aca3D6770Deca299a1aD9DAFb12d1e5eCf');
 * if (contract) {
 *   console.log(`Found: ${contract.name} v${contract.version}`);
 * }
 * ```
 */
export function getV2ContractByAddress(address: string): ContractVersion | undefined {
  const all = getAllV2Contracts();
  return all.find(c => c.address.toLowerCase() === address.toLowerCase());
}

/**
 * Check if an address is a V2 contract
 *
 * @param address - Contract address to check
 * @returns True if address is a V2 contract
 *
 * @example
 * ```ts
 * if (isV2Contract('0xB97A20aca3D6770Deca299a1aD9DAFb12d1e5eCf')) {
 *   console.log('This is a V2 contract with VERSION interface');
 * }
 * ```
 */
export function isV2Contract(address: string): boolean {
  return getV2ContractByAddress(address) !== undefined;
}

/**
 * Get all V2 contracts deployed on a specific date
 *
 * @param date - Deployment date (YYYY-MM-DD)
 * @returns Array of contracts deployed on that date
 *
 * @example
 * ```ts
 * const contracts = getV2ContractsByDate('2025-11-01');
 * console.log(`${contracts.length} contracts deployed on 2025-11-01`);
 * ```
 */
export function getV2ContractsByDate(date: string): ContractVersion[] {
  const all = getAllV2Contracts();
  return all.filter(c => c.deployedAt === date);
}

/**
 * V2 Contract Summary
 */
export const V2_SUMMARY = {
  totalContracts: 11,
  categories: {
    core: 5, // GToken, SuperPaymasterV2, Registry, GTokenStaking, PaymasterFactory
    tokens: 2, // xPNTsFactory, MySBT
    testTokens: 2, // aPNTs, bPNTs
    monitoring: 2, // DVTValidator, BLSAggregator
  },
  latestDeployment: '2025-11-01',
  allContractsHaveVersion: true, // All V2 contracts now have VERSION interface
} as const;
