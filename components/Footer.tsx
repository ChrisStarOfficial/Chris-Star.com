"use client"

import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { InteractiveLogo } from "@/components/InteractiveLogo"

export const Footer = () => {
  return (
    <footer className="py-2 relative z-10">
        
        {/* Navbar Frame Background */}
        <div className="mx-auto w-fit bg-black/20 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl px-4">
          {/* Content */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8">
          
          {/* Left: Copyright Text - More space from edge */}
          <div className="justify-self-end">
              <p className="font-sans whitespace-nowrap text-white text-base text-right">
              Copyright © 2025 <span className="font-serif font-bold [text-shadow:0_0_2px_rgba(255,255,255,0.2)]">CHRIS STAR ENTERPRISES</span> LLC. All Rights Reserved.
              </p>
          </div>

          {/* Center: Easter Egg Logo */}
          <div className="flex-shrink-0">
            <InteractiveLogo className="scale-75" />
          </div>

          {/* Right: Legal Links - More space from logo */}
          <div className="justify-self-start w-full">
              <div className="flex justify-between w-full text-base">
              <a href="/privacy" className="hover:text-white transition-colors text-white">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors text-white">Terms of Service</a>
              <a href="/legal" className="hover:text-white transition-colors text-white">Legal</a>
              <a href="/navigation" className="hover:text-white transition-colors text-white">Navigation</a>
              <a href="/careers" className="hover:text-white transition-colors text-white">Careers</a>
              </div>
          </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer;