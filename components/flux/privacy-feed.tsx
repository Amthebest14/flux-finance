"use client"

import { useState, useEffect } from "react"
import { Shield, Cpu, CheckCircle, Activity } from "lucide-react"

interface AttestationEvent {
  id: string
  type: "tee" | "zk" | "mpc"
  message: string
  timestamp: string
}

const attestationTypes = {
  tee: { icon: Cpu, color: "text-primary", label: "TEE" },
  zk: { icon: Shield, color: "text-accent", label: "ZK" },
  mpc: { icon: CheckCircle, color: "text-chart-3", label: "MPC" },
}

const generateAttestation = (): AttestationEvent => {
  const types: ("tee" | "zk" | "mpc")[] = ["tee", "zk", "mpc"]
  const messages = {
    tee: [
      "Vela enclave attestation verified",
      "TEE signature validated",
      "Secure enclave checkpoint complete",
      "Hardware attestation confirmed",
    ],
    zk: [
      "Zero-knowledge proof generated",
      "ZK circuit verification passed",
      "Proof submission validated",
      "Privacy proof confirmed",
    ],
    mpc: [
      "Multi-party computation complete",
      "Threshold signature verified",
      "Key share rotation successful",
      "MPC ceremony validated",
    ],
  }

  const type = types[Math.floor(Math.random() * types.length)]
  const messageList = messages[type]
  const message = messageList[Math.floor(Math.random() * messageList.length)]

  return {
    id: Math.random().toString(36).slice(2),
    type,
    message,
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  }
}

export function PrivacyFeed() {
  const [events, setEvents] = useState<AttestationEvent[]>([])

  useEffect(() => {
    // Initialize with some events
    const initial = Array.from({ length: 4 }, () => generateAttestation())
    setEvents(initial)

    // Add new events periodically
    const interval = setInterval(() => {
      setEvents((prev) => {
        const newEvent = generateAttestation()
        return [newEvent, ...prev.slice(0, 3)]
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-card rounded-xl p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Live Security Log</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-chart-3 animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-2">
        {events.map((event, index) => {
          const config = attestationTypes[event.type]
          const Icon = config.icon
          return (
            <div
              key={event.id}
              className={`flex items-start gap-3 p-2.5 rounded-lg bg-secondary/30 border border-glass-border transition-all duration-500 ${
                index === 0 ? "animate-pulse" : ""
              }`}
              style={{ opacity: 1 - index * 0.15 }}
            >
              <div className={`mt-0.5 ${config.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{event.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] ${config.color}`}>{config.label}</span>
                  <span className="text-[10px] text-muted-foreground">{event.timestamp}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
