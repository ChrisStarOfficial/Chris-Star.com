"use client"

import { useState } from 'react'
import Link from 'next/link'

interface OptionCardProps {
    title: string
    description: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
    className?: string
}

export function OptionCard({
    title,
    description,
    href,
    onClick,
    icon,
    className = ""
}: OptionCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const cardContent = (
        <div
          className={`
            relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-gray-600/3
            p-6 cursor-pointer transition-all duration-300 group
            hover:border-cyan-400/60 hover:bg-gray-700/60
            ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
            ${className}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
            {/* Glow Effect */}
            <div className={`
                absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20
                opacity-0 transition-opacity duration-300
                ${isHovered ? 'opacity-100' : 'opacity-0'}
            `} />

            {/* Main Content */}
            <div className='relative z-10 flex flex-col items-center text-center space-y-4'>
                {/* Icon */}
                {icon &&(
                    <div className='text-cyan-400/80 group-hover:text-cyan-300 transition-colors duration-300'>
                        {icon}
                    </div>
                )}

                {/* Title */}
                <h3 className='text-white font-sans text-lg font-bold tracking-wide'>
                    {title}
                </h3>

                {/* Description - appears on hover */}
                <div className={`
                    text-grey-300-90 text-sm font-light transition-all duration-300 overflow-hidden
                    ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    {description}
                </div>
            </div>
        </div>
    )

    // Wrap with link if href provided, otherwise use button
    if (href) {
        return (
            <Link href={href} className='block no-underline'>
                {cardContent}
            </Link>
        )
    }

    return cardContent
}