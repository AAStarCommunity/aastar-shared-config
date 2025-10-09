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

    // Factories (to be deployed)
    simpleAccountFactory: "", // Will be updated after deployment
    gasTokenFactory: "",
    usdtToken: "", // Mock USDT to be deployed

    // Registry (if deployed)
    superPaymasterRegistry: "",
  },
} as const;

export type ContractNetwork = keyof typeof CONTRACTS;
