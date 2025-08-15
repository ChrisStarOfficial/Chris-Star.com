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

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="font-sans font-bold text-6xl md:text-8xl text-white mb-8 tracking-tight">404</h1>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-amber-400 mb-8 tracking-tight">
            Page Not Found
          </h2>
          <p className="font-sans text-xl text-gray-300 mb-12 leading-relaxed">
            Looks like you've wandered into uncharted territory. While you're here, why not play a quick game?
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white font-sans">
                <span className="text-lg">Score: {score}</span>
              </div>
              <div className="text-amber-400 font-sans">
                <span className="text-lg">High Score: {highScore}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="border border-gray-600 rounded-lg bg-gray-900 max-w-full"
            />

            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌟</div>
                  <h3 className="font-sans font-bold text-2xl text-white mb-4">Chris Star Runner</h3>
                  <p className="font-sans text-gray-300 mb-6">Press SPACE to jump over obstacles!</p>
                  <button
                    onClick={startGame}
                    className="bg-amber-600 text-white px-8 py-3 rounded-lg font-sans font-bold hover:bg-amber-700 transition-colors duration-300"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">💫</div>
                  <h3 className="font-sans font-bold text-2xl text-white mb-2">Game Over!</h3>
                  <p className="font-sans text-gray-300 mb-4">Final Score: {score}</p>
                  {score > highScore && <p className="font-sans text-amber-400 mb-4">🎉 New High Score!</p>}
                  <button
                    onClick={startGame}
                    className="bg-amber-600 text-white px-8 py-3 rounded-lg font-sans font-bold hover:bg-amber-700 transition-colors duration-300 mr-4"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-400 font-sans">
            Use SPACEBAR to jump • Avoid the red obstacles • Beat your high score!
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link
            href="/"
            className="bg-amber-600 text-white px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg"
          >
            Return Home
          </Link>
          <Link
            href="/community"
            className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-sans font-bold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
          >
            Join Community
          </Link>
        </div>
      </div>
    </main>
  )
}
