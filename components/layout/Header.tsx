"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationIcon } from '@/components/ui/NavigationIcon';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <header className="sticky top-0 z-50 py-2">
        <div className="mx-auto w-[95%] max-w-7xl bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center justify-between w-full">
            
            {/* Logo - Left */}
            <Link href="/" className="flex items-center">
              <div className="relative w-40 h-10">
                <Image
                  src="/Transparent Rectangular Logo with Text.png"
                  alt="Chris Star Enterprises"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation - Icon flush right */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center justify-between w-full max-w-3xl">
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
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <NavigationIcon className="w-5 h-5" />
                </Link>
              </div>
            </nav>

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
                className="text-white hover:text-gray-300 transition-colors duration-200 py-2"
                onClick={closeMenu}
              >
                <NavigationIcon className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;