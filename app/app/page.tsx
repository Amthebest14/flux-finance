"use client"

import { useState } from "react"
import { UnifiedDashboardHeader } from "@/components/flux/unified-dashboard-header"
import { PortfolioCardSimple } from "@/components/flux/portfolio-card-simple"
import { UserActivePositions } from "@/components/flux/user-active-positions"
import { PersonalZenStats } from "@/components/flux/personal-zen-stats"
import { DepositModal, type VaultData } from "@/components/flux/deposit-modal"
import { PrivacyFeed } from "@/components/flux/privacy-feed"
import { NetworkOverviewAccordion } from "@/components/flux/network-overview-accordion"

export default function DashboardPage() {
  const [selectedVault, setSelectedVault] = useState<VaultData | null>(null)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)

  const handleManagePosition = (vault: VaultData) => {
    setSelectedVault(vault)
    setIsDepositModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsDepositModalOpen(false)
    setSelectedVault(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Single Unified Header */}
      <UnifiedDashboardHeader />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[250px] md:w-[400px] h-[250px] md:h-[400px] orb-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-32 w-[200px] md:w-[350px] h-[200px] md:h-[350px] orb-accent rounded-full blur-3xl opacity-20" />
      </div>

      {/* Main Layout */}
      <div className="relative pt-16 md:pt-20 pb-6 md:pb-8 px-3 md:px-4 lg:px-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Your Portfolio</h1>
            <p className="text-sm text-muted-foreground mt-1">Track your shielded positions and earnings</p>
          </div>

          {/* Bento Grid Layout */}
          <div className="flex gap-4 md:gap-6">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Section A: Portfolio Summary - Large Card */}
                <div className="lg:col-span-2">
                  <PortfolioCardSimple />
                </div>

                {/* Section B: Personal ZEN Stats - Top Right */}
                <div className="lg:row-span-2">
                  <PersonalZenStats />
                </div>

                {/* Section C: Active Positions - Center Area */}
                <div className="lg:col-span-2">
                  <UserActivePositions onManagePosition={handleManagePosition} />
                </div>

                {/* Desktop: Privacy Feed */}
                <div className="hidden lg:block">
                  <PrivacyFeed />
                </div>

                {/* Mobile Only: Network Overview Accordion */}
                <div className="lg:hidden">
                  <NetworkOverviewAccordion />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal (for managing existing positions) */}
      <DepositModal
        vault={selectedVault}
        open={isDepositModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
