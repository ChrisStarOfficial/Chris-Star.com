// components/PageWithHyperspace.tsx
'use client';

import { useState } from 'react';
import { HyperspaceEffect } from '@/components/archive/navigation/effects/HyperspaceEffect';

export const PageWithHyperspace = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateWithEffect = (newPage: string) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 3000); // Match this with your hyperspace duration
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="flex justify-center p-4 space-x-4">
        <button 
          onClick={() => navigateWithEffect('home')}
          className="text-white px-4 py-2 border border-white rounded"
        >
          Home
        </button>
        <button 
          onClick={() => navigateWithEffect('about')}
          className="text-white px-4 py-2 border border-white rounded"
        >
          About
        </button>
        <button 
          onClick={() => navigateWithEffect('contact')}
          className="text-white px-4 py-2 border border-white rounded"
        >
          Contact
        </button>
      </nav>

      {/* Content */}
      <div className="p-8">
        {currentPage === 'home' && (
          <div className="text-white text-center">
            <h1 className="text-4xl mb-4">Home Page</h1>
            <p>Welcome to the starship!</p>
          </div>
        )}
        
        {currentPage === 'about' && (
          <div className="text-white text-center">
            <h1 className="text-4xl mb-4">About Us</h1>
            <p>We explore the galaxy!</p>
          </div>
        )}
        
        {currentPage === 'contact' && (
          <div className="text-white text-center">
            <h1 className="text-4xl mb-4">Contact</h1>
            <p>Reach us across the stars!</p>
          </div>
        )}
      </div>

      {/* Hyperspace Effect */}
      {isTransitioning && <HyperspaceEffect />}
    </div>
  );
};