"use client"

import { useState, useEffect } from "react"
import { Zap, Shield, TrendingUp, Lock, Cpu, Activity, ChevronRight, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface UtilityMetric {
  label: string
  value: number
  unit: string
  icon: typeof Zap
  trend: string
}

export function ZenUtilitySidebar() {
  const [zenUtility, setZenUtility] = useState(8472.34)
  const [isAnimating, setIsAnimating] = useState(false)

  // Simulate live counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setZenUtility((prev) => prev + Math.random() * 0.5)
      setTimeout(() => setIsAnimating(false), 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const metrics: UtilityMetric[] = [
    { label: "TEE Validation", value: 2847.12, unit: "ZEN", icon: Cpu, trend: "+12.4%" },
    { label: "ZK Proof Gen", value: 1923.45, unit: "ZEN", icon: Shield, trend: "+8.7%" },
    { label: "Yield Securing", value: 3701.77, unit: "ZEN", icon: Lock, trend: "+15.2%" },
  ]

  const networkStats = [
    { label: "Active Validators", value: "1,247", change: "+23" },
    { label: "Avg Block Time", value: "2.1s", change: "-0.3s" },
    { label: "Network Uptime", value: "99.97%", change: "" },
  ]

  return (
    <aside className="w-80 flex-shrink-0 h-full">
      <div className="glass-card rounded-xl h-full p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">ZEN Utility</h2>
              <p className="text-xs text-muted-foreground">Live Protocol Stats</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-accent">
            <Activity className="w-3 h-3 animate-pulse" />
            <span className="text-xs font-medium">Live</span>
          </div>
        </div>

        {/* Main Counter */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />
          <div className="relative p-6 rounded-xl bg-secondary/50 border border-glass-border glow-border">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent" />
              Your ZEN Securing Yield
            </p>
            <div className={`transition-transform ${isAnimating ? "counter-animate" : ""}`}>
              <span className="text-4xl font-bold text-gradient tabular-nums">
                {zenUtility.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-lg text-muted-foreground ml-2">ZEN</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-3 h-3 text-accent" />
              <span className="text-sm text-accent">+247.32 ZEN today</span>
            </div>
          </div>
        </div>

        {/* Utility Breakdown */}
        <div className="space-y-3 mb-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Utility Breakdown</p>
          {metrics.map((metric) => {
            const MetricIcon = metric.icon
            return (
              <div
                key={metric.label}
                className="p-3 rounded-lg bg-secondary/30 border border-glass-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MetricIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                  </div>
                  <span className="text-xs text-accent">{metric.trend}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-foreground tabular-nums">
                    {metric.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-muted-foreground">{metric.unit}</span>
                </div>
                <Progress
                  value={(metric.value / zenUtility) * 100}
                  className="h-1 mt-2 bg-muted"
                />
              </div>
            )
          })}
        </div>

        {/* Network Stats */}
        <div className="space-y-3 mb-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Network Status</p>
          <div className="grid grid-cols-3 gap-2">
            {networkStats.map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-lg bg-secondary/30 border border-glass-border">
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                {stat.change && (
                  <p className="text-[10px] text-accent">{stat.change}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Staking CTA */}
        <div className="mt-auto">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Boost Your Security</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Stake more ZEN to increase your yield protection and earn additional rewards.
            </p>
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground" size="sm">
              Stake More ZEN
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
            View on Horizen Explorer
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
