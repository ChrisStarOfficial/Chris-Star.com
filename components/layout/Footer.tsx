"use client"

import React, { useState, useRef, useEffect } from 'react';
import { InteractiveLogo } from "@/components/ui/InteractiveLogo"

export const Footer = () => {
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const [copyrightFontSize, setCopyrightFontSize] = useState('text-xs');
  const [secondRowWidth, setSecondRowWidth] = useState('auto');

  // Dynamic text scaling and width matching
  useEffect(() => {
    const updateLayout = () => {
      if (!copyrightRef.current || !secondRowRef.current) return;

      const copyrightElement = copyrightRef.current;
      const secondRowElement = secondRowRef.current;
      const footerContainer = copyrightElement.closest('.mx-auto');
      
      if (!footerContainer) return;

      // Get available width (viewport width minus padding)
      const containerPadding = 24; // px-3 = 12px on each side
      const availableWidth = footerContainer.clientWidth - containerPadding;

      // Try progressively larger font sizes until we find one that fits
      const fontSizes = ['text-[10px]', 'text-[11px]', 'text-xs', 'text-sm', 'text-base'];
      let bestSize = 'text-xs';
      
      for (let i = fontSizes.length - 1; i >= 0; i--) {
        const testSize = fontSizes[i];
        copyrightElement.className = `font-sans whitespace-nowrap text-white text-center leading-tight ${testSize}`;
        
        if (copyrightElement.scrollWidth <= availableWidth) {
          bestSize = testSize;
          break;
        }
      }

      // Apply the best fitting size
      copyrightElement.className = `font-sans whitespace-nowrap text-white text-center leading-tight ${bestSize}`;
      setCopyrightFontSize(bestSize);

      // Set second row to match copyright width
      const copyrightWidth = copyrightElement.scrollWidth;
      setSecondRowWidth(`${copyrightWidth}px`);
    };

    // Initial update
    updateLayout();

    // Update on resize
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

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

        {/* Mobile Layout - Dynamic width matching */}
        <div className="md:hidden flex flex-col pt-2 pb-1 px-3">
          {/* First Row: Copyright - Dynamic text scaling */}
          <div className="w-full mb-1 flex justify-center">
            <p 
              ref={copyrightRef}
              className="font-sans whitespace-nowrap text-white text-center leading-tight"
            >
              Copyright © 2025 <span className="font-serif font-bold [text-shadow:0_0_2px_rgba(255,255,255,0.2)]">CHRIS STAR ENTERPRISES</span> LLC. All Rights Reserved.
            </p>
          </div>

          {/* Second Row: Dynamically matched width */}
          <div className="flex justify-center w-full">
            <div 
              ref={secondRowRef}
              className="flex items-center justify-between h-5"
              style={{ width: secondRowWidth }}
            >
              {/* Logo */}
              <div className="flex-shrink-0 -ml-2">
                <InteractiveLogo className="scale-75" />
              </div>

              {/* Legal Links - Dynamic spacing based on available width */}
              <div className="flex-1 flex justify-between ml-7">
                <a href="/privacy" className={`hover:text-white transition-colors text-white whitespace-nowrap ${copyrightFontSize} flex items-center`}>Privacy</a>
                <a href="/terms" className={`hover:text-white transition-colors text-white whitespace-nowrap ${copyrightFontSize} flex items-center`}>Terms</a>
                <a href="/legal" className={`hover:text-white transition-colors text-white whitespace-nowrap ${copyrightFontSize} flex items-center`}>Legal</a>
                <a href="/sitemap" className={`hover:text-white transition-colors text-white whitespace-nowrap ${copyrightFontSize} flex items-center`}>Site Map</a>
                <a href="/careers" className={`hover:text-white transition-colors text-white whitespace-nowrap ${copyrightFontSize} flex items-center`}>Careers</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;