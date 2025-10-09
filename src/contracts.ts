/**
 * Smart Contract Addresses and Configuration
 */

export const CONTRACTS = {
  sepolia: {
    // Core Contracts
    paymasterV4: "0xBC56D82374c3CdF1234fa67E28AF9d3E31a9D445",
    entryPointV07: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",

    // Tokens
    pntToken: "0xD14E87d8D8B69016Fcc08728c33799bD3F66F180",
    sbtToken: "0xBfde68c232F2248114429DDD9a7c3Adbff74bD7f",

    // Accounts
    simpleAccount: "0x94FC9B8B7cAb56C01f20A24E37C2433FCe88A10D",
    treasury: "0x411BD567E46C0781248dbB6a9211891C032885e5",

    // Factories (deployed)
    simpleAccountFactory: "0x9bD66892144FCf0BAF5B6946AEAFf38B0d967881",
    gasTokenFactory: "0x6720Dc8ce5021bC6F3F126054556b5d3C125101F", // GasTokenFactoryV2
    usdtToken: "0x14EaC6C3D49AEDff3D59773A7d7bfb50182bCfDc", // Mock USDT

    // Registry (deployed)
    superPaymasterRegistry: "0x838da93c815a6E45Aa50429529da9106C0621eF0", // SuperPaymasterRegistry v1.2
  },
} as const;

export type ContractNetwork = keyof typeof CONTRACTS;
