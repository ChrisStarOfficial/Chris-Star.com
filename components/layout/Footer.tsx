"use client"

import React from 'react';
import { InteractiveLogo } from "@/components/ui/InteractiveLogo"

export const Footer = () => {
  return (
    <footer className="py-2 relative z-10">
        
        {/* Navbar Frame Background - Same shape as desktop */}
        <div className="mx-auto w-fit bg-black/20 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl px-4">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8">
          
          {/* Left: Copyright Text */}
          <div className="justify-self-end">
              <p className="font-sans whitespace-nowrap text-white text-base text-right">
              Copyright © 2025 <span className="font-serif font-bold [text-shadow:0_0_2px_rgba(255,255,255,0.2)]">CHRIS STAR ENTERPRISES</span> LLC. All Rights Reserved.
              </p>
          </div>

          {/* Center: Easter Egg Logo */}
          <div className="flex-shrink-0">
            <InteractiveLogo className="scale-75" />
          </div>

          {/* Right: Legal Links */}
          <div className="justify-self-start w-full">
              <div className="flex justify-between w-full text-base">
              <a href="/privacy" className="hover:text-white transition-colors text-white">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors text-white">Terms of Service</a>
              <a href="/legal" className="hover:text-white transition-colors text-white">Legal</a>
              <a href="/sitemap" className="hover:text-white transition-colors text-white">Site Map</a>
              <a href="/careers" className="hover:text-white transition-colors text-white">Careers</a>
              </div>
          </div>
          </div>

          {/* Mobile Layout - Fixed spacing and alignment */}
          <div className="md:hidden flex flex-col items-center py-1">
            {/* Logo - Reduced top spacing */}
            <div className="flex-shrink-0 mb-1">
              <InteractiveLogo className="scale-75" />
            </div>

            {/* Copyright Text - Exactly vertically centered */}
            <div className="w-full mb-1">
              <p className="font-sans whitespace-nowrap text-white text-sm text-center leading-tight">
                Copyright © 2025 <span className="font-serif font-bold [text-shadow:0_0_2px_rgba(255,255,255,0.2)]">CHRIS STAR ENTERPRISES</span> LLC. All Rights Reserved.
              </p>
            </div>

            {/* Legal Links - Closer together, reduced size */}
            <div className="w-full">
              <div className="flex justify-between w-full text-xs gap-1">
                <a href="/privacy" className="hover:text-white transition-colors text-white whitespace-nowrap">Privacy</a>
                <a href="/terms" className="hover:text-white transition-colors text-white whitespace-nowrap">Terms</a>
                <a href="/legal" className="hover:text-white transition-colors text-white whitespace-nowrap">Legal</a>
                <a href="/sitemap" className="hover:text-white transition-colors text-white whitespace-nowrap">Site Map</a>
                <a href="/careers" className="hover:text-white transition-colors text-white whitespace-nowrap">Careers</a>
              </div>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer;