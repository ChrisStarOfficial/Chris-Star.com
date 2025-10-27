import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function SacredGeometryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Very subtle animations
    const patterns = container.querySelectorAll('.sacred-pattern');
    
    patterns.forEach((pattern, index) => {
      gsap.to(pattern, {
        rotation: 360,
        duration: 400 + (index * 100),
        repeat: -1,
        ease: "none"
      });
    });

  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-cosmic overflow-hidden">
      {/* Base Grid - Static CSS */}
      <div className="absolute inset-0 opacity-[0.008]">
        <div className="absolute inset-0 bg-grid-stone/10" />
      </div>

      {/* Flower of Life - Pre-calculated coordinates */}
      <div className="absolute inset-0 opacity-[0.015] flex items-center justify-center">
        <svg width="400" height="400" viewBox="0 0 400 400" style={{ color: '#a8a29e' }}>
          <circle cx="200" cy="200" r="30" fill="none" stroke="#a8a29e" strokeWidth="0.5" />
          <circle cx="230" cy="200" r="30" fill="none" stroke="#a8a29e" strokeWidth="0.5" />
          <circle cx="215" cy="226" r="30" fill="none" stroke="#a8a29e" strokeWidth="0.5" />
          <circle cx="185" cy="226" r="30" fill="none" stroke="#a8a29e" strokeWidth="0.5" />
          <circle cx="170" cy="200" r="30" fill="none" stroke="#a8a29e" strokeWidth="0.5" />
          <circle cx="185" cy="174" r="30" fill="none" stroke="#a8a29e" strokeWidth="0.5" />
          <circle cx="215" cy="174" r="30" fill="none" stroke="#a8a29e" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Metatron's Cube - Static */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.012]">
        <svg width="200" height="200" viewBox="0 0 200 200" className="sacred-pattern" style={{ color: '#a8a29e' }}>
          <circle cx="100" cy="100" r="80" fill="none" stroke="#a8a29e" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
          <circle cx="155" cy="100" r="25" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
          <circle cx="127" cy="148" r="25" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
          <circle cx="73" cy="148" r="25" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
          <circle cx="45" cy="100" r="25" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
          <circle cx="73" cy="52" r="25" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
          <circle cx="127" cy="52" r="25" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
          <path d="M100,70 L130,85 L130,115 L100,130 L70,115 L70,85 Z" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Seed of Life - Static */}
      <div className="absolute top-1/4 left-1/4 opacity-[0.01]">
        <svg width="120" height="120" viewBox="0 0 120 120" className="sacred-pattern" style={{ color: '#a8a29e' }}>
          <circle cx="60" cy="60" r="18" fill="none" stroke="#a8a29e" strokeWidth="0.4" />
          <circle cx="78" cy="60" r="18" fill="none" stroke="#a8a29e" strokeWidth="0.4" />
          <circle cx="69" cy="76" r="18" fill="none" stroke="#a8a29e" strokeWidth="0.4" />
          <circle cx="51" cy="76" r="18" fill="none" stroke="#a8a29e" strokeWidth="0.4" />
          <circle cx="42" cy="60" r="18" fill="none" stroke="#a8a29e" strokeWidth="0.4" />
          <circle cx="51" cy="44" r="18" fill="none" stroke="#a8a29e" strokeWidth="0.4" />
          <circle cx="69" cy="44" r="18" fill="none" stroke="#a8a29e" strokeWidth="0.4" />
        </svg>
      </div>

      {/* Vesica Piscis - Static */}
      <div className="absolute bottom-1/4 right-1/4 opacity-[0.008]">
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ color: '#a8a29e' }}>
          <path d="M20,40 A20,20 0 1,1 60,40 A20,35 0 1,1 20,40 Z" fill="none" stroke="#a8a29e" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Sri Yantra - Static */}
      <div className="absolute top-1/3 right-1/3 opacity-[0.006]">
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ color: '#a8a29e' }}>
          <polygon points="40,15 60,50 20,50" fill="none" stroke="#a8a29e" strokeWidth="0.3" />
          <polygon points="40,50 60,15 20,15" fill="none" stroke="#a8a29e" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Hexagonal Pattern - Static */}
      <div className="absolute bottom-1/3 left-1/3 opacity-[0.005]">
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ color: '#a8a29e' }}>
          <polygon points="30,0 45,15 45,35 30,50 15,35 15,15" fill="none" stroke="#a8a29e" strokeWidth="0.2" />
        </svg>
      </div>
    </div>
  );
}