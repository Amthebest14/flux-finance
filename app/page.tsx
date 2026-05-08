"use client"

import { Navbar } from "@/components/flux/navbar"
import { LandingPage } from "@/components/flux/landing-page"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LandingPage />
    </div>
  )
}
