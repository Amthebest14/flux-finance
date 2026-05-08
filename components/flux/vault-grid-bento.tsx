"use client"

import { useState } from "react"
import { TrendingUp, Shield, Cpu, Lock, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { VaultData } from "./deposit-modal"
export type { VaultData }

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
]

const riskColors = {
  Low: "bg-chart-3/10 text-chart-3 border-chart-3/30",
  Medium: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30",
  High: "bg-destructive/10 text-destructive border-destructive/30",
}

const privacyTechConfig = {
  ZK: {
    icon: Shield,
    label: "Powered by ZK",
    shortLabel: "ZK",
    description: "Zero-knowledge proofs ensure transaction privacy",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  TEE: {
    icon: Cpu,
    label: "TEE-Secured",
    shortLabel: "TEE",
    description: "Horizen Vela trusted execution environment",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  MPC: {
    icon: Lock,
    label: "MPC Protected",
    shortLabel: "MPC",
    description: "Multi-party computation for key management",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
}

interface VaultGridBentoProps {
  onDeposit: (vault: VaultData) => void
}

export function VaultGridBento({ onDeposit }: VaultGridBentoProps) {
  const [hoveredVault, setHoveredVault] = useState<string | null>(null)

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs md:text-sm font-semibold text-foreground">Investment Vaults</h3>
        <Badge variant="outline" className="text-[9px] md:text-[10px] border-glass-border text-muted-foreground">
          {vaults.length} Active
        </Badge>
      </div>

      {/* Grid: 1 column on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5">
        {vaults.map((vault) => {
          const PrivacyIcon = privacyTechConfig[vault.privacyTech].icon
          return (
            <div
              key={vault.id}
              className={`group relative p-4 md:p-5 rounded-xl md:rounded-2xl glass-card transition-all duration-300 hover:border-primary/50 ${
                hoveredVault === vault.id ? "glow-border" : ""
              }`}
              onMouseEnter={() => setHoveredVault(vault.id)}
              onMouseLeave={() => setHoveredVault(null)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-0.5 md:mb-1 text-sm md:text-base truncate">{vault.name}</h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-1">{vault.description}</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`p-2 md:p-2.5 rounded-lg md:rounded-xl ${privacyTechConfig[vault.privacyTech].bg} flex-shrink-0 ml-2`}>
                        <PrivacyIcon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${privacyTechConfig[vault.privacyTech].color}`} />
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

              {/* Stats - More compact on mobile */}
              <div className="flex items-center gap-4 md:gap-6 mb-3 md:mb-5">
                <div>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5 md:mb-1">APY</p>
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-chart-3" />
                    <span className="text-lg md:text-xl font-bold text-chart-3">{vault.apy}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5 md:mb-1">TVL</p>
                  <p className="text-lg md:text-xl font-semibold text-foreground">{vault.tvl}</p>
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5 md:mb-1">Risk</p>
                  <Badge variant="outline" className={`text-[9px] md:text-[10px] ${riskColors[vault.riskLevel]}`}>
                    {vault.riskLevel}
                  </Badge>
                </div>
              </div>

              {/* Assets & Badge - Simplified on mobile */}
              <div className="flex items-center justify-between mb-3 md:mb-5">
                <div className="flex items-center gap-1 md:gap-1.5">
                  {vault.assets.map((asset, index) => (
                    <div
                      key={asset}
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-secondary flex items-center justify-center text-[9px] md:text-[10px] font-semibold border border-glass-border"
                      style={{ marginLeft: index > 0 ? "-8px" : "0", zIndex: vault.assets.length - index }}
                    >
                      {asset.charAt(0)}
                    </div>
                  ))}
                  <span className="text-[10px] md:text-xs text-muted-foreground ml-1.5 md:ml-2">
                    {vault.assets.join(" / ")}
                  </span>
                </div>
                {/* Show short label on mobile, full label on desktop */}
                <Badge variant="outline" className={`text-[9px] md:text-[10px] ${privacyTechConfig[vault.privacyTech].bg} ${privacyTechConfig[vault.privacyTech].color} border-transparent`}>
                  <span className="md:hidden">{privacyTechConfig[vault.privacyTech].shortLabel}</span>
                  <span className="hidden md:inline">{privacyTechConfig[vault.privacyTech].label}</span>
                </Badge>
              </div>

              {/* User Deposit */}
              {vault.userDeposit && (
                <div className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-primary/5 border border-primary/20 mb-3 md:mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs text-muted-foreground">Your Position</span>
                    <span className="text-xs md:text-sm font-semibold text-foreground">{vault.userDeposit}</span>
                  </div>
                </div>
              )}

              {/* Action - Full width button */}
              <Button
                onClick={() => onDeposit(vault)}
                className="w-full bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground text-xs md:text-sm py-2.5 md:py-3"
              >
                <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                {vault.userDeposit ? "Manage Position" : "Deposit Now"}
                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-auto" />
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
