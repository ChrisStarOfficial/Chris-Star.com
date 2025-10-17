"use client"

import React from 'react';
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-gray-900 relative z-10 text-gray-400 text-sm">
        
        {/* Top Separator Line */}
        <div className="max-w-7xl mx-auto border-t border-gray-700 mb-4" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end">
        
        {/* Left Block: Copyright and Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-24">
            
            {/* Copyright Text */}
            <p className="font-sans whitespace-nowrap">
            Copyright © 2025 Chris Star Enterprises LLC. All Rights Reserved.
            </p>

            {/* Legal Links (use vertical separators) */}
            <div className="flex flex-wrap space-x-3 text-xs md:text-sm">
            <a href="/privacy" className="hover:text-white transition-colors border-r border-gray-600 pr-3">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors border-r border-gray-600 pr-3">Terms of Use</a>
            <a href="/legal" className="hover:text-white transition-colors border-r border-gray-600 pr-3">Legal</a>
            <a href="/navigation" className="hover:text-white transition-colors">Navigation</a>
            </div>
        </div>
        
        {/* Right Block: Logo/Brand Name (replaces "United States") */}
        <div className="mt-4 md:mt-0">
            <Image
                src="/Icon.png"
                alt="Chris Star Enterprises"
                width={36}
                height={36}
            />
        </div>
        </div>
    </footer>
  )
}

export default Footer;