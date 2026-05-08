"use client"

import { UnifiedDashboardHeader } from "@/components/flux/unified-dashboard-header"
import { Book, Shield, Cpu, Zap, Code, FileText, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const docSections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of Flux Finance, from connecting your wallet to the Horizen Base L3 to making your first confidential deposit.",
    articles: [
      { title: "Introduction to Flux Finance", content: "Flux is a privacy-first yield protocol on Horizen Base L3, designed to hide institutional strategies from public view." },
      { title: "Connecting Your Wallet", content: "Use MetaMask or Rabby to connect to the Horizen Testnet (Chain ID: 2651420) to access the Vela TEE layer." },
      { title: "Making Your First Deposit", content: "Funds are encrypted in your browser and sent to a shielded vault where only you hold the viewing key." },
      { title: "Understanding Yield Strategies", content: "Flux utilizes delta-neutral and auto-compounding strategies executed inside secure enclaves." },
    ],
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Deep dive into our use of ZK-proofs for selective disclosure and TEE-secured off-chain computation",
    articles: [
      { title: "Zero-Knowledge Proofs Explained", content: "We use ZK-proofs to verify your ownership of assets without revealing your wallet's history or total balance." },
      { title: "TEE Confidential Computing", content: "Execution occurs in AWS Nitro Enclaves, ensuring data is never visible to the host machine or the public chain." },
      { title: "MPC Key Management", content: "Multi-Party Computation ensures that no single entity holds the full key to the protocol's liquidity." },
      { title: "Security Audit Reports", content: "Our Vela-integrated smart contracts undergo continuous automated auditing via formal verification." },
    ],
  },
  {
    icon: Cpu,
    title: "Horizen Vela Integration",
    description: "Technical overview of how Flux uses AWS Nitro Enclaves (TEEs) and the WASM Executor to hide your yield strategies while maintaining auditability",
    articles: [
      { title: "Vela Architecture Overview", content: "A deep dive into the Horizen 2.0 sidechain architecture and the secure processor manager." },
      { title: "Attestation Verification", content: "How the blockchain verifies that code is running inside a genuine, untampered TEE." },
      { title: "Enclave Deployment", content: "Documentation on the WASM-based executor used for confidential protocol logic." },
      { title: "API Reference", content: "Standardized endpoints for querying the TEE for your private portfolio state." },
    ],
  },
  {
    icon: Zap,
    title: "ZEN Tokenomics",
    description: "Stake ZEN to earn a share of protocol fees and secure the network. Flux Finance uses a 'compliant privacy' model to ensure institutional-grade safety",
    articles: [
      { title: "ZEN Staking Mechanics", content: "Lock ZEN to secure the protocol and receive a portion of all vault performance fees." },
      { title: "Reward Distribution", content: "Yield is credited to your shielded balance and can be claimed as native ZEN or auto-compounded." },
      { title: "Governance Voting Power", content: "$gZEN$ holders vote on which new strategies are whitelisted for the TEE enclaves." },
      { title: "Protocol Fee Structure", content: "A transparent 2% management fee and 10% performance fee, all settled on-chain." },
    ],
  },
  {
    icon: Code,
    title: "Developer Guides",
    description: "Build on top of Flux Finance with our developer resources.",
    articles: [
      { title: "SDK Installation", content: "Install the `vela-common-ts` library to build your own privacy-preserving frontend tools." },
      { title: "Smart Contract Interfaces", content: "Standardized Solidity interfaces for interacting with Flux vaults from other dApps." },
      { title: "Webhook Integration", content: "Set up real-time alerts for when your private vault reaches specific yield milestones." },
      { title: "GraphQL API", content: "Efficiently index public vault data (TVL, APY) while maintaining individual user privacy." },
    ],
  },
  {
    icon: FileText,
    title: "Legal & Compliance",
    description: "Regulatory information and compliance documentation.",
    articles: [
      { title: "Terms of Service", content: "Standard protocol terms focused on the use of experimental confidential compute technologies." },
      { title: "Privacy Policy", content: "We do not track IPs or wallet data; all metadata is stripped before reaching the TEE." },
      { title: "Risk Disclosures", content: "Understanding smart contract risk and the trust assumptions of the Vela TEE layer." },
      { title: "Jurisdictional Restrictions", content: "Flux is not available in jurisdictions where decentralized finance is restricted." },
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
                  <Accordion type="single" collapsible className="w-full">
                    {section.articles.map((article, index) => (
                      <AccordionItem key={article.title} value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="text-sm text-muted-foreground hover:text-primary transition-colors py-2 hover:no-underline text-left">
                          {article.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">
                          {article.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
