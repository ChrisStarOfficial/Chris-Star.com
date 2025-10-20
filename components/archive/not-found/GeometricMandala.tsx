import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface GeometricMandalaProps {
  active: boolean
  onClick: () => void
}

export default function GeometricMandala({ active, onClick }: GeometricMandalaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!mandalaRef.current) return;

    // Create master timeline for all animations
    timelineRef.current = gsap.timeline({ 
      paused: true,
      repeat: -1
    });

    // Outer ring rotations with different speeds
    timelineRef.current.to(".ring-1", {
      rotation: 360,
      duration: 80,
      ease: "none"
    }, 0);

    timelineRef.current.to(".ring-2", {
      rotation: -360,
      duration: 60,
      ease: "none"
    }, 0);

    timelineRef.current.to(".ring-3", {
      rotation: 180,
      duration: 100,
      ease: "none"
    }, 0);

    timelineRef.current.to(".ring-4", {
      rotation: -180,
      duration: 40,
      ease: "none"
    }, 0);

    // Radial lines animation
    timelineRef.current.to(".radial-line", {
      rotation: 360,
      duration: 120,
      ease: "none",
      transformOrigin: "0% 50%"
    }, 0);

    // Hexagon rotation
    timelineRef.current.to(".hexagon", {
      rotation: 360,
      duration: 120,
      ease: "none"
    }, 0);

    // Triangle rotations
    timelineRef.current.to(".triangle-1", {
      rotation: 360,
      duration: 200,
      ease: "none"
    }, 0);

    timelineRef.current.to(".triangle-2", {
      rotation: -360,
      duration: 200,
      ease: "none"
    }, 0);

    // Orbital elements with staggered animation
    timelineRef.current.to(".orbital-element", {
      rotation: 720,
      duration: 30,
      stagger: 0.5,
      ease: "sine.inOut"
    }, 0);

    // Central core pulsing
    timelineRef.current.to(".central-core", {
      scale: 1.3,
      opacity: 0.8,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    }, 0);

    // Hover indicator fade in/out
    timelineRef.current.to(".hover-indicator", {
      opacity: 0.7,
      duration: 2,
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
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
      );
    } else {
      timelineRef.current?.pause();
      gsap.to(mandalaRef.current, {
        scale: 0.8,
        opacity: 0.3,
        duration: 0.8,
        ease: "power2.in"
      });
    }
  }, [active]);

  return (
    // REMOVED the external containers - just return the mandala directly
    <div
      ref={mandalaRef}
      className={`relative cursor-pointer transition-all duration-1000 ${active ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
      onClick={onClick}
    >
      <div className="relative w-80 h-80 group">
        {/* Outer rings */}
        <div
          className="ring-1 absolute inset-0 border-2 border-slate-300/20 rounded-full group-hover:border-slate-300/35 transition-all duration-700"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 25%, 75% 25%, 75% 75%, 100% 75%, 100% 100%, 0% 100%)",
            boxShadow: "0 0 20px rgba(148, 163, 184, 0.05)",
          }}
        />
        <div
          className="ring-2 absolute inset-4 border-2 border-slate-300/25 rounded-full group-hover:border-slate-300/40 transition-all duration-700"
          style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 25% 75%)",
            boxShadow: "0 0 15px rgba(148, 163, 184, 0.08)",
          }}
        />
        <div
          className="ring-3 absolute inset-8 border border-slate-300/15 rounded-full group-hover:border-slate-300/30 transition-all duration-700"
          style={{
            clipPath: "polygon(0% 0%, 75% 0%, 75% 25%, 25% 25%, 25% 75%, 75% 75%, 75% 100%, 0% 100%)",
          }}
        />
        <div
          className="ring-4 absolute inset-12 border border-slate-300/20 rounded-full group-hover:border-slate-300/35 transition-all duration-700"
          style={{
            clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)",
          }}
        />

        {/* Radial lines */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="radial-line absolute top-1/2 left-1/2 w-40 h-0.5 bg-slate-300/12 group-hover:bg-slate-300/20 transition-all duration-700"
            style={{
              transform: `rotate(${i * 22.5}deg)`,
              boxShadow: "0 0 2px rgba(148, 163, 184, 0.1)",
              transformOrigin: 'center center',
            }}
          />
        ))}

        {/* Hexagon */}
        <div
          className="hexagon absolute top-1/2 left-1/2 w-32 h-32 border-2 border-slate-300/30 group-hover:border-slate-300/50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
          style={{
            clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
            boxShadow: "0 0 10px rgba(148, 163, 184, 0.1)",
          }}
        />

        {/* Triangular elements */}
        <div
          className="triangle-1 absolute top-1/2 left-1/2 w-16 h-16 border-2 border-slate-300/35 group-hover:border-slate-300/55 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
          style={{
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
        <div
          className="triangle-2 absolute top-1/2 left-1/2 w-16 h-16 border-2 border-slate-300/35 group-hover:border-slate-300/55 transform -translate-x-1/2 -translate-y-1/2 rotate-180 transition-all duration-700"
          style={{
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />

        {/* Orbital elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="orbital-element absolute w-4 h-4 bg-slate-300/25 group-hover:bg-slate-300/45 rounded-full transition-all duration-700"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-140px)`,
              boxShadow: "0 0 8px rgba(148, 163, 184, 0.2)",
            }}
          />
        ))}

        {/* Central core */}
        <div
          className="central-core absolute top-1/2 left-1/2 w-8 h-8 bg-slate-300/40 group-hover:bg-slate-300/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
          style={{
            boxShadow: "0 0 12px rgba(148, 163, 184, 0.3)",
          }}
        />

        {/* Hover indicator */}
        <div className="hover-indicator absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-slate-300/90 font-sans text-sm tracking-wider bg-gray-900/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-300/20">
            ◊ ACTIVATE PROTOCOLS ◊
          </div>
        </div>
      </div>
    </div>
  )
}