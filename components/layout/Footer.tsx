"use client"

import React from 'react';
import { InteractiveLogo } from "@/components/ui/InteractiveLogo"

export const Footer = () => {
  return (
    <footer className="py-1 relative z-10">
        
        {/* Navbar Frame Background - Full width on mobile */}
        <div className="mx-auto w-full md:w-fit bg-black/20 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl px-3 md:px-4">
          {/* Desktop Layout - Perfect as is */}
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

          {/* Mobile Layout - Dynamic width and proper text scaling */}
          <div className="md:hidden flex flex-col pt-2 pb-1 px-3">
            {/* First Row: Copyright - Adaptive text that scales */}
            <div className="w-full mb-1"> {/* Reduced from mb-2 to mb-1 */}
              <p className="font-sans whitespace-nowrap text-white text-center leading-tight 
                         text-xs min-[360px]:text-xs min-[320px]:text-[11px] min-[280px]:text-[10px]">
                Copyright © 2025 <span className="font-serif font-bold [text-shadow:0_0_2px_rgba(255,255,255,0.2)]">CHRIS STAR ENTERPRISES</span> LLC. All Rights Reserved.
              </p>
            </div>

            {/* Second Row: Dynamically centered to match first row width */}
            <div className="flex items-center justify-center w-full h-5">
              <div className="flex items-center justify-between w-full max-w-[280px]"> {/* Dynamic max-width */}
                {/* Logo */}
                <div className="flex-shrink-0">
                  <InteractiveLogo className="scale-75" />
                </div>

                {/* Legal Links - Dynamic spacing based on container */}
                <div className="flex-1 flex justify-between ml-3 min-w-0"> {/* Added min-w-0 for flexbox shrinking */}
                  <a href="/privacy" className="hover:text-white transition-colors text-white whitespace-nowrap text-xs flex items-center px-1">Privacy</a>
                  <a href="/terms" className="hover:text-white transition-colors text-white whitespace-nowrap text-xs flex items-center px-1">Terms</a>
                  <a href="/legal" className="hover:text-white transition-colors text-white whitespace-nowrap text-xs flex items-center px-1">Legal</a>
                  <a href="/sitemap" className="hover:text-white transition-colors text-white whitespace-nowrap text-xs flex items-center px-1">Site Map</a>
                  <a href="/careers" className="hover:text-white transition-colors text-white whitespace-nowrap text-xs flex items-center px-1">Careers</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer;