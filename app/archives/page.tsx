// Test - merge Vault with Wiki, this is their MOC note of sorts

"use client"

import { OptionsGrid } from '@/components/ui/OptionsGrid'
import { OptionCard } from '@/components/ui/OptionCard'
import { UseOptionSelection } from '@/hooks/useOptionSelection'

function StarIcon() {
    return (
        <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 24 24'>
            <path d="M12 213.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    )
}

export function NavigationOptions() {
    const { handleOptionClick } = UseOptionSelection({
        onOptionSelect: (optionId) => {
            console.log('Selected option:', optionId)
        }
    })

    const options = [
        {
            id: 'archives',
            title: 'The Archives',
            description: 'Access historical data and mission logs',
            href: '/archives',
            icon: <StarIcon />
        },
        {
            id: 'systems',
            title: 'Ship Systems',
            description: 'Monitor and control vessel operations',
            onClick: () => handleOptionClick('systems'),
            icon: <StarIcon />
        },
        {
            id: 'navigation',
            title: 'Stellar Navigation',
            description: 'Plot courses through the galaxy',
            href: '/navigation',
            icon: <StarIcon />
        },
        {
            id: 'communications',
            title: 'Communications',
            description: 'Establish contact with other vessels',
            onClick: () => handleOptionClick('communications'),
            icon: <StarIcon />
        }
    ]

    return (
        <OptionsGrid
            title='Ship Operations'
            subtitle='Select a system to access its functions'
            className='bg-gray-900/50'
        >
            {options.map((option) => (
                <OptionCard
                    key={option.id}
                    title={option.title}
                    description={option.description}
                    href={option.href}
                    onClick={option.onClick}
                    icon={option.icon}
                    className='h-48'
                />
            ))}
        </OptionsGrid>
    )
}