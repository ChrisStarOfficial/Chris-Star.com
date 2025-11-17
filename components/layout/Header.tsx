"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationText } from '@/components/ui/NavigationText';
import { NavigationIcon } from '@/components/ui/NavigationIcon';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [linkSpacing, setLinkSpacing] = useState('space-x-8');
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationLinks = [
    { name: 'About', href: '/about' },
    { name: 'Community', href: '/community' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'The Archives', href: '/archives' },
  ];

  // Dynamic equal spacing calculation
  useEffect(() => {
    const updateSpacing = () => {
      if (!headerRef.current) return;

      const header = headerRef.current;
      const logo = header.querySelector('a:first-child') as HTMLElement;
      const moonIcon = header.querySelector('button:last-child') as HTMLElement;
      
      if (!logo || !moonIcon) return;

      const logoWidth = logo.clientWidth;
      const moonWidth = moonIcon.clientWidth;
      const headerWidth = header.clientWidth;
      const padding = 48; // Total padding (24px each side)

      // Calculate available space for links
      const availableWidth = headerWidth - logoWidth - moonWidth - padding;
      
      // We have 5 text links, which creates 6 gaps (including before first and after last)
      // Each gap should be equal
      const gapWidth = availableWidth / 6; // 6 equal gaps between 7 total elements

      // Convert gap width to Tailwind spacing class
      let spacingClass;
      if (gapWidth >= 32) spacingClass = 'space-x-8';    // 32px
      else if (gapWidth >= 24) spacingClass = 'space-x-6'; // 24px
      else if (gapWidth >= 20) spacingClass = 'space-x-5'; // 20px
      else if (gapWidth >= 16) spacingClass = 'space-x-4'; // 16px
      else spacingClass = 'space-x-3';                    // 12px

      setLinkSpacing(spacingClass);
    };

    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 py-2" ref={headerRef}>
        <div className="mx-auto w-[95%] max-w-7xl bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl px-6 lg:px-8 h-16 flex items-center">
          {/* All elements in one flex container with dynamic spacing */}
          <div className={`hidden lg:flex items-center justify-between w-full ${linkSpacing}`}>
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-40 h-10">
                <Image
                  src="/logos/dark-mode/Transparent Rectangular Logo with Text.png"
                  alt="Chris Star Enterprises"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Navigation Links */}
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-base whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Navigation Text */}
            <Link
              href="/navigation"
              className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-base whitespace-nowrap"
            >
              <NavigationText />
            </Link>

            {/* Dark Mode Toggle Icon - Thinner crescent facing left */}
            <button className="text-white hover:text-gray-300 transition-colors duration-200 p-2 flex-shrink-0">
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                {/* Thin crescent moon facing left - about 1/4 full */}
                <path d="M9.37 3.51a7.99 7.99 0 1 0 11.12 11.12 9 9 0 0 1-11.12-11.12z" 
                      fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-40 h-10">
                <Image
                  src="/logos/dark-mode/Transparent Rectangular Logo with Text.png"
                  alt="Chris Star Enterprises"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Mobile Hamburger/X */}
            <button
              className="text-white p-2"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu - Full blur coverage */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Fullscreen backdrop with blur - covers EVERYTHING including header */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-lg" 
            onClick={closeMenu}
          ></div>
          
          {/* Header stays on top of blur */}
          <div className="relative z-10">
            {/* Your existing header is already here and will appear above the blur */}
          </div>
          
          {/* Circular glassmorphism overlay - starts below header */}
          <div 
            className="absolute left-4 right-4 bottom-4 bg-black/30 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl"
            style={{ top: '84px' }}
          >
            {/* Menu Content */}
            <div className="flex flex-col items-center justify-center h-full space-y-10 px-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-xl py-2 w-full text-center"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/navigation"
                className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-xl py-2 text-center"
                onClick={closeMenu}
              >
                <span className="flex items-baseline justify-center">
                  <span>N</span>
                  <NavigationIcon className="w-4 h-4 mx-0.5" />
                  <span>vig</span>
                  <span className="relative -top-px">ation</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;