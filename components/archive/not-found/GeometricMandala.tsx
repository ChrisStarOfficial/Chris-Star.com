"use client"

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { PrimeRadiant } from '@/components/three/PrimeRadiant'

export default function FoundationPage() {
  const [isRadiantActive, setIsRadiantActive] = useState(false)

  const handleRadiantActivate = () => {
    setIsRadiantActive(true)
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Stars */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        {/* Title Section - KEEPING YOUR EXISTING TEXT */}
        <div className="mb-2">
          <h1 className="text-6xl font-bold text-white mb-2 font-serif tracking-wider">
            FOUNDATION
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
            The Prime Radiant contains the entirety of Psychohistory&apos;s future predictions. 
            Handle with extreme caution.
          </p>
        </div>

        {/* 3D Prime Radiant - REPLACING THE MANDALA */}
        <div 
          className="w-96 h-96 mx-auto cursor-pointer my-4"
          onClick={handleRadiantActivate}
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            className="rounded-lg"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={1} color="#4f8cff" />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0066ff" />
              
              <PrimeRadiant
                active={isRadiantActive}
                onClick={handleRadiantActivate}
              />
              
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={3}
                maxDistance={10}
                autoRotate={!isRadiantActive}
                autoRotateSpeed={0.5}
              />
              
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>

        {/* KEEPING YOUR EXISTING ACTIVATE PROTOCOL BUTTON */}
        <div className="mt-6">
          <div 
            className="text-slate-300/90 font-sans text-xl font-bold tracking-widest bg-gray-900/80 px-6 py-3 rounded-xl backdrop-blur-sm border-2 border-slate-300/20 cursor-pointer hover:border-slate-300/40 hover:bg-gray-900/90 transition-all duration-300"
            onClick={handleRadiantActivate}
          >
            ACTIVATE PROTOCOL
          </div>
        </div>

        {/* Status Display */}
        <div className="mt-6 text-center">
          <div className={`text-sm font-mono px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-500 ${
            isRadiantActive 
              ? 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10' 
              : 'text-slate-400 border-slate-500/50 bg-slate-500/10'
          }`}>
            {isRadiantActive ? 'PSYCHOHISTORY EQUATIONS ENGAGED' : 'PRIME RADIANT READY'}
          </div>
        </div>

      </div>

      {/* CSS for star twinkling */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}