"use client"

import { useState, useMemo } from "react"
import { TrendingUp, Shield, Cpu, Lock, Zap, ChevronRight, SlidersHorizontal, ArrowUpDown, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { VaultData } from "./deposit-modal"
import { useReadContract } from "wagmi"
import { ADDRESSES } from "@/lib/addresses"

const allVaults: VaultData[] = [
  {
    id: "1",
    name: "ZEN Yield Optimizer",
    description: "Auto-compounding yield strategy for ZEN holders",
    apy: 12.4,
    tvl: "$24.7M",
    riskLevel: "Low",
    privacyTech: "TEE",
    assets: ["ZEN"],
    section: "Liquidity Engines",
    strategyDetails: "This strategy automatically compounds yield for ZEN holders by interacting with whitelisted lending protocols inside a secure TEE enclave. The enclave monitors yield rates and rebalances funds without exposing the strategy to the public mempool."
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
    section: "Stable Core",
    strategyDetails: "Utilizes zero-knowledge proofs to verify user deposits and withdrawals without revealing individual balances. Funds are deployed into top-tier stablecoin yield aggregators with risk management handled by the protocol."
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
    section: "Alpha Enclave",
    strategyDetails: "An aggressive strategy that hunts for yield across multiple chains. Keys are managed via Multi-Party Computation (MPC) to ensure no single entity can access funds. The strategy adapts to market conditions in real-time."
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
    section: "Stable Core",
    strategyDetails: "Designed for large allocators, this vault focuses on capital preservation and steady yield. It operates inside a TEE to ensure all operations are verifiable and audit trails are cryptographically secured."
  },
  {
    id: "5",
    name: "ETH-ZEN LP Maximizer",
    description: "Liquidity provision with impermanent loss protection",
    apy: 18.7,
    tvl: "$45.2M",
    riskLevel: "Medium",
    privacyTech: "ZK",
    assets: ["ETH", "ZEN"],
    section: "Liquidity Engines",
    strategyDetails: "Provides liquidity to ETH-ZEN pools while using ZK-proofs to hedge against impermanent loss. The strategy dynamically adjusts positions to maintain a delta-neutral stance relative to the pool."
  },
  {
    id: "6",
    name: "Privacy Pioneer Fund",
    description: "Early-stage privacy protocol investments",
    apy: 32.4,
    tvl: "$12.1M",
    riskLevel: "High",
    privacyTech: "MPC",
    assets: ["ZEN", "USDC", "ETH"],
    section: "Alpha Enclave",
    strategyDetails: "Invests in early-stage privacy-preserving protocols. Fund management is secured by MPC, requiring a consensus among managers to execute trades. This highlights the advanced security for higher-risk strategies."
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
    description: "Zero-knowledge proofs ensure transaction privacy",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  TEE: {
    icon: Cpu,
    label: "TEE-Secured",
    description: "Horizen Vela trusted execution environment",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  MPC: {
    icon: Lock,
    label: "MPC Protected",
    description: "Multi-party computation for key management",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
}

type SortOption = "apy-high" | "apy-low" | "tvl-high" | "tvl-low" | "name"
type RiskFilter = "all" | "Low" | "Medium" | "High"

interface VaultMarketplaceProps {
  onDeposit: (vault: VaultData) => void
}

export function VaultMarketplace({ onDeposit }: VaultMarketplaceProps) {
  const [hoveredVault, setHoveredVault] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("apy-high")
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all")
  const [privacyFilter, setPrivacyFilter] = useState<string>("All")
  const [selectedVaultForDrawer, setSelectedVaultForDrawer] = useState<VaultData | null>(null)

  const { data: totalAssets } = useReadContract({
    address: ADDRESSES.vault as `0x${string}`,
    abi: [
      {
        type: "function",
        name: "totalAssets",
        inputs: [],
        outputs: [{ type: "uint256" }],
        stateMutability: "view",
      },
    ],
    functionName: "totalAssets",
  })

  const { data: contractApy } = useReadContract({
    address: ADDRESSES.vault as `0x${string}`,
    abi: [
      {
        type: "function",
        name: "getAPY",
        inputs: [],
        outputs: [{ type: "uint256" }],
        stateMutability: "view",
      },
    ],
    functionName: "getAPY",
  })

  const sortLabels: Record<SortOption, string> = {
    "apy-high": "APY: High to Low",
    "apy-low": "APY: Low to High",
    "tvl-high": "TVL: High to Low",
    "tvl-low": "TVL: Low to High",
    "name": "Name: A-Z",
  }

  const filteredAndSortedVaults = useMemo(() => {
    let filtered = allVaults

    // Apply risk filter
    if (riskFilter !== "all") {
      filtered = filtered.filter((v) => v.riskLevel === riskFilter)
    }

    // Apply privacy filter
    if (privacyFilter !== "All") {
      filtered = filtered.filter((v) => v.privacyTech === privacyFilter)
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "apy-high":
          return b.apy - a.apy
        case "apy-low":
          return a.apy - b.apy
        case "tvl-high":
          return parseFloat(b.tvl.replace(/[$M]/g, "")) - parseFloat(a.tvl.replace(/[$M]/g, ""))
        case "tvl-low":
          return parseFloat(a.tvl.replace(/[$M]/g, "")) - parseFloat(b.tvl.replace(/[$M]/g, ""))
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return sorted
  }, [sortBy, riskFilter, privacyFilter])

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Showing {filteredAndSortedVaults.length} of {allVaults.length} vaults
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Risk Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-glass-border">
                <Shield className="w-4 h-4 mr-2" />
                Risk: {riskFilter === "all" ? "All" : riskFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass">
              <DropdownMenuLabel>Filter by Risk</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(["all", "Low", "Medium", "High"] as RiskFilter[]).map((risk) => (
                <DropdownMenuItem
                  key={risk}
                  onClick={() => setRiskFilter(risk)}
                  className="flex items-center justify-between"
                >
                  <span>{risk === "all" ? "All Risks" : risk}</span>
                  {riskFilter === risk && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort By */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-glass-border">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="flex items-center justify-between"
                >
                  <span>{sortLabels[option]}</span>
                  {sortBy === option && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Privacy Toggle Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "TEE", "ZK", "MPC"].map((tech) => (
          <Button
            key={tech}
            variant={privacyFilter === tech ? "default" : "outline"}
            size="sm"
            onClick={() => setPrivacyFilter(tech)}
            className={`border-glass-border rounded-full ${
              privacyFilter === tech
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "glass hover:bg-secondary/50"
            }`}
          >
            {tech === "All" ? "All Tech" : tech === "ZK" ? "ZK-Powered" : tech === "TEE" ? "TEE-Secured" : "MPC-Protected"}
          </Button>
        ))}
      </div>

      {/* Sectionalized Vault Grid */}
      <div className="space-y-12">
        {["Stable Core", "Alpha Enclave", "Liquidity Engines"].map((section) => {
          const sectionVaults = filteredAndSortedVaults.filter((v) => v.section === section)
          if (sectionVaults.length === 0) return null
          return (
            <div key={section} className="space-y-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  section === "Stable Core" ? "bg-cyan-400" :
                  section === "Alpha Enclave" ? "bg-accent animate-pulse" : "bg-primary"
                }`} />
                {section}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {sectionVaults.map((vault) => {
                  const PrivacyIcon = privacyTechConfig[vault.privacyTech].icon
                  return (
                    <div
                      key={vault.id}
                      className={`group relative p-5 md:p-6 rounded-xl md:rounded-2xl glass-card transition-all duration-300 hover:border-primary/50 ${
                        hoveredVault === vault.id ? "glow-border" : ""
                      }`}
                      onMouseEnter={() => setHoveredVault(vault.id)}
                      onMouseLeave={() => setHoveredVault(null)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground mb-1 text-base">{vault.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{vault.description}</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={`p-2.5 rounded-xl ${privacyTechConfig[vault.privacyTech].bg} flex-shrink-0 ml-3`}>
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
                      <div className="flex items-center gap-6 mb-5">
                        <div>
                          <p className="text-[10px] text-muted-foreground mb-1">APY</p>
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-chart-3" />
                            <span className="text-xl font-bold text-chart-3">{vault.apy}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground mb-1">TVL</p>
                          <p className="text-xl font-semibold text-foreground">{vault.tvl}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground mb-1">Risk</p>
                          <Badge variant="outline" className={`text-[10px] ${riskColors[vault.riskLevel]}`}>
                            {vault.riskLevel}
                          </Badge>
                        </div>
                      </div>

                      {/* Assets & Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1.5">
                          {vault.assets.map((asset, index) => (
                            <div
                              key={asset}
                              className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-semibold border border-glass-border"
                              style={{ marginLeft: index > 0 ? "-8px" : "0", zIndex: vault.assets.length - index }}
                            >
                              {asset.charAt(0)}
                            </div>
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">
                            {vault.assets.join(" / ")}
                          </span>
                        </div>
                        <Badge variant="outline" className={`text-[10px] ${privacyTechConfig[vault.privacyTech].bg} ${privacyTechConfig[vault.privacyTech].color} border-transparent`}>
                          {privacyTechConfig[vault.privacyTech].label}
                        </Badge>
                      </div>

                      {/* Strategy Link */}
                      <div className="mb-4">
                        <button
                          onClick={() => setSelectedVaultForDrawer(vault)}
                          className="text-xs text-primary hover:text-cyan-400 flex items-center gap-1 transition-colors"
                        >
                          <Info className="w-3 h-3" />
                          View Strategy Logic
                        </button>
                      </div>

                      {/* Action */}
                      <Button
                        onClick={() => onDeposit(vault)}
                        className="w-full bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground text-sm"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Deposit Now
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedVaults.length === 0 && (
        <div className="glass-card rounded-xl p-10 text-center">
          <p className="text-muted-foreground">No vaults match your filters.</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRiskFilter("all")}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Strategy Drawer */}
      <Sheet open={!!selectedVaultForDrawer} onOpenChange={(open) => !open && setSelectedVaultForDrawer(null)}>
        <SheetContent className="glass border-glass-border sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selectedVaultForDrawer?.name} Strategy</SheetTitle>
            <SheetDescription>
              Detailed execution logic secured by {selectedVaultForDrawer && privacyTechConfig[selectedVaultForDrawer.privacyTech].label}.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="p-4 rounded-lg bg-secondary/30 border border-glass-border">
              <h4 className="text-sm font-semibold mb-2">How it works</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedVaultForDrawer?.strategyDetails}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Security Properties</h4>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Check className="w-4 h-4 text-accent mt-0.5" />
                <span>Enclave code is open-source and verifiably compiled.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Check className="w-4 h-4 text-accent mt-0.5" />
                <span>Operator cannot access user funds or view strategies.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Check className="w-4 h-4 text-accent mt-0.5" />
                <span>Real-time on-chain proof verification before execution.</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
