"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, FileText, Vote, Home, Rocket, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/vaults", label: "Vaults", icon: Zap },
  { href: "/governance", label: "Governance", icon: Vote },
  { href: "/docs", label: "Docs", icon: FileText },
]

interface NavbarProps {
  showLaunchApp?: boolean
}

export function Navbar({ showLaunchApp = true }: NavbarProps) {
  const pathname = usePathname()
  const isApp = pathname === "/app"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <nav className="mt-3 md:mt-4 glass rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold text-foreground tracking-tight">Flux</span>
                <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest -mt-1">Finance</span>
              </div>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
            </div>

            {/* Right Section: Launch App + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Launch App Button */}
              {showLaunchApp && (
                <Link href={isApp ? "/" : "/app"}>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground font-semibold px-4 md:px-6 text-xs md:text-sm glow-border"
                  >
                    <Rocket className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                    <span className="hidden sm:inline">{isApp ? "Back to Home" : "Launch App"}</span>
                    <span className="sm:hidden">Launch</span>
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden h-8 w-8"
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

                  <nav className="flex flex-col p-4 gap-1">
                    {navLinks.map((link) => {
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
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
