"use client"

import { useState, useEffect } from "react"
import { OptionsGrid } from '@/components/ui/OptionsGrid'
import { OptionCard } from '@/components/ui/OptionCard'
import { Footer } from "@/components/layout/footer/Footer"
import { CommunityHero } from "@/app/community/components/CommunityHero"
import { CommunityNavigation } from "@/app/community/components/CommunityNavigation"
import { CommunityFeatures } from "@/app/community/components/CommunityFeatures"
import { CommunityBenefits } from "@/app/community/components/CommunityBenefits"
import { CommunityTestimonials } from "@/app/community/components/CommunityTestimonials"
import { CommunityCTA } from "@/app/community/components/CommunityCTA"
import { StarseedCentralIcon } from "@/app/community/components/StarseedCentralIcon"
import { StarseedAcademyIcon } from "@/app/community/components/StarseedAcademyIcon"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("features")
  const [isLoaded, setIsLoaded] = useState(false)

  const communityOptions = [
    {
      id: 'starseed-central',
      title: 'Starseed Central',
      description: 'Meet with other starseeds',
      href: '/starseedcentral',
      icon: <StarseedCentralIcon />
    },
    {
      id: 'starseed-academy',
      title: 'Starseed Academy',
      description: 'Become a starseed leader',
      href: '/starseedacademy', 
      icon: <StarseedAcademyIcon />
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Community Options Section */}
      <OptionsGrid title="Community Platforms">
        {communityOptions.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            href={option.href}
            icon={option.icon}
          />
        ))}
      </OptionsGrid>

      {/* Hero Section */}
      <CommunityHero />

      {/* Navigation Tabs */}
      <CommunityNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Content Sections */}
      {activeTab === "features" && <CommunityFeatures />}
      {activeTab === "benefits" && <CommunityBenefits />}
      {activeTab === "testimonials" && <CommunityTestimonials />}

      {/* CTA Section */}
      <CommunityCTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}