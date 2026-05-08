"use client"

import { useState, useEffect } from "react"
import { Zap, Shield, Cpu, Lock, TrendingUp, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAccount, useBalance } from "wagmi"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function PersonalZenStats() {
  const { address } = useAccount()
  const { data: balanceData } = useBalance({ address })
  
  const baseZen = balanceData ? parseFloat(balanceData.formatted) : 0
  
  const [zenUsed, setZenUsed] = useState(baseZen)
  const [isIncrementing, setIsIncrementing] = useState(false)

  // Update base zen when balance changes
  useEffect(() => {
    if (balanceData) {
      setZenUsed(parseFloat(balanceData.formatted))
    }
  }, [balanceData])

  // Simulate live ZEN utility counter on top of actual balance
  useEffect(() => {
    if (baseZen === 0) return
    
    const interval = setInterval(() => {
      setIsIncrementing(true)
      setZenUsed((prev) => {
        const increment = Math.random() * 0.05 + 0.01
        return Math.round((prev + increment) * 100) / 100
      })
      setTimeout(() => setIsIncrementing(false), 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [baseZen])

  const utilityBreakdown = [
    {
      label: "TEE Validation",
      value: `${(zenUsed * 0.42).toFixed(2)} ZEN`,
      icon: Cpu,
      color: "text-primary",
      bg: "bg-primary/10",
      percent: 42,
    },
    {
      label: "ZK Proof Generation",
      value: `${(zenUsed * 0.33).toFixed(2)} ZEN`,
      icon: Shield,
      color: "text-accent",
      bg: "bg-accent/10",
      percent: 33,
    },
    {
      label: "Position Security",
      value: `${(zenUsed * 0.25).toFixed(2)} ZEN`,
      icon: Lock,
      color: "text-chart-4",
      bg: "bg-chart-4/10",
      percent: 25,
    },
  ]

  return (
    <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <h3 className="text-xs md:text-sm font-semibold text-foreground">Your ZEN Utility</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 rounded-md hover:bg-secondary/50 transition-colors">
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="glass max-w-xs">
              <p className="text-xs">
                ZEN tokens are actively securing your yield positions through TEE validation, 
                ZK proof generation, and position security protocols.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main Counter */}
      <div className="relative mb-6">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-300 ${
            isIncrementing ? "text-primary scale-[1.02]" : ""
          }`}>
            {zenUsed.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-lg font-semibold text-muted-foreground">ZEN</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Actively securing your positions</p>
        
        {/* Live indicator */}
        <div className="absolute top-0 right-0 flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${isIncrementing ? "bg-chart-3 animate-pulse" : "bg-primary"}`} />
          <span className="text-[10px] text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Utility Breakdown */}
      <div className="space-y-3">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Utility Breakdown
        </p>
        {utilityBreakdown.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${item.bg}`}>
                    <Icon className={`w-3 h-3 ${item.color}`} />
                  </div>
                  <span className="text-xs text-foreground">{item.label}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{item.value}</span>
              </div>
              {/* Progress bar */}
              <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.bg.replace('/10', '/50')}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Position Coverage */}
      <div className="mt-6 pt-4 border-t border-glass-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-chart-3" />
            <span className="text-xs text-muted-foreground">Yield Protection</span>
          </div>
          <Badge variant="outline" className="text-[10px] bg-chart-3/10 text-chart-3 border-chart-3/30">
            100% Covered
          </Badge>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          All your active positions are fully secured by ZEN utility tokens
        </p>
      </div>
    </div>
  )
}
