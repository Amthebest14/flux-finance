"use client"

import { Shield, ArrowUpRight, ArrowDownLeft, Clock, ExternalLink, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

interface Transaction {
  id: string
  type: "deposit" | "withdraw" | "yield"
  vault: string
  amount: string
  asset: string
  hash: string
  timestamp: string
  status: "confirmed" | "pending" | "shielded"
  privacyTech: "ZK" | "TEE" | "MPC"
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    vault: "ZEN Yield Optimizer",
    amount: "+5,000.00",
    asset: "ZEN",
    hash: "0x7f3e8a2b...4c9d1e0f",
    timestamp: "2024-01-15 14:32:18",
    status: "confirmed",
    privacyTech: "TEE",
  },
  {
    id: "2",
    type: "yield",
    vault: "Stable Shield Pool",
    amount: "+234.56",
    asset: "USDC",
    hash: "0x2b4c6d8e...1a3f5g7h",
    timestamp: "2024-01-15 12:00:00",
    status: "shielded",
    privacyTech: "ZK",
  },
  {
    id: "3",
    type: "deposit",
    vault: "Stable Shield Pool",
    amount: "+50,000.00",
    asset: "USDC",
    hash: "0x9i8j7k6l...5m4n3o2p",
    timestamp: "2024-01-14 09:45:33",
    status: "confirmed",
    privacyTech: "ZK",
  },
  {
    id: "4",
    type: "withdraw",
    vault: "DeFi Alpha Vault",
    amount: "-2,500.00",
    asset: "ZEN",
    hash: "0x1q2w3e4r...5t6y7u8i",
    timestamp: "2024-01-13 18:22:11",
    status: "confirmed",
    privacyTech: "MPC",
  },
  {
    id: "5",
    type: "yield",
    vault: "ZEN Yield Optimizer",
    amount: "+127.83",
    asset: "ZEN",
    hash: "0x9o8p7a6s...5d4f3g2h",
    timestamp: "2024-01-13 12:00:00",
    status: "shielded",
    privacyTech: "TEE",
  },
  {
    id: "6",
    type: "deposit",
    vault: "Institutional Grade",
    amount: "+100,000.00",
    asset: "USDC",
    hash: "0x3j4k5l6z...7x8c9v0b",
    timestamp: "2024-01-12 08:15:44",
    status: "pending",
    privacyTech: "TEE",
  },
]

const typeConfig = {
  deposit: {
    icon: ArrowDownLeft,
    label: "Deposit",
    color: "text-accent",
  },
  withdraw: {
    icon: ArrowUpRight,
    label: "Withdraw",
    color: "text-destructive",
  },
  yield: {
    icon: Shield,
    label: "Yield",
    color: "text-primary",
  },
}

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    color: "bg-accent/10 text-accent border-accent/30",
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30",
  },
  shielded: {
    label: "Shielded",
    color: "bg-primary/10 text-primary border-primary/30",
  },
}

export function TransactionLedger() {
  const [showAmounts, setShowAmounts] = useState(false)

  return (
    <Card className="glass-card rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Shielded Operations
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAmounts(!showAmounts)}
              className="text-xs"
            >
              {showAmounts ? (
                <>
                  <EyeOff className="w-3 h-3 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 mr-1" />
                  Reveal
                </>
              )}
            </Button>
            <Badge variant="outline" className="border-glass-border text-muted-foreground">
              {transactions.length} Operations
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-glass-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-glass-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Vault</TableHead>
                <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                <TableHead className="text-muted-foreground">Hash</TableHead>
                <TableHead className="text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => {
                const TypeIcon = typeConfig[tx.type].icon
                return (
                  <TableRow key={tx.id} className="border-glass-border hover:bg-secondary/20">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg bg-secondary/50`}>
                          <TypeIcon className={`w-3.5 h-3.5 ${typeConfig[tx.type].color}`} />
                        </div>
                        <span className="text-sm font-medium">{typeConfig[tx.type].label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{tx.vault}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`text-sm font-mono font-medium transition-all ${
                        !showAmounts && tx.status === "shielded" ? "blur-sm" : ""
                      } ${tx.type === "withdraw" ? "text-destructive" : "text-accent"}`}>
                        {tx.amount} {tx.asset}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                          {tx.hash}
                        </code>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground font-mono">{tx.timestamp}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${statusConfig[tx.status].color}`}>
                        {tx.status === "shielded" && <Shield className="w-3 h-3 mr-1" />}
                        {statusConfig[tx.status].label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
