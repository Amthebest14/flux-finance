"use client"

import { useState, useEffect } from "react"
import { Zap, Shield, TrendingUp, Lock, Cpu, Activity, ChevronRight, ChevronLeft, Sparkles, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface UtilityMetric {
  label: string
  value: number
  unit: string
  icon: typeof Zap
  trend: string
}

export function CollapsibleZenSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [zenUtility, setZenUtility] = useState(8472.34)
  const [isAnimating, setIsAnimating] = useState(false)

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
    { label: "Validators", value: "1,247" },
    { label: "Block Time", value: "2.1s" },
    { label: "Uptime", value: "99.97%" },
  ]

  if (isCollapsed) {
    return (
      <div className="glass-card rounded-xl p-3 flex flex-col items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold text-gradient tabular-nums ${isAnimating ? "counter-animate" : ""}`}>
            {zenUtility.toFixed(0)}
          </p>
          <p className="text-[10px] text-muted-foreground">ZEN</p>
        </div>
        <div className="flex items-center gap-1 text-chart-3">
          <Activity className="w-3 h-3 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl p-5 w-72 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-sm">ZEN Utility</h2>
            <p className="text-[10px] text-muted-foreground">Live Stats</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Counter */}
      <div className="relative mb-5">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg" />
        <div className="relative p-4 rounded-xl bg-secondary/50 border border-glass-border glow-border">
          <p className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-accent" />
            Your ZEN Securing Yield
          </p>
          <div className={`transition-transform ${isAnimating ? "counter-animate" : ""}`}>
            <span className="text-2xl font-bold text-gradient tabular-nums">
              {zenUtility.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-sm text-muted-foreground ml-1">ZEN</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <TrendingUp className="w-3 h-3 text-chart-3" />
            <span className="text-xs text-chart-3">+247.32 today</span>
          </div>
        </div>
      </div>

      {/* Utility Breakdown */}
      <div className="space-y-2 mb-5 flex-1">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Breakdown</p>
        {metrics.map((metric) => {
          const MetricIcon = metric.icon
          return (
            <div
              key={metric.label}
              className="p-2.5 rounded-lg bg-secondary/30 border border-glass-border"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <MetricIcon className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                </div>
                <span className="text-[10px] text-chart-3">{metric.trend}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {metric.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-muted-foreground">{metric.unit}</span>
              </div>
              <Progress
                value={(metric.value / zenUtility) * 100}
                className="h-0.5 mt-1.5 bg-muted"
              />
            </div>
          )
        })}
      </div>

      {/* Network Stats */}
      <div className="mb-4">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Network</p>
        <div className="grid grid-cols-3 gap-1.5">
          {networkStats.map((stat) => (
            <div key={stat.label} className="text-center p-1.5 rounded-lg bg-secondary/30 border border-glass-border">
              <p className="text-sm font-semibold text-foreground">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Staking CTA */}
      <div className="mt-auto">
        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground text-xs py-2" size="sm">
          Stake More ZEN
          <ChevronRight className="w-3 h-3 ml-auto" />
        </Button>
        <Button variant="ghost" size="sm" className="w-full text-[10px] text-muted-foreground mt-2">
          View Explorer
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  )
}
