"use client"

import { useState } from "react"
import { Eye, EyeOff, Shield, TrendingUp, TrendingDown, Fingerprint } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function PortfolioCard() {
  const [isShielded, setIsShielded] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  const portfolioData = {
    totalValue: "$847,293.42",
    change24h: "+12.4%",
    changePositive: true,
    zenBalance: "12,847.32 ZEN",
    stableBalance: "$234,102.00",
    yieldEarned: "$23,847.12",
  }

  const handleVerifyIdentity = () => {
    setIsVerifying(true)
    // Simulate biometric verification
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

  return (
    <Card className="glass-card rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Portfolio Overview
          </CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {isShielded ? "Shielded Mode" : "Public Mode"}
            </span>
            <Switch
              checked={isShielded}
              onCheckedChange={handleToggleShield}
              className="data-[state=checked]:bg-primary"
            />
            {isShielded ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Value */}
        <div className="relative">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
            <div className="flex items-baseline gap-3">
              <p className={`text-4xl font-bold tracking-tight transition-all duration-300 ${
                isShielded && !isRevealed ? "blur-lg select-none" : ""
              }`}>
                {portfolioData.totalValue}
              </p>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                portfolioData.changePositive ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
              }`}>
                {portfolioData.changePositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-sm font-medium">{portfolioData.change24h}</span>
              </div>
            </div>
          </div>

          {/* Verify Identity Overlay */}
          {isShielded && !isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm rounded-lg">
              <Button
                onClick={handleVerifyIdentity}
                disabled={isVerifying}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Verify Identity
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Balance Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg bg-secondary/50 border border-glass-border transition-all duration-300 ${
            isShielded && !isRevealed ? "blur-md" : ""
          }`}>
            <p className="text-xs text-muted-foreground mb-1">ZEN Balance</p>
            <p className="text-lg font-semibold text-foreground">{portfolioData.zenBalance}</p>
          </div>
          <div className={`p-4 rounded-lg bg-secondary/50 border border-glass-border transition-all duration-300 ${
            isShielded && !isRevealed ? "blur-md" : ""
          }`}>
            <p className="text-xs text-muted-foreground mb-1">Stablecoins</p>
            <p className="text-lg font-semibold text-foreground">{portfolioData.stableBalance}</p>
          </div>
          <div className={`p-4 rounded-lg bg-secondary/50 border border-glass-border transition-all duration-300 ${
            isShielded && !isRevealed ? "blur-md" : ""
          }`}>
            <p className="text-xs text-muted-foreground mb-1">Yield Earned</p>
            <p className="text-lg font-semibold text-accent">{portfolioData.yieldEarned}</p>
          </div>
        </div>

        {/* Privacy Notice */}
        {isShielded && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted-foreground">
              Your portfolio data is encrypted and secured by Horizen Vela TEE. Only you can reveal your balances.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
