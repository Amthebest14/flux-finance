"use client"

import { useState } from "react"
import { UnifiedDashboardHeader } from "@/components/flux/unified-dashboard-header"
import { VaultMarketplace } from "@/components/flux/vault-marketplace"
import { DepositModal, type VaultData } from "@/components/flux/deposit-modal"
import { Vault, Shield, TrendingUp, Users } from "lucide-react"

export default function VaultsMarketplacePage() {
  const [selectedVault, setSelectedVault] = useState<VaultData | null>(null)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)

  const handleDeposit = (vault: VaultData) => {
    setSelectedVault(vault)
    setIsDepositModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsDepositModalOpen(false)
    setSelectedVault(null)
  }

  const globalStats = [
    { icon: Vault, label: "Total Vaults", value: "6" },
    { icon: TrendingUp, label: "Avg APY", value: "17.1%" },
    { icon: Shield, label: "Global TVL", value: "$589.5M" },
    { icon: Users, label: "Active Users", value: "12,847" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <UnifiedDashboardHeader />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] orb-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] orb-accent rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative pt-20 md:pt-24 pb-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Vault Marketplace</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Browse our curated selection of privacy-preserving yield strategies. 
              All vaults are secured by Horizen Vela TEE technology.
            </p>
          </div>

          {/* Global Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {globalStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Vault Marketplace Grid with Filters */}
          <VaultMarketplace onDeposit={handleDeposit} />
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        vault={selectedVault}
        open={isDepositModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
