# Flux Finance

## Architecture Overview
Flux Finance is an institutional-grade confidential yield protocol built for the Horizen Base L3. It establishes a secure TEE-to-Solidity bridge, utilizing Trusted Execution Environments (TEEs) to manage private accounting and yield tracking securely off-chain while anchoring verifiable cryptographic proofs on-chain. This hybrid approach guarantees data confidentiality for depositors without sacrificing the transparency and immutability required in DeFi.

When a user deposits funds, the transaction is routed through a client-side encryption layer (Vela) before broadcasting. A dedicated Vela TEE Enclave processes this payload, updating an isolated, hidden ledger, and subsequently generates an attestation proof. This proof is sent to `FluxVault.sol` (ERC-4626), verifying the enclave's signature to seamlessly accept the deposit on-chain.

## Tech Stack
- **Frontend / Client**: Next.js 16+ (App Router), Tailwind CSS, Shadcn UI
- **Web3 Integration**: RainbowKit, Wagmi v2, Viem v2
- **Smart Contracts (EVM)**: Foundry, Solidity ^0.8.20, Solmate (ERC4626 standard)
- **Confidential Enclave (TEE)**: Rust, Vela TEE Starterkit (`vela-common-ts` for client encryption)
- **Deployment**: Vercel (Frontend), GitHub Actions (CI/CD)

## Milestone Tracker (150-Day Thrive Horizen Genesis Program)
- **[ ] Milestone 1 (Day 1-30): Project Approval & Scaffolding**
  - Architecture finalized, repository initialized.
  - TEE integration logic scaffolded (`lib.rs`) and Foundry smart contract initialized.
- **[ ] Milestone 2 (Day 31-75): Testnet Launch**
  - Full end-to-end testing on Horizen EON Testnet / Horizen Base L3 Testnet.
  - RainbowKit configured with `NEXT_PUBLIC_HORIZEN_RPC_URL` and `NEXT_PUBLIC_CHAIN_ID`.
- **[ ] Milestone 3 (Day 76-120): Mainnet Launch & Security Audit**
  - Independent smart contract and enclave audits.
  - Protocol deployment on the production network.
- **[ ] Milestone 4 (Day 121-150): Scaling & Liquidity Bootstrapping**
  - Institutional partnerships and initial TVL targets.

## Deployment Status
- **Vercel Live URL**: [TBD - Deploying via GitHub Integration]
- **Horizen Testnet Explorer**: [https://horizen-testnet.explorer.caldera.xyz/](https://horizen-testnet.explorer.caldera.xyz/)
- **Network RPC**: `https://horizen-testnet.rpc.caldera.xyz/http` (Chain ID: `2651420`)
