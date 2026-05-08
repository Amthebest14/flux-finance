"use client"

import { useState, useEffect } from "react"
import { Shield, ShieldCheck, Bell, Settings, ChevronDown, Cpu } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [teeStatus, setTeeStatus] = useState<"active" | "syncing" | "offline">("syncing")
  const [privacyLevel, setPrivacyLevel] = useState(92)

  useEffect(() => {
    // Simulate TEE status changes
    const timer = setTimeout(() => {
      setTeeStatus("active")
      setPrivacyLevel(98)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const statusConfig = {
    active: {
      icon: ShieldCheck,
      label: "Vela TEE Active",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
    },
    syncing: {
      icon: Shield,
      label: "Syncing Enclave",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
    },
    offline: {
      icon: Shield,
      label: "TEE Offline",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
    },
  }

  const status = statusConfig[teeStatus]
  const StatusIcon = status.icon

  return (
    <header className="glass-card rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">F</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Cpu className="w-2.5 h-2.5 text-accent-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Flux Finance</h1>
              <p className="text-xs text-muted-foreground">Horizen Base L3</p>
            </div>
          </div>

          {/* Privacy Level Indicator */}
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${status.bgColor} border ${status.borderColor}`}>
            <StatusIcon className={`w-5 h-5 ${status.color} ${teeStatus === "syncing" ? "animate-pulse" : ""}`} />
            <div>
              <p className="text-xs text-muted-foreground">System Privacy Level</p>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${status.color}`}>{status.label}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-sm font-mono text-foreground">{privacyLevel}%</span>
              </div>
            </div>
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden ml-2">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  teeStatus === "active" ? "bg-accent" : teeStatus === "syncing" ? "bg-yellow-400" : "bg-destructive"
                }`}
                style={{ width: `${privacyLevel}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Network Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass border-glass-border">
                <div className="w-2 h-2 rounded-full bg-accent mr-2" />
                Horizen Base
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuItem>
                <div className="w-2 h-2 rounded-full bg-accent mr-2" />
                Horizen Base (L3)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2" />
                Horizen EON (Testnet)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* Wallet */}
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
