"use client"

interface OptionOverlayProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export function OptionOverlay({ isOpen, onClose, title, children }: OptionOverlayProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-white transition-colors'
                >
                    <svg className="w-6 h-6" fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>

                {/* Content */}
                {children}
            </div>
        </div>
    )
}