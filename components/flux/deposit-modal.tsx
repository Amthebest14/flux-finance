"use client"

import { useState } from "react"
import { Shield, Cpu, Lock, Check, ArrowRight, Loader2, AlertTriangle, Info } from "lucide-react"
import { useBalance, useAccount, useWriteContract } from "wagmi"
import { ADDRESSES } from "@/lib/addresses"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
export interface VaultData {
  id: string
  name: string
  description: string
  apy: number
  tvl: string
  riskLevel: "Low" | "Medium" | "High"
  privacyTech: "ZK" | "TEE" | "MPC"
  assets: string[]
  userDeposit?: string
  section?: string
  strategyDetails?: string
}

interface DepositModalProps {
  vault: VaultData | null
  open: boolean
  onClose: () => void
}

type Step = "amount" | "review" | "confidentiality" | "processing" | "success"

export function DepositModal({ vault, open, onClose }: DepositModalProps) {
  const [step, setStep] = useState<Step>("amount")
  const [amount, setAmount] = useState("")
  const [selectedAsset, setSelectedAsset] = useState<string>("")

  const { address } = useAccount()
  const { data: zenBalance } = useBalance({
    address,
    token: ADDRESSES.token as `0x${string}`,
  })
  const { writeContractAsync } = useWriteContract()

  const handleClose = () => {
    setStep("amount")
    setAmount("")
    setSelectedAsset("")
    onClose()
  }

  const handleContinue = async () => {
    if (step === "amount") setStep("review")
    else if (step === "review") setStep("confidentiality")
    else if (step === "confidentiality") {
      setStep("processing")
      try {
        await writeContractAsync({
          address: ADDRESSES.vault as `0x${string}`,
          abi: [
            {
              type: "function",
              name: "shieldedDeposit",
              inputs: [
                { type: "uint256", name: "assets" },
                { type: "address", name: "receiver" },
                { type: "bytes", name: "attestation" },
              ],
              outputs: [{ type: "uint256", name: "shares" }],
              stateMutability: "nonpayable",
            },
          ],
          functionName: "shieldedDeposit",
          args: [
            BigInt(Math.floor(parseFloat(amount) * 1e18)), // Convert to wei
            address as `0x${string}`,
            "0x1234", // Mock attestation
          ],
        })
        setStep("success")
      } catch (error) {
        console.error("Deposit failed:", error);
        setStep("amount"); // Go back or show error
      }
    }
  }

  if (!vault) return null

  const privacyTechConfig = {
    ZK: {
      icon: Shield,
      name: "Zero-Knowledge Proofs",
      description: "Your transaction will be proven valid without revealing the amounts",
    },
    TEE: {
      icon: Cpu,
      name: "Horizen Vela TEE",
      description: "Your transaction will be processed inside a trusted execution environment",
    },
    MPC: {
      icon: Lock,
      name: "Multi-Party Computation",
      description: "Your keys are secured using distributed key management",
    },
  }

  const PrivacyIcon = privacyTechConfig[vault.privacyTech].icon

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-glass-border sm:max-w-[500px]">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {["amount", "review", "confidentiality", "processing", "success"].map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  step === s
                    ? "w-6 bg-primary"
                    : ["amount", "review", "confidentiality", "processing", "success"].indexOf(step) > index
                    ? "bg-accent"
                    : "bg-muted"
                }`}
              />
              {index < 4 && <div className="w-8 h-px bg-muted mx-1" />}
            </div>
          ))}
        </div>

        {/* Step: Amount */}
        {step === "amount" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Deposit to {vault.name}
              </DialogTitle>
              <DialogDescription>
                Select an asset and enter the amount you want to deposit.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Asset Selection */}
              <div className="space-y-2">
                <Label>Select Asset</Label>
                <div className="grid grid-cols-3 gap-2">
                  {vault.assets.map((asset) => (
                    <button
                      key={asset}
                      onClick={() => setSelectedAsset(asset)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedAsset === asset
                          ? "border-primary bg-primary/10"
                          : "border-glass-border bg-secondary/30 hover:border-primary/50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center text-sm font-medium">
                        {asset.charAt(0)}
                      </div>
                      <p className="text-sm font-medium text-center">{asset}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Amount</Label>
                  <span className="text-xs text-muted-foreground">
                    Balance: {selectedAsset === "ZEN" ? (zenBalance?.formatted || "0.00") : "0.00"} {selectedAsset || "—"}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pr-20 text-lg font-mono bg-input border-glass-border"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary"
                    onClick={() => setAmount(selectedAsset === "ZEN" ? (zenBalance?.formatted || "0") : "0")}
                  >
                    MAX
                  </Button>
                </div>
              </div>

              {/* Estimated Returns */}
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Estimated APY</span>
                  <span className="text-sm font-semibold text-accent">{vault.apy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Annual Yield</span>
                  <span className="text-sm font-semibold text-foreground">
                    ~{amount ? (parseFloat(amount) * (vault.apy / 100)).toFixed(2) : "0.00"} {selectedAsset}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!amount || !selectedAsset}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}

        {/* Step: Review */}
        {step === "review" && (
          <>
            <DialogHeader>
              <DialogTitle>Review Your Deposit</DialogTitle>
              <DialogDescription>
                Please review the details before proceeding.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-glass-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vault</span>
                  <span className="text-sm font-medium">{vault.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-mono font-medium">{amount} {selectedAsset}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">APY</span>
                  <span className="text-sm font-medium text-accent">{vault.apy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <Badge variant="outline" className="text-xs">{vault.riskLevel}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Privacy Technology</span>
                  <Badge variant="outline" className="text-xs">
                    <PrivacyIcon className="w-3 h-3 mr-1" />
                    {vault.privacyTech}
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/20">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Deposited funds will be locked for a minimum of 24 hours. Early withdrawal may incur fees.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("amount")} className="flex-1">
                Back
              </Button>
              <Button onClick={handleContinue} className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Proceed to Encrypt
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {/* Step: Confidentiality Confirmation */}
        {step === "confidentiality" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PrivacyIcon className="w-5 h-5 text-primary" />
                Confidentiality Confirmation
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <PrivacyIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {privacyTechConfig[vault.privacyTech].name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {privacyTechConfig[vault.privacyTech].description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-glass-border">
                  <div className="p-1.5 rounded-full bg-accent/10">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Transaction Encryption</p>
                    <p className="text-xs text-muted-foreground">
                      Your deposit amount and destination will be encrypted before submission.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-glass-border">
                  <div className="p-1.5 rounded-full bg-accent/10">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Vela Enclave Processing</p>
                    <p className="text-xs text-muted-foreground">
                      The transaction will be processed inside the Horizen Vela TEE for maximum security.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-glass-border">
                  <div className="p-1.5 rounded-full bg-accent/10">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Shielded Confirmation</p>
                    <p className="text-xs text-muted-foreground">
                      Only you will be able to verify the transaction details on-chain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <Info className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  By proceeding, you agree that your transaction will be encrypted and processed confidentially.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("review")} className="flex-1">
                Back
              </Button>
              <Button onClick={handleContinue} className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 animate-glow">
                <Shield className="w-4 h-4 mr-2" />
                Confirm & Encrypt
              </Button>
            </div>
          </>
        )}

        {/* Step: Processing */}
        {step === "processing" && (
          <div className="py-8 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
              <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Encrypting Transaction</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your transaction is being encrypted and sent to the Vela enclave...
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <Check className="w-3 h-3 text-accent" />
                Generating zero-knowledge proof...
              </p>
              <p className="flex items-center justify-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                Submitting to Vela TEE...
              </p>
            </div>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Deposit Successful</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your {amount} {selectedAsset} has been securely deposited into {vault.name}.
            </p>
            <div className="p-4 rounded-lg bg-secondary/30 border border-glass-border mb-6">
              <p className="text-xs text-muted-foreground mb-1">Transaction Hash (Shielded)</p>
              <p className="text-sm font-mono text-foreground">0x7f3e...9a2c...b4d1</p>
            </div>
            <Button onClick={handleClose} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
