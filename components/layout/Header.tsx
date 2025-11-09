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
      <header className="sticky top-0 z-40 py-2">
        {/* Glassmorphism Header Background - Matches Footer exactly */}
        <div className="mx-auto w-[95%] bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center justify-between w-full">
            
            {/* Left: Logo + Company Name */}
            <Link 
              href="/" 
              className="flex items-center group"
              onClick={closeMenu}
            >
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

            {/* Center: Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex justify-between max-w-md w-full">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-lg whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right: Navigation Icon - Desktop */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/navigation"
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <NavigationIcon className="w-6 h-6" />
              </Link>
            </div>

            {/* Mobile: Animated Hamburger/X Button */}
            <button
              className="lg:hidden text-white p-2 -mr-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                {/* Hamburger lines that transform to X */}
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
        ></div>
        
        {/* Slide-in Menu from Right */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-black/30 backdrop-blur-2xl border-l border-white/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Close Button - Animated X matching hamburger */}
          <div className="absolute top-6 right-6">
            <button
              onClick={closeMenu}
              className="text-white p-2"
            >
              <div className="w-6 h-6 relative">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white rotate-45"></span>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white -rotate-45"></span>
              </div>
            </button>
          </div>

          <div className="flex flex-col h-full pt-32 px-8">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-sans text-xl py-2 text-center"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Navigation Icon - Right below Archives with same spacing */}
              <div className="pt-2 flex justify-center">
                <Link
                  href="/navigation"
                  className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center justify-center"
                  onClick={closeMenu}
                >
                  <NavigationIcon className="w-8 h-8" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;