'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';

const horizenTestnet = defineChain({
  id: 2651420,
  name: 'Horizen Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Test ZEN',
    symbol: 'tZEN',
  },
  rpcUrls: {
    default: { http: ['https://horizen-testnet.rpc.caldera.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'Horizen Explorer', url: 'https://horizen-testnet.explorer.caldera.xyz/' },
  },
  testnet: true,
});

const config = getDefaultConfig({
  appName: 'Flux Finance',
  projectId: '90f7c21eef9af7a0b4ae6f05eb8e9f88', // Updated with user provided WalletConnect ID
  chains: [horizenTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
