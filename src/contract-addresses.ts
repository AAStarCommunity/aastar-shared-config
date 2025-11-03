/**
 * Contract Addresses - Single Source of Truth
 * All contract addresses for Sepolia testnet
 *
 * This file serves as the single source of truth for all contract addresses.
 * All other files reference these constants to avoid duplication.
 */

/**
 * Core System Addresses
 */
export const CORE_ADDRESSES = {
  gToken: '0x99cCb70646Be7A5aeE7aF98cE853a1EA1A676DCc',
  superPaymasterV2: '0x95B20d8FdF173a1190ff71e41024991B2c5e58eF',
  registry: '0xf384c592D5258c91805128291c5D4c069DD30CA6',
  gTokenStaking: '0x60Bd54645b0fDabA1114B701Df6f33C4ecE87fEa',
  paymasterFactory: '0x65Cf6C4ab3d40f3C919b6F3CADC09Efb72817920',
} as const;

/**
 * Token System Addresses
 */
export const TOKEN_ADDRESSES = {
  xPNTsFactory: '0x9dD72cB42427fC9F7Bf0c949DB7def51ef29D6Bd',
  mySBT: '0x73E635Fc9eD362b7061495372B6eDFF511D9E18F',
} as const;

/**
 * Test Token Addresses
 */
export const TEST_TOKEN_ADDRESSES = {
  mockUSDT: '0x14EaC6C3D49AEDff3D59773A7d7bfb50182bCfDc',
  aPNTs: '0xBD0710596010a157B88cd141d797E8Ad4bb2306b',
  bPNTs: '0x70Da2c1B7Fcf471247Bc3B09f8927a4ab1751Ba3',
} as const;

/**
 * Paymaster Addresses
 */
export const PAYMASTER_ADDRESSES = {
  paymasterV4_1: '0x4D6A367aA183903968833Ec4AE361CFc8dDDBA38',
  paymasterV4_1iImplementation: '0x3E1C6a741f4b3f8bE24f324342539982324a6f8a',
} as const;

/**
 * Monitoring System Addresses
 */
export const MONITORING_ADDRESSES = {
  dvtValidator: '0x937CdD172fb0674Db688149093356F6dA95498FD',
  blsAggregator: '0x3Cf0587912c692aa0f5FEEEDC52959ABEEEFaEc6',
} as const;

/**
 * Official Contract Addresses
 */
export const OFFICIAL_ADDRESSES = {
  entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
} as const;

/**
 * Community Owner Addresses
 */
export const COMMUNITY_OWNERS = {
  aastarOwner: '0x411BD567E46C0781248dbB6a9211891C032885e5', // Deployer 1
  breadCommunityOwner: '0xe24b6f321B0140716a2b671ed0D983bb64E7DaFA', // OWNER2
} as const;

/**
 * All Addresses Combined (for reference)
 */
export const ALL_ADDRESSES = {
  ...CORE_ADDRESSES,
  ...TOKEN_ADDRESSES,
  ...TEST_TOKEN_ADDRESSES,
  ...PAYMASTER_ADDRESSES,
  ...MONITORING_ADDRESSES,
  ...OFFICIAL_ADDRESSES,
} as const;
