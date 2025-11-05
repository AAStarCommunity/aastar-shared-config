/**
 * AAstar V2 Contract Versions
 *
 * IMPORTANT: Contract addresses are defined in contract-addresses.ts
 * This file imports and uses those addresses to maintain a single source of truth.
 *
 * All V2 contracts implement the VERSION interface:
 * - VERSION: string (e.g., "2.0.0")
 * - VERSION_CODE: uint256 (e.g., 20000)
 *
 * Last Updated: 2025-11-01
 */

import {
  CORE_ADDRESSES,
  TOKEN_ADDRESSES,
  TEST_TOKEN_ADDRESSES,
  MONITORING_ADDRESSES,
} from './contract-addresses';

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
      address: CORE_ADDRESSES.gToken,
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
      address: CORE_ADDRESSES.superPaymasterV2,
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
      address: CORE_ADDRESSES.registry,
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
      version: '2.0.1',
      versionCode: 20001,
      deployedAt: '2025-11-05',
      address: CORE_ADDRESSES.gTokenStaking,
      features: [
        'VERSION interface',
        'User-level slash tracking',
        '1:1 shares model',
        'Lock mechanism',
        'Percentage-based exit fee',
        'Multiple locker support',
        'Uses new GToken v2.0.0',
        'stakeFor() function - stake on behalf of users',
      ],
    } as ContractVersion,

    paymasterFactory: {
      name: 'PaymasterFactory',
      version: '1.0.0',
      versionCode: 10000,
      deployedAt: '2025-11-01',
      address: CORE_ADDRESSES.paymasterFactory,
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
      address: TOKEN_ADDRESSES.xPNTsFactory,
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
      version: '2.4.1',
      versionCode: 20401,
      deployedAt: '2025-11-05',
      address: TOKEN_ADDRESSES.mySBT,
      features: [
        'VERSION interface',
        'NFT architecture refactor',
        'Soulbound token (SBT)',
        'Time-based reputation',
        'Membership management',
        'GToken mint fee (burn)',
        'mintWithAutoStake() - one-transaction mint with automatic staking',
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
      address: TEST_TOKEN_ADDRESSES.aPNTs,
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
      deployedAt: '2025-11-03',
      address: TEST_TOKEN_ADDRESSES.bPNTs,
      features: [
        'VERSION interface',
        'BreadCommunity gas token',
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
      address: MONITORING_ADDRESSES.dvtValidator,
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
      address: MONITORING_ADDRESSES.blsAggregator,
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
