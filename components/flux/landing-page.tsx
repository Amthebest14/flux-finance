"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Lock, Zap, ChevronRight, ArrowRight, Cpu, Activity, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const valueProps = [
    {
      icon: Shield,
      title: "Shielded Deposits",
      description: "Your assets are encrypted at rest and in transit. Only you control access to your financial data through advanced cryptographic proofs.",
      gradient: "from-primary to-cyan-400",
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Strategies",
      description: "Execute complex yield strategies without exposing your positions. Our ZK circuits ensure complete transactional privacy.",
      gradient: "from-accent to-pink-400",
    },
    {
      icon: Zap,
      title: "ZEN-Powered Utility",
      description: "Stake ZEN to secure your yield and earn additional rewards. The more you stake, the greater your privacy guarantees.",
      gradient: "from-primary to-accent",
    },
  ]

  const stats = [
    { value: "$847M+", label: "Total Value Locked" },
    { value: "12.4%", label: "Average APY" },
    { value: "100%", label: "Privacy Guaranteed" },
    { value: "24/7", label: "TEE Uptime" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] orb-glow rounded-full blur-3xl transition-opacity duration-1000 ${mounted ? "opacity-40" : "opacity-0"} animate-float`} />
        <div className={`absolute top-1/2 -right-32 w-[250px] md:w-[400px] h-[250px] md:h-[400px] orb-accent rounded-full blur-3xl transition-opacity duration-1000 delay-300 ${mounted ? "opacity-30" : "opacity-0"} animate-float-delayed`} />
        <div className={`absolute -bottom-32 left-1/3 w-[350px] md:w-[600px] h-[350px] md:h-[600px] orb-glow rounded-full blur-3xl transition-opacity duration-1000 delay-500 ${mounted ? "opacity-20" : "opacity-0"} animate-float`} />
        
        {/* Data Stream Lines - hidden on mobile for performance */}
        <div className="absolute inset-0 hidden md:block">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1440 900" fill="none">
            <path d="M0 450 Q 360 300 720 450 T 1440 450" stroke="url(#gradient1)" strokeWidth="1" fill="none" className="animate-data-stream" />
            <path d="M0 500 Q 360 650 720 500 T 1440 500" stroke="url(#gradient2)" strokeWidth="1" fill="none" className="animate-data-stream" style={{ animationDelay: "2s" }} />
            <path d="M0 400 Q 360 250 720 400 T 1440 400" stroke="url(#gradient1)" strokeWidth="1" fill="none" className="animate-data-stream" style={{ animationDelay: "4s" }} />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.75 0.18 195)" />
                <stop offset="100%" stopColor="oklch(0.70 0.16 290)" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.70 0.16 290)" />
                <stop offset="100%" stopColor="oklch(0.75 0.18 195)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass mb-6 md:mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary animate-pulse" />
            <span className="text-xs md:text-sm text-muted-foreground">Powered by Horizen Base L3</span>
            <Cpu className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
          </div>

          {/* Headline - Reduced size on mobile */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 text-balance transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="text-foreground">The Privacy Layer for</span>
            <br />
            <span className="text-gradient-cyan">Institutional Yield</span>
          </h1>

          {/* Subheadline */}
          <p className={`text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 text-pretty px-2 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Secure your yield with Vela Confidential Compute. Enterprise-grade privacy 
            meets DeFi returns on the Horizen Base L3 network.
          </p>

          {/* CTA Buttons - Stacked vertically on mobile */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4 sm:px-0 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/app" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg glow-border">
                Start Earning
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto glass border-glass-border hover:bg-secondary/50 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg">
              View Docs
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`relative py-12 md:py-16 px-4 transition-all duration-700 delay-400 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:glow-border transition-all duration-300"
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-1 md:mb-2">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="relative py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance">
              Privacy-First Yield Generation
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-2">
              Built for institutions who demand both performance and confidentiality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon
              return (
                <div
                  key={prop.title}
                  className={`group relative glass-card rounded-xl md:rounded-2xl p-6 md:p-8 hover:glow-border transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  {/* Icon */}
                  <div className="relative mb-4 md:mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${prop.gradient} rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`} />
                    <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${prop.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">{prop.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">{prop.description}</p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="relative py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-center glow-accent">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Vela Confidential Compute</h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 text-pretty">
              Every transaction is processed within hardware-secured enclaves. Your strategies, 
              positions, and balances remain encrypted and invisible to everyone except you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse" />
                <span>TEE Attestation</span>
              </div>
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                <span>ZK Proofs</span>
              </div>
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-chart-3 animate-pulse" />
                <span>Audited Contracts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
