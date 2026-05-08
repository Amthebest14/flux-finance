"use client"

import { useState } from "react"
import { Eye, EyeOff, Shield, TrendingUp, Fingerprint, Wallet, Coins, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAccount, useBalance } from "wagmi"
import { useEffect } from "react"

export function PortfolioCardSimple() {
  const [isShielded, setIsShielded] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [stables, setStables] = useState("$0.00")
  const [yieldEarned, setYieldEarned] = useState("$0.00")

  const { address } = useAccount()
  const { data: balanceData } = useBalance({
    address,
  })

  useEffect(() => {
    // Mock fetch for portfolio stats
    const fetchStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      setStables("$512,847.32")
      setYieldEarned("$100,344.10")
    }
    fetchStats()
  }, [])

  const portfolioData = {
    totalValue: "$847,293.42",
    change24h: "+12.4%",
    zen: balanceData ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}` : "0.00 ZEN",
    stables: stables,
    yield: yieldEarned,
  }

  const handleVerifyIdentity = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsRevealed(true)
    }, 1500)
  }

  const handleToggleShield = () => {
    setIsShielded(!isShielded)
    if (!isShielded) {
      setIsRevealed(false)
    }
  }

  const balances = [
    { label: "ZEN Holdings", value: portfolioData.zen, icon: Coins, color: "text-primary" },
    { label: "Stablecoins", value: portfolioData.stables, icon: Wallet, color: "text-accent" },
    { label: "Earned Yield", value: portfolioData.yield, icon: Sparkles, color: "text-chart-3" },
  ]

  return (
    <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <h3 className="text-xs md:text-sm font-semibold text-foreground">Total Shielded Value</h3>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="text-[9px] md:text-[10px] text-muted-foreground">
            {isShielded ? "Shielded" : "Public"}
          </span>
          <Switch
            checked={isShielded}
            onCheckedChange={handleToggleShield}
            className="data-[state=checked]:bg-primary scale-[0.65] md:scale-75"
          />
          {isShielded ? (
            <EyeOff className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />
          ) : (
            <Eye className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Main Value Display */}
      <div className="relative mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
          <p className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground transition-all duration-300 ${
            isShielded && !isRevealed ? "blur-xl select-none" : ""
          }`}>
            {portfolioData.totalValue}
          </p>
          <div className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-chart-3/10 text-chart-3 mb-0 md:mb-2 w-fit transition-all duration-300 ${
            isShielded && !isRevealed ? "blur-md" : ""
          }`}>
            <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="text-xs md:text-sm font-semibold">{portfolioData.change24h}</span>
          </div>
        </div>

        {/* Verify Identity Overlay */}
        {isShielded && !isRevealed && (
          <div className="absolute inset-0 flex items-center justify-start">
            <Button
              onClick={handleVerifyIdentity}
              disabled={isVerifying}
              size="sm"
              className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground text-xs md:text-sm"
            >
              {isVerifying ? (
                <>
                  <div className="w-3 h-3 md:w-3.5 md:h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-1.5 md:mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <Fingerprint className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5 md:mr-2" />
                  Verify Identity
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Balance Breakdown - Stacked on mobile, row on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-0">
        {balances.map((balance) => {
          const Icon = balance.icon
          return (
            <div
              key={balance.label}
              className={`flex items-center md:flex-col md:items-start gap-3 md:gap-1 p-3 md:p-4 rounded-xl bg-secondary/30 border border-glass-border transition-all duration-300 ${
                isShielded && !isRevealed ? "opacity-50" : ""
              }`}
            >
              <div className={`p-2 rounded-lg bg-secondary/50 ${balance.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 md:flex-none flex items-center justify-between md:block md:mt-2 w-full">
                <p className="text-[10px] md:text-xs text-muted-foreground">{balance.label}</p>
                <p className={`text-sm md:text-lg font-semibold text-foreground transition-all duration-300 ${
                  isShielded && !isRevealed ? "blur-md select-none" : ""
                }`}>
                  {balance.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Privacy Notice - Hidden on mobile to save space, shown inline on desktop */}
      {isShielded && (
        <div className="hidden md:flex items-center gap-2 mt-6 pt-4 border-t border-glass-border">
          <Shield className="w-3.5 h-3.5 text-accent" />
          <p className="text-[11px] text-muted-foreground">
            Protected by Horizen Vela TEE
          </p>
        </div>
      )}
    </div>
  )
}
