"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationText } from '@/components/ui/NavigationText';
import { NavigationIcon } from '@/components/ui/NavigationIcon';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSpacing, setNavSpacing] = useState('space-x-8');
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

  // Dynamic spacing calculation
  useEffect(() => {
    const updateSpacing = () => {
      if (!headerRef.current) return;

      const header = headerRef.current;
      const logoWidth = header.querySelector('a:first-child')?.clientWidth || 0;
      const availableWidth = header.clientWidth - logoWidth - 48; // 48px for padding

      // Calculate optimal spacing based on available width
      let spacing;
      if (availableWidth > 1200) {
        spacing = 'space-x-32';
      } else if (availableWidth > 1000) {
        spacing = 'space-x-24';
      } else if (availableWidth > 800) {
        spacing = 'space-x-20';
      } else if (availableWidth > 600) {
        spacing = 'space-x-16';
      } else {
        spacing = 'space-x-12';
      }

      setNavSpacing(spacing);
    };

    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 py-2" ref={headerRef}>
        <div className="mx-auto w-[95%] max-w-7xl bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center justify-between w-full">
            
            {/* Logo - Left */}
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

            {/* Desktop Navigation - Distributed with proper spacing */}
            <nav className="hidden lg:flex items-center flex-1 ml-8"> {/* Added ml-8 for logo spacing */}
              <div className={`flex items-center justify-between w-full ${navSpacing}`}>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-base whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/navigation"
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-base whitespace-nowrap"
                >
                  <NavigationText />
                </Link>
              </div>
            </nav>

            {/* Dark Mode Toggle Icon */}
            <div className="hidden lg:flex items-center justify-end flex-shrink-0 ml-8"> {/* Added ml-8 for spacing */}
              <button className="text-white hover:text-gray-300 transition-colors duration-200 p-2">
                <svg 
                  className="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1012 11.69 1 1 0 00-.36-1.05z" />
                </svg>
              </button>
            </div>

            {/* Mobile Hamburger/X */}
            <button
              className="lg:hidden text-white p-2"
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