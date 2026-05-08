"use client"

import { useState } from "react"
import { Vault, TrendingUp, Shield, Cpu, Lock, Zap, ChevronRight, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { VaultData } from "./deposit-modal"

const vaults: VaultData[] = [
  {
    id: "1",
    name: "ZEN Yield Optimizer",
    description: "Auto-compounding yield strategy for ZEN holders",
    apy: 12.4,
    tvl: "$24.7M",
    riskLevel: "Low",
    privacyTech: "TEE",
    assets: ["ZEN"],
    userDeposit: "$12,847.32",
  },
  {
    id: "2",
    name: "Stable Shield Pool",
    description: "Protected stablecoin yield with zero-knowledge proofs",
    apy: 8.2,
    tvl: "$156.3M",
    riskLevel: "Low",
    privacyTech: "ZK",
    assets: ["USDC", "USDT"],
    userDeposit: "$234,102.00",
  },
  {
    id: "3",
    name: "DeFi Alpha Vault",
    description: "Actively managed cross-chain yield hunting",
    apy: 24.8,
    tvl: "$8.4M",
    riskLevel: "High",
    privacyTech: "MPC",
    assets: ["ZEN", "ETH", "USDC"],
  },
  {
    id: "4",
    name: "Institutional Grade",
    description: "Conservative yield for institutional allocators",
    apy: 6.1,
    tvl: "$342.8M",
    riskLevel: "Low",
    privacyTech: "TEE",
    assets: ["USDC"],
  },
  {
    id: "5",
    name: "Leveraged ZEN",
    description: "Amplified exposure to ZEN ecosystem growth",
    apy: 34.2,
    tvl: "$4.2M",
    riskLevel: "High",
    privacyTech: "ZK",
    assets: ["ZEN"],
  },
  {
    id: "6",
    name: "Horizon Bridge LP",
    description: "Provide liquidity for cross-chain bridge operations",
    apy: 15.7,
    tvl: "$67.9M",
    riskLevel: "Medium",
    privacyTech: "MPC",
    assets: ["ZEN", "ETH"],
  },
]

const riskColors = {
  Low: "bg-accent/10 text-accent border-accent/30",
  Medium: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30",
  High: "bg-destructive/10 text-destructive border-destructive/30",
}

const privacyTechConfig = {
  ZK: {
    icon: Shield,
    label: "Powered by ZK",
    description: "Zero-knowledge proofs ensure transaction privacy",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  TEE: {
    icon: Cpu,
    label: "TEE-Secured",
    description: "Horizen Vela trusted execution environment",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  MPC: {
    icon: Lock,
    label: "MPC Protected",
    description: "Multi-party computation for key management",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
}

interface VaultGridProps {
  onDeposit: (vault: VaultData) => void
}

export function VaultGrid({ onDeposit }: VaultGridProps) {
  const [hoveredVault, setHoveredVault] = useState<string | null>(null)

  return (
    <Card className="glass-card rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Vault className="w-5 h-5 text-primary" />
            Investment Vaults
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-glass-border text-muted-foreground">
              6 Active Vaults
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {vaults.map((vault) => {
            const PrivacyIcon = privacyTechConfig[vault.privacyTech].icon
            return (
              <div
                key={vault.id}
                className={`group relative p-4 rounded-xl bg-secondary/30 border border-glass-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer ${
                  hoveredVault === vault.id ? "glow-border" : ""
                }`}
                onMouseEnter={() => setHoveredVault(vault.id)}
                onMouseLeave={() => setHoveredVault(null)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{vault.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{vault.description}</p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`p-2 rounded-lg ${privacyTechConfig[vault.privacyTech].bg}`}>
                          <PrivacyIcon className={`w-4 h-4 ${privacyTechConfig[vault.privacyTech].color}`} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="glass">
                        <p className="font-medium">{privacyTechConfig[vault.privacyTech].label}</p>
                        <p className="text-xs text-muted-foreground">
                          {privacyTechConfig[vault.privacyTech].description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">APY</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-accent" />
                      <span className="text-lg font-bold text-accent">{vault.apy}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">TVL</p>
                    <p className="text-lg font-semibold text-foreground">{vault.tvl}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className={`text-xs ${riskColors[vault.riskLevel]}`}>
                    {vault.riskLevel} Risk
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${privacyTechConfig[vault.privacyTech].bg} ${privacyTechConfig[vault.privacyTech].color} border-transparent`}>
                    {privacyTechConfig[vault.privacyTech].label}
                  </Badge>
                </div>

                {/* Assets */}
                <div className="flex items-center gap-1 mb-4">
                  {vault.assets.map((asset, index) => (
                    <div
                      key={asset}
                      className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium border border-glass-border"
                      style={{ marginLeft: index > 0 ? "-8px" : "0", zIndex: vault.assets.length - index }}
                    >
                      {asset.charAt(0)}
                    </div>
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">
                    {vault.assets.join(", ")}
                  </span>
                </div>

                {/* User Deposit */}
                {vault.userDeposit && (
                  <div className="p-2 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Your Deposit</span>
                      <span className="text-sm font-semibold text-foreground">{vault.userDeposit}</span>
                    </div>
                  </div>
                )}

                {/* Action */}
                <Button
                  onClick={() => onDeposit(vault)}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground group-hover:animate-glow"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {vault.userDeposit ? "Manage Position" : "Deposit Now"}
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export type { VaultData }
