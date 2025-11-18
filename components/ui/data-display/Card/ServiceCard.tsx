"use client"

import { ScrollSection } from "@/components/layout/ScrollSection"

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
    <ScrollSection direction="up" delay={index * 200} threshold={0.4}>
      <div className="group h-full" data-magnetic>
        {/* Your service card JSX */}
      </div>
    </ScrollSection>
  )
}