"use client"

import { AdvancedScrollSection } from "@/components/archive/advanced-scroll-section"

interface ServiceCardProps {
  service: {
    title: string
    desc: string
    icon: string
  }
  index: number
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <AdvancedScrollSection direction="up" delay={index * 200} threshold={0.4}>
      <div className="group h-full" data-magnetic>
        {/* Your service card JSX */}
      </div>
    </AdvancedScrollSection>
  )
}