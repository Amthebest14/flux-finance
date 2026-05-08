"use client"

import { useState, useEffect } from "react"
import { Zap, Shield, TrendingUp, Lock, Cpu, Activity, Sparkles, ChevronDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface UtilityMetric {
  label: string
  value: number
  unit: string
  icon: typeof Zap
  trend: string
}

export function NetworkOverviewAccordion() {
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
    { label: "TPS", value: "4,200" },
  ]

  return (
    <div className="xl:hidden">
      <Accordion type="single" collapsible className="glass-card rounded-xl">
        <AccordionItem value="network" className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:no-underline group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Network Overview</p>
                <p className="text-[10px] text-muted-foreground">ZEN Utility &amp; Stats</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {/* Main ZEN Counter */}
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg" />
              <div className="relative p-4 rounded-xl bg-secondary/50 border border-glass-border">
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
            <div className="space-y-2 mb-4">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Breakdown</p>
              {metrics.map((metric) => {
                const MetricIcon = metric.icon
                return (
                  <div
                    key={metric.label}
                    className="p-3 rounded-lg bg-secondary/30 border border-glass-border"
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

            {/* Network Stats Grid */}
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Network Stats</p>
              <div className="grid grid-cols-4 gap-2">
                {networkStats.map((stat) => (
                  <div key={stat.label} className="text-center p-2 rounded-lg bg-secondary/30 border border-glass-border">
                    <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                    <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-glass-border">
              <Activity className="w-3 h-3 text-chart-3 animate-pulse" />
              <span className="text-[10px] text-muted-foreground">Live Network Data</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
