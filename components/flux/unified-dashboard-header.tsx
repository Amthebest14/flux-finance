"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { 
  Shield, 
  ShieldCheck, 
  Bell, 
  ChevronDown, 
  Cpu, 
  Zap,
  LayoutDashboard,
  Vote,
  FileText,
  LogOut,
  Menu,
  Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const dashboardNavLinks = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vaults", label: "Vaults", icon: Zap },
  { href: "/governance", label: "Governance", icon: Vote },
  { href: "/docs", label: "Docs", icon: FileText },
]

export function UnifiedDashboardHeader() {
  const pathname = usePathname()
  const { address, isConnected } = useAccount()
  const [teeStatus, setTeeStatus] = useState<"active" | "syncing" | "offline">("syncing")
  const [privacyLevel, setPrivacyLevel] = useState(92)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Format address helper
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return ""
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeeStatus("active")
      setPrivacyLevel(98)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const statusConfig = {
    active: {
      icon: ShieldCheck,
      label: "Vela Active",
      shortLabel: "Active",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
    },
    syncing: {
      icon: Shield,
      label: "Syncing",
      shortLabel: "Sync",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
    },
    offline: {
      icon: Shield,
      label: "Offline",
      shortLabel: "Off",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
    },
  }

  const status = statusConfig[teeStatus]
  const StatusIcon = status.icon

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="max-w-[1800px] mx-auto px-3 md:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left Section: Logo (Desktop includes nav) */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="w-4 h-4 md:w-4.5 md:h-4.5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-accent flex items-center justify-center border-2 border-background">
                  <Cpu className="w-1.5 h-1.5 md:w-2 md:h-2 text-accent-foreground" />
                </div>
              </div>
              <span className="hidden sm:block text-base font-bold text-foreground tracking-tight">Flux</span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-glass-border">
              {dashboardNavLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Center Section: Combined Wallet + Vela Status Pill (Mobile) / Vela Status (Desktop) */}
          <div className="flex items-center">
            {/* Mobile: Combined Pill */}
            <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-full glass border border-glass-border">
              {isConnected && (
                <div className="flex items-center gap-1.5 pr-2 border-r border-glass-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] font-medium text-foreground">{formatAddress(address)}</span>
                </div>
              )}
              <StatusIcon className={`w-3.5 h-3.5 ${status.color} ${teeStatus === "syncing" ? "animate-pulse" : ""}`} />
              <span className={`text-[10px] font-medium ${status.color}`}>{status.shortLabel}</span>
            </div>

            {/* Desktop: Full Vela Status */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg ${status.bgColor} border ${status.borderColor}`}>
              <StatusIcon className={`w-4 h-4 ${status.color} ${teeStatus === "syncing" ? "animate-pulse" : ""}`} />
              <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
              <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    teeStatus === "active" ? "bg-accent" : teeStatus === "syncing" ? "bg-yellow-400" : "bg-destructive"
                  }`}
                  style={{ width: `${privacyLevel}%` }}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground">{privacyLevel}%</span>
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Network Selector (Desktop only) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-xs h-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="hidden lg:inline">Horizen Base</span>
                  <ChevronDown className="w-3.5 h-3.5" />
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

            {/* Notifications (Desktop only) */}
            <Button variant="ghost" size="icon" className="relative h-8 w-8 hidden md:flex mr-2">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
            </Button>

            {/* Wallet (Desktop only) */}
            <div className="hidden md:flex">
              <ConnectButton chainStatus="icon" showBalance={false} accountStatus="address" />
            </div>

            {/* Exit App / Home Link (Desktop only) */}
            <Link href="/" className="hidden md:block">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Exit to Home">
                <LogOut className="w-4 h-4" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle - Hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden h-8 w-8"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] glass border-l border-glass-border p-0">
                <SheetHeader className="p-4 border-b border-glass-border">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-foreground">Flux Finance</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col p-4 gap-4">
                  {/* Mobile TEE Status */}
                  <div className={`flex items-center gap-2 px-3 py-3 rounded-xl ${status.bgColor} border ${status.borderColor}`}>
                    <StatusIcon className={`w-5 h-5 ${status.color} ${teeStatus === "syncing" ? "animate-pulse" : ""}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${status.color}`}>{status.label}</p>
                      <p className="text-xs text-muted-foreground">Privacy Level: {privacyLevel}%</p>
                    </div>
                  </div>

                  {/* Mobile Wallet */}
                  <div className="flex items-center justify-between px-3 py-3 rounded-xl bg-secondary/50 border border-glass-border">
                    <ConnectButton chainStatus="icon" showBalance={false} />
                  </div>

                  {/* Mobile Network */}
                  <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-secondary/50 border border-glass-border">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Horizen Base</p>
                      <p className="text-xs text-muted-foreground">L3 Network</p>
                    </div>
                  </div>
                  
                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-1 pt-2 border-t border-glass-border">
                    {dashboardNavLinks.map((link) => {
                      const Icon = link.icon
                      const isActive = pathname === link.href
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {link.label}
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Exit to Home */}
                  <div className="pt-2 border-t border-glass-border mt-auto">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                    >
                      <Home className="w-5 h-5" />
                      Back to Home
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
