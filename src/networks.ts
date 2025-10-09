/**
 * Blockchain Network Configuration
 */

export const NETWORKS = {
  sepolia: {
    chainId: 11155111,
    name: "Sepolia",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/Bx4QRW1-vnwJUePSAAD7N",
    blockExplorer: "https://sepolia.etherscan.io",
    nativeCurrency: {
      name: "Sepolia ETH",
      symbol: "ETH",
      decimals: 18,
    },
  },
} as const;

export type SupportedNetwork = keyof typeof NETWORKS;

export function getNetwork(network: SupportedNetwork) {
  return NETWORKS[network];
}

export function getRpcUrl(network: SupportedNetwork) {
  return NETWORKS[network].rpcUrl;
}

export function getBlockExplorer(network: SupportedNetwork) {
  return NETWORKS[network].blockExplorer;
}
