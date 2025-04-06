"use client";

import { useEffect, useState } from "react"

import HeroSection from "./hero-section"
import FeaturesSection from "./feature-section"
import CodeEditorShowcase from "./code-editor-showcase"
import ProblemListSection from "./problem-list"
import PricingSection from "./pricing-section"

const LandingPage = () => {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="relative overflow-hidden container">
   
      <HeroSection />
      <FeaturesSection />
      <CodeEditorShowcase />
      <ProblemListSection />
      <PricingSection />
   
    </div>
  )
}

export default LandingPage