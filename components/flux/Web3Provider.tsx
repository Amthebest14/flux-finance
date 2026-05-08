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
    default: { http: ['https://rpc.testnet.horizen.io'] }, // Placeholder, update if needed
  },
  blockExplorers: {
    default: { name: 'Horizen Explorer', url: 'https://explorer.testnet.horizen.io' },
  },
  testnet: true,
});

const config = getDefaultConfig({
  appName: 'Flux Finance',
  projectId: 'YOUR_PROJECT_ID', // Replaced with actual WalletConnect project ID in production
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
