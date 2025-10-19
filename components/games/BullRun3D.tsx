'use client';

import { useEffect, useRef } from 'react';

interface BullRun3DProps {
  onScoreUpdate?: (score: number) => void;
  onGameOver?: (score: number) => void;
}

export default function BullRun3D({ onScoreUpdate, onGameOver }: BullRun3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || gameInitialized.current) return;

    const initializeGame = async () => {
      try {
        console.log('🐂 Initializing Bull Run 3D...');

        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/games/bull-run-3d/css/style.min.css';
        document.head.appendChild(link);

        // Load Three.js and other libraries
        await loadScript('/games/bull-run-3d/libs/three/three.min.js');
        await loadScript('/games/bull-run-3d/libs/howler/howler.min.js');
        await loadScript('/games/bull-run-3d/libs/nebula/three-nebula.js');
        
        // Load game scripts in correct order
        await loadScript('/games/bull-run-3d/js/src/assets.js');
        await loadScript('/games/bull-run-3d/js/src/init.js');
        await loadScript('/games/bull-run-3d/js/src/camera.js');
        await loadScript('/games/bull-run-3d/js/src/player_manager.js');
        await loadScript('/games/bull-run-3d/js/src/enemy_manager.js');
        await loadScript('/games/bull-run-3d/js/src/game_manager.js');

        // Wait a bit for scripts to initialize
        setTimeout(() => {
          if (window.initGame) {
            window.initGame();
            gameInitialized.current = true;
            console.log('🎮 Bull Run 3D initialized successfully!');
          } else {
            console.error('❌ initGame not found on window');
          }
        }, 1000);

      } catch (error) {
        console.error('❌ Failed to load Bull Run 3D:', error);
      }
    };

    initializeGame();

    return () => {
      // Cleanup function
      if (window.gameManager && window.gameManager.stop) {
        window.gameManager.stop();
      }
    };
  }, [onScoreUpdate, onGameOver]);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        console.log(`✅ Loaded: ${src}`);
        resolve();
      };
      script.onerror = () => {
        console.error(`❌ Failed to load: ${src}`);
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.body.appendChild(script);
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Game Container */}
      <div 
        ref={containerRef}
        id="game-container"
        className="border-2 border-amber-500/30 rounded-xl overflow-hidden bg-gray-900 min-h-[500px] flex items-center justify-center"
      />
      
      {/* Loading State */}
      {!gameInitialized.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm rounded-xl">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🐂</div>
            <h3 className="font-sans font-bold text-2xl text-white mb-2">Loading Bull Run 3D</h3>
            <p className="text-gray-300 mb-4">Initializing 3D engine and assets...</p>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-amber-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Extend Window interface for game globals
declare global {
  interface Window {
    initGame: () => void;
    gameManager: any;
    scoreManager: any;
  }
}