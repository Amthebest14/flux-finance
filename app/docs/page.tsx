"use client"

import { UnifiedDashboardHeader } from "@/components/flux/unified-dashboard-header"
import { Book, Shield, Cpu, Zap, Code, FileText, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const docSections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of Flux Finance and how to make your first deposit.",
    articles: [
      "Introduction to Flux Finance",
      "Connecting Your Wallet",
      "Making Your First Deposit",
      "Understanding Yield Strategies",
    ],
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Deep dive into the privacy technologies that protect your assets.",
    articles: [
      "Zero-Knowledge Proofs Explained",
      "TEE Confidential Computing",
      "MPC Key Management",
      "Security Audit Reports",
    ],
  },
  {
    icon: Cpu,
    title: "Horizen Vela Integration",
    description: "Technical documentation on Vela TEE integration.",
    articles: [
      "Vela Architecture Overview",
      "Attestation Verification",
      "Enclave Deployment",
      "API Reference",
    ],
  },
  {
    icon: Zap,
    title: "ZEN Tokenomics",
    description: "Understanding ZEN utility within the Flux ecosystem.",
    articles: [
      "ZEN Staking Mechanics",
      "Reward Distribution",
      "Governance Voting Power",
      "Protocol Fee Structure",
    ],
  },
  {
    icon: Code,
    title: "Developer Guides",
    description: "Build on top of Flux Finance with our developer resources.",
    articles: [
      "SDK Installation",
      "Smart Contract Interfaces",
      "Webhook Integration",
      "GraphQL API",
    ],
  },
  {
    icon: FileText,
    title: "Legal & Compliance",
    description: "Regulatory information and compliance documentation.",
    articles: [
      "Terms of Service",
      "Privacy Policy",
      "Risk Disclosures",
      "Jurisdictional Restrictions",
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <UnifiedDashboardHeader />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] orb-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] orb-accent rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative pt-24 pb-12 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to know about Flux Finance. From getting started 
              guides to advanced technical documentation.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="glass-card rounded-xl p-1">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-4 py-3 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Doc Sections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section) => {
              const Icon = section.icon
              return (
                <div
                  key={section.title}
                  className="glass-card rounded-2xl p-6 hover:glow-border transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.articles.map((article) => (
                      <li key={article}>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 -ml-3 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-3">Need Help?</h3>
              <p className="text-muted-foreground mb-6">
                {"Can't find what you're looking for? Our support team is here to help."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 text-primary-foreground">
                  Contact Support
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="glass border-glass-border hover:bg-secondary/50">
                  Join Discord
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
