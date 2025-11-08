"use client"

import { ReactNode } from 'react'

interface OptionsGridProps {
    children: ReactNode
    title?: string
    subtitle?: string
    className?: string
}

export function OptionsGrid({
    children,
    title,
    subtitle,
    className = ""
}: OptionsGridProps) {
    return (
        <section className={`py-12 px-6 ${className}`}>
            {/* Header */}
            {(title || subtitle) && (
                <div className='text-center mb-12'>
                    {title && (
                        <h2 className='text-3xl font-bold text-white font-sans mb-4 tracking-wide'>
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className='text-gray-400 text-lg font-light max-w-2xl mx-auto'>
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                {children}
            </div>
        </section>
    )
}