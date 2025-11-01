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
    superPaymasterV2: {
      name: 'SuperPaymasterV2',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0xB97A20aca3D6770Deca299a1aD9DAFb12d1e5eCf',
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
      version: '2.1.3',
      versionCode: 20103,
      deployedAt: '2025-11-01',
      address: '0x4572cEEA2B9f7d1f202c533474DeaaCe3E38b1dB',
      features: [
        'VERSION interface',
        'transferCommunityOwnership',
        'Community registration',
        'GToken staking requirement',
        'Slash mechanism',
      ],
    } as ContractVersion,

    gTokenStaking: {
      name: 'GTokenStaking',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x7b0bb7D5a5bf7A5839A6e6B53bDD639865507A69',
      features: [
        'VERSION interface',
        'User-level slash tracking',
        '1:1 shares model',
        'Lock mechanism',
        'Percentage-based exit fee',
        'Multiple locker support',
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
      address: '0x787409E0510edc750d6cAd58792D01B9e3f52714',
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
      address: '0x65Cf6C4ab3d40f3C919b6F3CADC09Efb72817920',
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
  // Factory System
  // ========================================
  factories: {
    paymasterFactory: {
      name: 'PaymasterFactory',
      version: '1.0.0',
      versionCode: 10000,
      deployedAt: '2025-11-01',
      address: '0xA32bcb29295Dbc19c92cFC1B0701A7A0e12D26B5',
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
  // Monitoring System
  // ========================================
  monitoring: {
    dvtValidator: {
      name: 'DVTValidator',
      version: '2.0.0',
      versionCode: 20000,
      deployedAt: '2025-11-01',
      address: '0x95B20d8FdF173a1190ff71e41024991B2c5e58eF',
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
      address: '0x22560129Ba328F6895805CC0Fe884E8c84F5FCD8',
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
  contracts.push(SEPOLIA_V2_VERSIONS.core.superPaymasterV2);
  contracts.push(SEPOLIA_V2_VERSIONS.core.registry);
  contracts.push(SEPOLIA_V2_VERSIONS.core.gTokenStaking);

  // Token system
  contracts.push(SEPOLIA_V2_VERSIONS.tokens.xPNTsFactory);
  contracts.push(SEPOLIA_V2_VERSIONS.tokens.mySBT);

  // Monitoring system
  contracts.push(SEPOLIA_V2_VERSIONS.monitoring.dvtValidator);
  contracts.push(SEPOLIA_V2_VERSIONS.monitoring.blsAggregator);

  // Factory system
  contracts.push(SEPOLIA_V2_VERSIONS.factories.paymasterFactory);

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
  totalContracts: 8,
  categories: {
    core: 3,
    tokens: 2,
    monitoring: 2,
    factories: 1, // PaymasterFactory deployed 2025-11-01
  },
  latestDeployment: '2025-11-01',
  allContractsHaveVersion: false, // PaymasterFactory v1.0.0 doesn't have VERSION interface
} as const;
