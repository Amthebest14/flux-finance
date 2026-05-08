"use client"

import { UnifiedDashboardHeader } from "@/components/flux/unified-dashboard-header"
import { Vote, Users, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const proposals = [
  {
    id: "FIP-012",
    title: "Increase ZEN Staking Rewards by 15%",
    description: "Proposal to increase the base staking rewards for ZEN token holders to incentivize long-term participation.",
    status: "active",
    votesFor: 847293,
    votesAgainst: 234102,
    endDate: "3 days",
    author: "0x7a3d...8f2e",
  },
  {
    id: "FIP-011",
    title: "Add New TEE Provider Integration",
    description: "Integrate additional TEE providers to enhance network decentralization and security.",
    status: "active",
    votesFor: 623847,
    votesAgainst: 156293,
    endDate: "5 days",
    author: "0x2b4c...9a1f",
  },
  {
    id: "FIP-010",
    title: "Treasury Diversification Strategy",
    description: "Allocate 10% of protocol treasury to stable assets for operational sustainability.",
    status: "passed",
    votesFor: 923847,
    votesAgainst: 87293,
    endDate: "Ended",
    author: "0x5e8f...3c7d",
  },
  {
    id: "FIP-009",
    title: "Reduce Withdrawal Fees",
    description: "Lower the withdrawal fee from 0.3% to 0.15% to improve user experience.",
    status: "rejected",
    votesFor: 234102,
    votesAgainst: 567893,
    endDate: "Ended",
    author: "0x9d2a...6b4e",
  },
]

const statusConfig = {
  active: { color: "bg-primary/10 text-primary border-primary/30", label: "Active" },
  passed: { color: "bg-chart-3/10 text-chart-3 border-chart-3/30", label: "Passed" },
  rejected: { color: "bg-destructive/10 text-destructive border-destructive/30", label: "Rejected" },
}

export default function GovernancePage() {
  const stats = [
    { icon: Vote, label: "Active Proposals", value: "2" },
    { icon: Users, label: "Total Voters", value: "8,294" },
    { icon: TrendingUp, label: "Participation Rate", value: "67.3%" },
    { icon: CheckCircle, label: "Proposals Passed", value: "10" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <UnifiedDashboardHeader />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] orb-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] orb-accent rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative pt-24 pb-12 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Governance</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Shape the future of Flux Finance. Vote on proposals and participate in 
              decentralized decision-making.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Proposals */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Proposals</h2>
            {proposals.map((proposal) => {
              const totalVotes = proposal.votesFor + proposal.votesAgainst
              const forPercentage = (proposal.votesFor / totalVotes) * 100
              const status = statusConfig[proposal.status as keyof typeof statusConfig]

              return (
                <div
                  key={proposal.id}
                  className="glass-card rounded-2xl p-6 hover:glow-border transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">{proposal.id}</span>
                        <Badge variant="outline" className={`text-[10px] ${status.color}`}>
                          {status.label}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">{proposal.description}</p>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-chart-3" />
                        <span className="text-muted-foreground">For</span>
                        <span className="font-semibold text-foreground">
                          {proposal.votesFor.toLocaleString()} ZEN
                        </span>
                      </div>
                      <span className="text-chart-3 font-semibold">{forPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={forPercentage} className="h-2 bg-muted" />
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-muted-foreground">Against</span>
                        <span className="font-semibold text-foreground">
                          {proposal.votesAgainst.toLocaleString()} ZEN
                        </span>
                      </div>
                      <span className="text-destructive font-semibold">{(100 - forPercentage).toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {proposal.endDate}
                      </div>
                      <div>
                        by <span className="font-mono">{proposal.author}</span>
                      </div>
                    </div>
                    {proposal.status === "active" && (
                      <Button size="sm" className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground">
                        Cast Vote
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
