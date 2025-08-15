"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

interface Obstacle {
  x: number
  width: number
  height: number
}

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [showMinigame, setShowMinigame] = useState(false)
  const [geometryActive, setGeometryActive] = useState(false)

  // Game state
  const gameState = useRef({
    chris: { x: 50, y: 150, width: 40, height: 40, velocityY: 0, jumping: false },
    obstacles: [] as Obstacle[],
    gameSpeed: 3,
    lastObstacle: 0,
    animationFrame: 0,
  })

  useEffect(() => {
    const savedHighScore = localStorage.getItem("chris-star-high-score")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setGeometryActive(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = "#111827"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const state = gameState.current

      // Update Chris (player)
      if (state.chris.jumping) {
        state.chris.velocityY += 0.8 // gravity
        state.chris.y += state.chris.velocityY

        if (state.chris.y >= 150) {
          state.chris.y = 150
          state.chris.jumping = false
          state.chris.velocityY = 0
        }
      }

      // Draw Chris
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(state.chris.x, state.chris.y, state.chris.width, state.chris.height)

      // Add "CS" text on Chris
      ctx.fillStyle = "#ffffff"
      ctx.font = "16px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("CS", state.chris.x + 20, state.chris.y + 25)

      // Generate obstacles
      if (state.animationFrame - state.lastObstacle > 120) {
        state.obstacles.push({
          x: canvas.width,
          width: 20,
          height: Math.random() > 0.5 ? 40 : 60,
        })
        state.lastObstacle = state.animationFrame
      }

      // Update and draw obstacles
      state.obstacles = state.obstacles.filter((obstacle) => {
        obstacle.x -= state.gameSpeed

        // Draw obstacle
        ctx.fillStyle = "#ef4444"
        ctx.fillRect(obstacle.x, 190 - obstacle.height, obstacle.width, obstacle.height)

        // Check collision
        if (
          state.chris.x < obstacle.x + obstacle.width &&
          state.chris.x + state.chris.width > obstacle.x &&
          state.chris.y < 190 - obstacle.height + obstacle.height &&
          state.chris.y + state.chris.height > 190 - obstacle.height
        ) {
          setGameOver(true)
          if (score > highScore) {
            setHighScore(score)
            localStorage.setItem("chris-star-high-score", score.toString())
          }
          return false
        }

        return obstacle.x > -obstacle.width
      })

      // Draw ground
      ctx.fillStyle = "#374151"
      ctx.fillRect(0, 190, canvas.width, 10)

      // Update score
      setScore(Math.floor(state.animationFrame / 10))

      // Increase speed gradually
      state.gameSpeed = 3 + Math.floor(state.animationFrame / 1000) * 0.5

      state.animationFrame++

      if (!gameOver) {
        requestAnimationFrame(gameLoop)
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      const state = gameState.current // Declare the state variable here
      if (e.code === "Space" && !state.chris.jumping) {
        state.chris.jumping = true
        state.chris.velocityY = -15
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    gameLoop()

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [gameStarted, gameOver, score, highScore])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    gameState.current = {
      chris: { x: 50, y: 150, width: 40, height: 40, velocityY: 0, jumping: false },
      obstacles: [],
      gameSpeed: 3,
      lastObstacle: 0,
      animationFrame: 0,
    }
  }

  const handleGeometryClick = () => {
    setShowMinigame(!showMinigame)
  }

  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Sacred geometry background inspired by Destiny 2 */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
                linear-gradient(0deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
                linear-gradient(45deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px, 50px 50px, 100px 100px, 100px 100px",
            }}
          />
        </div>

        {/* Floating geometric elements */}
        <div className="absolute inset-0 opacity-[0.01]">
          {/* Corner geometric patterns */}
          <div
            className="absolute top-20 left-20 w-40 h-40 border border-slate-300/6"
            style={{
              clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
              animation: "geo-rotate 200s linear infinite",
            }}
          />
          <div
            className="absolute top-20 right-20 w-32 h-32 border border-slate-300/8"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              animation: "geo-rotate 150s linear infinite reverse",
            }}
          />
          <div
            className="absolute bottom-20 left-20 w-36 h-36 border border-slate-300/4"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              animation: "geo-pulse 180s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-20 right-20 w-28 h-28 border border-slate-300/7"
            style={{
              clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
              animation: "geo-rotate 120s linear infinite",
            }}
          />
        </div>

        {/* Scanning effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-300/3 to-transparent"
            style={{
              animation: "geo-scan 120s linear infinite",
            }}
          />
          <div
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-slate-300/2 to-transparent"
            style={{
              animation: "geo-scan-vertical 140s linear infinite",
              animationDelay: "30s",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Error code with geometric styling */}
          <div className="mb-16">
            <div className="relative mb-8">
              <h1
                className="font-sans font-light text-8xl md:text-9xl text-white tracking-[0.2em] relative z-20"
                style={{
                  textShadow: "0 0 40px rgba(148, 163, 184, 0.1), 0 0 80px rgba(148, 163, 184, 0.05)",
                  filter: "drop-shadow(0 0 12px rgba(148, 163, 184, 0.08))",
                }}
              >
                4⟨0⟩4
              </h1>

              {/* Geometric frame around 404 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-96 h-32">
                  <div
                    className="absolute inset-0 border border-slate-300/8 rounded-lg"
                    style={{
                      clipPath:
                        "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)",
                    }}
                  />
                  <div
                    className="absolute -top-1 -left-1 w-8 h-8 border-t border-l border-slate-300/12"
                    style={{ clipPath: "polygon(0 0, 100% 0, 75% 25%, 25% 25%, 25% 75%, 0 100%)" }}
                  />
                  <div
                    className="absolute -top-1 -right-1 w-8 h-8 border-t border-r border-slate-300/12"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 75% 75%, 25% 75%, 25% 25%)" }}
                  />
                  <div
                    className="absolute -bottom-1 -left-1 w-8 h-8 border-b border-l border-slate-300/12"
                    style={{ clipPath: "polygon(0 0, 25% 25%, 25% 75%, 75% 75%, 100% 100%, 0 100%)" }}
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-8 h-8 border-b border-r border-slate-300/12"
                    style={{ clipPath: "polygon(25% 25%, 75% 25%, 75% 75%, 100% 100%, 100% 0, 0 0)" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />
              <div
                className="mx-6 px-8 py-3 border border-red-400/25 bg-gradient-to-r from-red-400/8 to-red-500/8 backdrop-blur-sm"
                style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
              >
                <span className="text-red-300/95 font-sans text-sm tracking-[0.2em] font-light">
                  ◊ NAVIGATION ERROR ◊
                </span>
              </div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />
            </div>

            <h2 className="font-sans font-medium text-2xl md:text-3xl text-slate-200 mb-6 tracking-wide">
              DESTINATION NOT FOUND
            </h2>
            <p className="font-sans text-lg text-slate-300/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              The coordinates you've entered do not correspond to any known location in our star chart. While our
              navigation systems recalibrate, perhaps you'd like to engage the entertainment protocols?
            </p>
          </div>

          {/* Central geometric mandala - main interactive element */}
          <div className="mb-16 flex items-center justify-center">
            <div className="relative">
              {/* Large central geometric pattern */}
              <div
                className={`relative cursor-pointer transition-all duration-1000 ${geometryActive ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                onClick={handleGeometryClick}
              >
                <div className="relative w-80 h-80 group">
                  {/* Outer orbital rings */}
                  <div
                    className="absolute inset-0 border border-slate-300/15 rounded-full group-hover:border-slate-300/25 transition-all duration-700"
                    style={{
                      animation: "geo-rotate 80s linear infinite",
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 25%, 75% 25%, 75% 75%, 100% 75%, 100% 100%, 0% 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-4 border border-slate-300/20 rounded-full group-hover:border-slate-300/30 transition-all duration-700"
                    style={{
                      animation: "geo-rotate 60s linear infinite reverse",
                      clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 25% 75%)",
                    }}
                  />
                  <div
                    className="absolute inset-8 border border-slate-300/12 rounded-full group-hover:border-slate-300/22 transition-all duration-700"
                    style={{
                      animation: "geo-rotate 100s linear infinite",
                      clipPath: "polygon(0% 0%, 75% 0%, 75% 25%, 25% 25%, 25% 75%, 75% 75%, 75% 100%, 0% 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-12 border border-slate-300/18 rounded-full group-hover:border-slate-300/28 transition-all duration-700"
                    style={{
                      animation: "geo-rotate 40s linear infinite reverse",
                      clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)",
                    }}
                  />

                  {/* Radial lines creating sacred geometry */}
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-40 h-px bg-slate-300/8 group-hover:bg-slate-300/15 origin-left transition-all duration-700"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                      }}
                    />
                  ))}

                  {/* Central hexagonal pattern */}
                  <div
                    className="absolute top-1/2 left-1/2 w-32 h-32 border border-slate-300/25 group-hover:border-slate-300/40 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                    style={{
                      clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                      animation: "geo-rotate 120s linear infinite",
                    }}
                  />

                  {/* Inner triangular elements */}
                  <div
                    className="absolute top-1/2 left-1/2 w-16 h-16 border border-slate-300/30 group-hover:border-slate-300/45 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                      animation: "geo-rotate 200s linear infinite reverse",
                    }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 w-16 h-16 border border-slate-300/30 group-hover:border-slate-300/45 transform -translate-x-1/2 -translate-y-1/2 rotate-180 transition-all duration-700"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                      animation: "geo-rotate 200s linear infinite",
                    }}
                  />

                  {/* Orbital elements */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-slate-300/20 group-hover:bg-slate-300/35 rounded-full transition-all duration-700"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-140px)`,
                        animation: `geo-orbit ${150 + i * 25}s linear infinite`,
                      }}
                    />
                  ))}

                  {/* Central core */}
                  <div
                    className="absolute top-1/2 left-1/2 w-6 h-6 bg-slate-300/30 group-hover:bg-slate-300/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                    style={{ animation: "geo-pulse 8s ease-in-out infinite" }}
                  />

                  {/* Hover indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-slate-300/80 font-sans text-sm tracking-wider">◊ ACTIVATE PROTOCOLS ◊</div>
                  </div>
                </div>
              </div>

              {/* Status indicators around the mandala */}
              <div
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${geometryActive ? "opacity-100 translate-y-0 delay-1500" : "opacity-0 translate-y-4"}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-cyan-400/80 shadow-sm shadow-cyan-400/20"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      animation: "pulse 3s ease-in-out infinite",
                    }}
                  />
                  <span className="text-cyan-300/90 text-xs font-sans tracking-wider font-light">
                    ENTERTAINMENT PROTOCOLS AVAILABLE
                  </span>
                </div>
              </div>

              <div
                className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${geometryActive ? "opacity-100 translate-y-0 delay-1700" : "opacity-0 -translate-y-4"}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-amber-400/80 shadow-sm shadow-amber-400/20"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      animation: "pulse 4s ease-in-out infinite",
                      animationDelay: "1s",
                    }}
                  />
                  <span className="text-amber-300/90 text-xs font-sans tracking-wider font-light">CLICK TO ENGAGE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minigame section - revealed when geometry is clicked */}
          <div
            className={`transition-all duration-1000 overflow-hidden ${showMinigame ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div
              className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700/50"
              style={{
                clipPath:
                  "polygon(32px 0%, calc(100% - 32px) 0%, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0% calc(100% - 32px), 0% 32px)",
              }}
            >
              {/* Game header with geometric styling */}
              <div className="mb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-300/25 to-transparent" />
                  <div
                    className="mx-6 px-8 py-3 border border-slate-300/20 bg-gradient-to-r from-slate-400/8 to-slate-400/8 backdrop-blur-sm"
                    style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
                  >
                    <span className="text-slate-300 font-sans text-xs tracking-[0.25em] font-light">
                      ◊ ENTERTAINMENT PROTOCOL ACTIVE ◊
                    </span>
                  </div>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-300/25 to-transparent" />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-sans">
                    <span className="text-lg tracking-wide">SCORE: {score}</span>
                  </div>
                  <div className="text-amber-400 font-sans">
                    <span className="text-lg tracking-wide">HIGH SCORE: {highScore}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={200}
                  className="border border-gray-600/50 rounded-2xl bg-gray-900 max-w-full"
                />

                {!gameStarted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-2xl backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌟</div>
                      <h3 className="font-sans font-bold text-2xl text-white mb-4 tracking-wide">CHRIS STAR RUNNER</h3>
                      <p className="font-sans text-gray-300 mb-6">Press SPACE to jump over obstacles!</p>
                      <button
                        onClick={startGame}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg font-sans font-bold hover:bg-amber-700 transition-colors duration-300"
                        style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
                      >
                        INITIATE PROTOCOL
                      </button>
                    </div>
                  </div>
                )}

                {gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 rounded-2xl backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-4xl mb-4">💫</div>
                      <h3 className="font-sans font-bold text-2xl text-white mb-2 tracking-wide">
                        PROTOCOL TERMINATED
                      </h3>
                      <p className="font-sans text-gray-300 mb-4">Final Score: {score}</p>
                      {score > highScore && (
                        <p className="font-sans text-amber-400 mb-4">🎉 New High Score Achieved!</p>
                      )}
                      <button
                        onClick={startGame}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg font-sans font-bold hover:bg-amber-700 transition-colors duration-300"
                        style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
                      >
                        RESTART PROTOCOL
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-400 font-sans text-center tracking-wide">
                Use SPACEBAR to jump • Avoid the red obstacles • Beat your high score!
              </div>
            </div>
          </div>

          {/* Navigation with geometric styling */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <Link
              href="/"
              className="bg-amber-600/90 text-white px-10 py-4 rounded-xl font-sans font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-amber-500/30"
              style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
            >
              ▶ RETURN TO BASE
            </Link>
            <Link
              href="/community"
              className="border-2 border-amber-400/60 text-amber-400 px-10 py-4 rounded-xl font-sans font-bold text-lg hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-300 backdrop-blur-sm"
              style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
            >
              ◊ JOIN ALLIANCE
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
