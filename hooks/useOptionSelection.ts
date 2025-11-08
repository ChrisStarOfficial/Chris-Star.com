"use client"

import { useState } from "react"

interface UseOptionSelectionProps {
    onOptionSelect?: (optionId: string) => void
}

export function useOptionSelection({ onOptionSelect }: UseOptionSelectionProps = {}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    
    const handleOptionClick = (optionId: string) => {
        setSelectedOption(optionId)
        onOptionSelect?.(optionId)
    }

    return {
        selectedOption,
        setSelectedOption,
        handleOptionClick
    }
}