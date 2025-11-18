"use client"

import { OptionsGrid } from '@/components/ui/OptionsGrid'
import { OptionCard } from '@/components/ui/OptionCard'
import { Header } from "@/components/layout/header/Header"
import { Footer } from "@/components/layout/footer/Footer"

function VaultIcon() {
  return (
    <svg className="w-full h-full text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

function WikiIcon() {
  return (
    <svg className="w-full h-full text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function CompendiaIcon() {
  return (
    <svg className="w-full h-full text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  )
}

export default function ArchivesPage() {
  const options = [
    {
      id: 'vault',
      title: 'The Vault',
      description: 'YouTube video transcripts',
      href: '/archives/vault',
      icon: <VaultIcon />
    },
    {
      id: 'wiki',
      title: 'Wiki',
      description: 'Stellar knowledge wiki',
      href: '/archives/wiki',
      icon: <WikiIcon />
    },
    {
      id: 'compendia',
      title: 'Project Compendia',
      description: "Stellar knowledge transcripts",
      href: '/archives/compendia',
      icon: <CompendiaIcon />
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <OptionsGrid title="The Archives">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            href={option.href}
            icon={option.icon}
          />
        ))}
      </OptionsGrid>
      
      <Footer />
    </div>
  )
}