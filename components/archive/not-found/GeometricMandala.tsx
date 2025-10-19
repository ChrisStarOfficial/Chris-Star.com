import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface GeometricMandalaProps {
  active: boolean;
  onClick: () => void;
}

export default function GeometricMandala({ active, onClick }: GeometricMandalaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Sacred geometry constants
  const GOLDEN_RATIO = 1.618;
  const CIRCLE_DIVISIONS = 12; // Zodiac/12-fold symmetry
  const LAYERS = 7; // Sacred number

  useEffect(() => {
    if (!mandalaRef.current) return;

    // Create GSAP timeline for mandala animations
    timelineRef.current = gsap.timeline({ 
      paused: true,
      repeat: -1,
      defaults: { ease: "sine.inOut" }
    });

    // Layer 1: Outer ring - 12-fold division (Zodiac)
    timelineRef.current.to(".mandala-ring-1", {
      rotation: 360,
      duration: 120,
      ease: "none"
    }, 0);

    // Layer 2: Inner rings - counter-rotation
    timelineRef.current.to(".mandala-ring-2", {
      rotation: -360,
      duration: 80,
      ease: "none"
    }, 0);

    // Layer 3: Flower of Life pattern
    timelineRef.current.to(".flower-life", {
      rotation: 180,
      duration: 60,
      ease: "power2.inOut"
    }, 0);

    // Layer 4: Metatron's Cube elements
    timelineRef.current.to(".metatron-element", {
      rotation: 90,
      duration: 40,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, 0);

    // Layer 5: Orbiting points - planetary motion
    timelineRef.current.to(".orbiting-point", {
      rotation: 720,
      duration: 30,
      stagger: 0.2,
      ease: "sine.inOut"
    }, 0);

    // Pulsing glow effects
    timelineRef.current.to(".sacred-center", {
      scale: 1.2,
      opacity: 0.8,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    }, 0);

    // Element breathing animation
    timelineRef.current.to(".breathing-element", {
      scale: 1.1,
      opacity: 0.7,
      duration: 3,
      stagger: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    }, 0);

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (active) {
      timelineRef.current?.play();
      // Entrance animation
      gsap.fromTo(mandalaRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "back.out(1.7)" }
      );
    } else {
      timelineRef.current?.pause();
      gsap.to(mandalaRef.current, {
        scale: 0.8,
        opacity: 0.5,
        duration: 1,
        ease: "power2.in"
      });
    }
  }, [active]);

  const renderSacredGeometry = () => {
    const elements = [];

    // Layer 1: Outer Protection Ring (12-fold)
    elements.push(
      <div
        key="ring-1"
        className="mandala-ring-1 absolute inset-0 border-2 border-amber-400/20 rounded-full"
        style={{
          clipPath: `polygon(${Array.from({ length: CIRCLE_DIVISIONS }, (_, i) => {
            const angle = (i * 360) / CIRCLE_DIVISIONS;
            const x = 50 + 45 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 45 * Math.sin((angle * Math.PI) / 180);
            return `${x}% ${y}%`;
          }).join(', ')})`
        }}
      />
    );

    // Layer 2: Flower of Life Pattern
    for (let ring = 1; ring <= 3; ring++) {
      const radius = 30 + ring * 10;
      for (let i = 0; i < CIRCLE_DIVISIONS; i++) {
        const angle = (i * 360) / CIRCLE_DIVISIONS;
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
        
        elements.push(
          <div
            key={`flower-${ring}-${i}`}
            className="flower-life absolute border border-emerald-400/30 rounded-full breathing-element"
            style={{
              width: `${15 - ring * 2}%`,
              height: `${15 - ring * 2}%`,
              left: `${x - (15 - ring * 2) / 2}%`,
              top: `${y - (15 - ring * 2) / 2}%`,
            }}
          />
        );
      }
    }

    // Layer 3: Metatron's Cube Elements
    const metatronPoints: [number, number][] = [];
    for (let i = 0; i < CIRCLE_DIVISIONS; i++) {
      const angle = (i * 360) / CIRCLE_DIVISIONS;
      const x = 50 + 25 * Math.cos((angle * Math.PI) / 180);
      const y = 50 + 25 * Math.sin((angle * Math.PI) / 180);
      metatronPoints.push([x, y]);
    }

    // Connect points to form sacred geometric patterns
    metatronPoints.forEach(([x1, y1], i) => {
      metatronPoints.forEach(([x2, y2], j) => {
        if (i < j) {
          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (distance > 20 && distance < 40) { // Only draw meaningful connections
            elements.push(
              <div
                key={`metatron-${i}-${j}`}
                className="metatron-element absolute bg-purple-500/10"
                style={{
                  width: `${distance}%`,
                  height: '1px',
                  left: `${x1}%`,
                  top: `${y1}%`,
                  transform: `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`,
                  transformOrigin: '0 0',
                }}
              />
            );
          }
        }
      });
    });

    // Layer 4: Orbiting Wisdom Points
    for (let i = 0; i < 24; i++) {
      const angle = (i * 360) / 24;
      const radius = 15 + (i % 3) * 5;
      elements.push(
        <div
          key={`orbit-${i}`}
          className="orbiting-point absolute w-2 h-2 bg-cyan-400/60 rounded-full"
          style={{
            left: `${50 + radius * Math.cos((angle * Math.PI) / 180) - 1}%`,
            top: `${50 + radius * Math.sin((angle * Math.PI) / 180) - 1}%`,
            transformOrigin: '50% 50%',
          }}
        />
      );
    }

    // Layer 5: Golden Ratio Spirals (simplified)
    for (let i = 0; i < 8; i++) {
      const angle = (i * 360) / 8;
      elements.push(
        <div
          key={`spiral-${i}`}
          className="absolute w-4 h-4 border-r-2 border-b-2 border-amber-300/40"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            transformOrigin: '0% 0%',
          }}
        />
      );
    }

    // Central Sacred Point - The Bindu
    elements.push(
      <div
        key="center"
        className="sacred-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full shadow-lg shadow-amber-400/25"
      />
    );

    // Esoteric Symbols
    const symbols = ['☉', '☽', '★', '⚡', '🜂', '🜁', '🜃', '🜄'];
    symbols.forEach((symbol, i) => {
      const angle = (i * 360) / symbols.length;
      const radius = 38;
      elements.push(
        <div
          key={`symbol-${i}`}
          className="absolute text-amber-200/60 text-xl font-light pointer-events-none"
          style={{
            left: `${50 + radius * Math.cos((angle * Math.PI) / 180) - 4}%`,
            top: `${50 + radius * Math.sin((angle * Math.PI) / 180) - 4}%`,
            transform: `rotate(${-angle}deg)`,
          }}
        >
          {symbol}
        </div>
      );
    });

    return elements;
  };

  return (
    <div className="flex items-center justify-center p-8" ref={containerRef}>
      <div
        ref={mandalaRef}
        className="relative w-96 h-96 cursor-pointer transition-all duration-1000"
        onClick={onClick}
        style={{ opacity: active ? 1 : 0.5 }}
      >
        {/* Main Mandala Container */}
        <div className="relative w-full h-full">
          {renderSacredGeometry()}
        </div>

        {/* Interactive Hover State */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${active ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-amber-200/80 font-sans text-sm tracking-wider bg-gray-900/80 px-6 py-3 rounded-lg backdrop-blur-sm border border-amber-400/30 transform hover:scale-105 transition-transform duration-300">
            ⟡ ACTIVATE SACRED GEOMETRY ⟡
          </div>
        </div>

        {/* Status Indicators */}
        <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300/90 text-sm font-sans tracking-wider">
              SACRED PATTERNS ACTIVE
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes mandala-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(245, 158, 11, 0.6)); }
        }
        
        .sacred-center {
          animation: mandala-glow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}