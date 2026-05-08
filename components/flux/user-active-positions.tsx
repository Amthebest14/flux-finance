"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TrendingUp, Shield, Cpu, Lock, ChevronRight, Wallet, ArrowUpRight, ArrowDownRight, Vault } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { VaultData } from "./deposit-modal"

interface UserPosition extends VaultData {
  userDeposit: string
  earnings24h: string
  earningsPercent: string
  isPositive: boolean
}

const userPositions: UserPosition[] = [
  {
    id: "1",
    name: "ZEN Yield Optimizer",
    description: "Auto-compounding yield strategy for ZEN holders",
    apy: 12.4,
    tvl: "$24.7M",
    riskLevel: "Low",
    privacyTech: "TEE",
    assets: ["ZEN"],
    userDeposit: "Loading...",
    earnings24h: "Loading...",
    earningsPercent: "+0.33%",
    isPositive: true,
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
    userDeposit: "Loading...",
    earnings24h: "Loading...",
    earningsPercent: "+0.023%",
    isPositive: true,
  },
]

const privacyTechConfig = {
  ZK: {
    icon: Shield,
    label: "ZK-Protected",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  TEE: {
    icon: Cpu,
    label: "TEE-Secured",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  MPC: {
    icon: Lock,
    label: "MPC-Protected",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
}

interface UserActivePositionsProps {
  onManagePosition: (vault: VaultData) => void
}

export function UserActivePositions({ onManagePosition }: UserActivePositionsProps) {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null)
  const [positions, setPositions] = useState<UserPosition[]>(userPositions)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock fetch to FluxVault.sol for active positions
    const fetchPositions = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const loadedPositions = [...userPositions]
      loadedPositions[0] = {
        ...loadedPositions[0],
        userDeposit: "$12,847.32",
        earnings24h: "+$42.18"
      }
      loadedPositions[1] = {
        ...loadedPositions[1],
        userDeposit: "$234,102.00",
        earnings24h: "+$52.87"
      }
      setPositions(loadedPositions)
      setIsLoading(false)
    }
    fetchPositions()
  }, [])
  
  // Toggle this to see empty state
  const hasPositions = positions.length > 0

  if (!hasPositions) {
    return (
      <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-10">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6">
            <Vault className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Active Positions</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Start earning yield by depositing into one of our privacy-preserving investment vaults.
          </p>
          <Link href="/vaults">
            <Button className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground">
              <Wallet className="w-4 h-4 mr-2" />
              Explore Vaults
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Active Positions</h3>
        <Badge variant="outline" className="text-[10px] border-glass-border text-muted-foreground">
          {positions.length} Vaults
        </Badge>
      </div>

      <div className="space-y-3">
        {positions.map((position) => {
          const PrivacyIcon = privacyTechConfig[position.privacyTech].icon
          return (
            <div
              key={position.id}
              className={`group relative p-4 md:p-5 rounded-xl glass-card transition-all duration-300 hover:border-primary/50 ${
                hoveredPosition === position.id ? "glow-border" : ""
              }`}
              onMouseEnter={() => setHoveredPosition(position.id)}
              onMouseLeave={() => setHoveredPosition(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Vault Info */}
                <div className="flex items-start gap-3 flex-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`p-2.5 rounded-xl ${privacyTechConfig[position.privacyTech].bg} flex-shrink-0`}>
                          <PrivacyIcon className={`w-5 h-5 ${privacyTechConfig[position.privacyTech].color}`} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="glass">
                        <p className="font-medium">{privacyTechConfig[position.privacyTech].label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-foreground text-sm">{position.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{position.assets.join(" / ")}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 md:gap-8">
                  {/* Your Deposit */}
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground mb-0.5">Your Deposit</p>
                    <p className="text-lg font-bold text-foreground">{position.userDeposit}</p>
                  </div>

                  {/* 24h Earnings */}
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground mb-0.5">24h Earnings</p>
                    <div className="flex items-center justify-end gap-1.5">
                      {position.isPositive ? (
                        <ArrowUpRight className="w-4 h-4 text-chart-3" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-lg font-bold ${position.isPositive ? "text-chart-3" : "text-destructive"}`}>
                        {position.earnings24h}
                      </span>
                    </div>
                  </div>

                  {/* APY */}
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-muted-foreground mb-0.5">APY</p>
                    <div className="flex items-center justify-end gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-chart-3" />
                      <span className="text-lg font-semibold text-chart-3">{position.apy}%</span>
                    </div>
                  </div>

                  {/* Action */}
                  <Button
                    onClick={() => onManagePosition(position)}
                    variant="outline"
                    size="sm"
                    className="border-glass-border hover:border-primary/50 hover:bg-primary/10 hidden md:flex"
                  >
                    Manage
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Mobile Action Button */}
              <Button
                onClick={() => onManagePosition(position)}
                className="w-full mt-4 bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground text-sm md:hidden"
              >
                Manage Position
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )
        })}
      </div>

      {/* Explore More Link */}
      <div className="flex justify-center pt-2">
        <Link href="/vaults">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Explore More Vaults
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
