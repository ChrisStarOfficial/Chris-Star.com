"use client"

import { useEffect, useRef, useState } from "react"

interface Obstacle {
  x: number
  width: number
  height: number
}

interface BullRunProps {
  onScoreUpdate?: (score: number) => void
  onHighScoreUpdate?: (highScore: number) => void
  initialHighScore?: number
}

export default function BullRun({ onScoreUpdate, onHighScoreUpdate, initialHighScore = 0 }: BullRunProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(initialHighScore)

  // Game state
  const gameState = useRef({
    chris: { x: 50, y: 150, width: 40, height: 40, velocityY: 0, jumping: false },
    obstacles: [] as Obstacle[],
    gameSpeed: 2,
    lastObstacle: 0,
    animationFrame: 0,
    time: 0,
    msPerFrame: 1000 / 60,
    currentSpeed: 2,
    distanceRan: 0,
  })

  useEffect(() => {
    const savedHighScore = localStorage.getItem("chris-star-high-score")
    if (savedHighScore) {
      const parsedScore = Number.parseInt(savedHighScore)
      setHighScore(parsedScore)
      onHighScoreUpdate?.(parsedScore)
    }
  }, [onHighScoreUpdate])

  useEffect(() => {
    onScoreUpdate?.(score)
  }, [score, onScoreUpdate])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const gameLoop = (timestamp: number) => {
      if (gameOver) return

      const state = gameState.current
      const deltaTime = timestamp - (state.time || timestamp)
      state.time = timestamp

      // Clear canvas with enhanced geometric background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0f172a")
      gradient.addColorStop(0.5, "#1e293b")
      gradient.addColorStop(1, "#0f172a")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(148, 163, 184, 0.05)"
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Update Chris (player) with improved physics
      if (state.chris.jumping) {
        state.chris.velocityY += 0.6
        state.chris.y += state.chris.velocityY

        if (state.chris.y >= 150) {
          state.chris.y = 150
          state.chris.jumping = false
          state.chris.velocityY = 0
        }
      }

      const chrisGradient = ctx.createRadialGradient(
        state.chris.x + 20,
        state.chris.y + 20,
        0,
        state.chris.x + 20,
        state.chris.y + 20,
        30,
      )
      chrisGradient.addColorStop(0, "#fbbf24")
      chrisGradient.addColorStop(1, "#f59e0b")
      ctx.fillStyle = chrisGradient
      ctx.fillRect(state.chris.x, state.chris.y, state.chris.width, state.chris.height)

      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.shadowColor = "#fbbf24"
      ctx.shadowBlur = 8
      ctx.strokeRect(state.chris.x, state.chris.y, state.chris.width, state.chris.height)
      ctx.shadowBlur = 0

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px 'Courier New', monospace"
      ctx.textAlign = "center"
      ctx.shadowColor = "#000000"
      ctx.shadowBlur = 2
      ctx.fillText("CS", state.chris.x + 20, state.chris.y + 25)
      ctx.shadowBlur = 0

      const obstacleGap = Math.max(200, 300 - Math.floor(state.distanceRan / 1000) * 20)
      if (state.animationFrame - state.lastObstacle > obstacleGap / state.currentSpeed) {
        state.obstacles.push({
          x: canvas.width,
          width: 20,
          height: Math.random() > 0.5 ? 40 : 60,
        })
        state.lastObstacle = state.animationFrame
      }

      // Update and draw obstacles with enhanced design
      state.obstacles = state.obstacles.filter((obstacle) => {
        obstacle.x -= state.currentSpeed

        const obstacleGradient = ctx.createLinearGradient(
          obstacle.x,
          190 - obstacle.height,
          obstacle.x + obstacle.width,
          190,
        )
        obstacleGradient.addColorStop(0, "#ef4444")
        obstacleGradient.addColorStop(1, "#dc2626")
        ctx.fillStyle = obstacleGradient
        ctx.fillRect(obstacle.x, 190 - obstacle.height, obstacle.width, obstacle.height)

        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1
        ctx.shadowColor = "#ef4444"
        ctx.shadowBlur = 4
        ctx.strokeRect(obstacle.x, 190 - obstacle.height, obstacle.width, obstacle.height)
        ctx.shadowBlur = 0

        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1
        const centerX = obstacle.x + obstacle.width / 2
        const centerY = 190 - obstacle.height / 2
        ctx.beginPath()
        ctx.moveTo(centerX, 190 - obstacle.height)
        ctx.lineTo(centerX, 190)
        ctx.moveTo(obstacle.x, centerY)
        ctx.lineTo(obstacle.x + obstacle.width, centerY)
        ctx.stroke()

        if (
          state.chris.x + 5 < obstacle.x + obstacle.width - 5 &&
          state.chris.x + state.chris.width - 5 > obstacle.x + 5 &&
          state.chris.y + 5 < 190 - obstacle.height + obstacle.height - 5 &&
          state.chris.y + state.chris.height - 5 > 190 - obstacle.height + 5
        ) {
          setGameOver(true)
          if (score > highScore) {
            const newHighScore = score
            setHighScore(newHighScore)
            localStorage.setItem("chris-star-high-score", newHighScore.toString())
            onHighScoreUpdate?.(newHighScore)
          }
          return false
        }

        return obstacle.x > -obstacle.width
      })

      const groundGradient = ctx.createLinearGradient(0, 190, 0, 200)
      groundGradient.addColorStop(0, "#374151")
      groundGradient.addColorStop(1, "#1f2937")
      ctx.fillStyle = groundGradient
      ctx.fillRect(0, 190, canvas.width, 10)

      ctx.strokeStyle = "#4b5563"
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 190)
        ctx.lineTo(i, 200)
        ctx.stroke()
      }

      if (!gameOver) {
        state.distanceRan += (state.currentSpeed * deltaTime) / state.msPerFrame
        const newScore = Math.floor(state.distanceRan * 0.025)
        setScore(newScore)

        if (state.currentSpeed < 8) {
          state.currentSpeed = Math.min(2 + Math.floor(state.distanceRan / 1000) * 0.001, 8)
        }
      }

      state.animationFrame++

      if (!gameOver) {
        animationId = requestAnimationFrame(gameLoop)
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      const state = gameState.current
      if ((e.code === "Space" || e.key === " ") && !state.chris.jumping && !gameOver) {
        state.chris.jumping = true
        state.chris.velocityY = -15
        e.preventDefault()
      }
    }

    const handleClick = () => {
      const state = gameState.current
      if (!state.chris.jumping && !gameOver) {
        state.chris.jumping = true
        state.chris.velocityY = -15
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    canvas.addEventListener("click", handleClick)
    animationId = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      canvas.removeEventListener("click", handleClick)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [gameStarted, gameOver, score, highScore, onHighScoreUpdate])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    gameState.current = {
      chris: { x: 50, y: 150, width: 40, height: 40, velocityY: 0, jumping: false },
      obstacles: [],
      gameSpeed: 2,
      lastObstacle: 0,
      animationFrame: 0,
      time: 0,
      msPerFrame: 1000 / 60,
      currentSpeed: 2,
      distanceRan: 0,
    }
  }

  return (
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
          className="border border-gray-600/50 rounded-2xl bg-gray-900 max-w-full cursor-pointer"
        />

        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-2xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="font-sans font-bold text-2xl text-white mb-4 tracking-wide">Bull Run</h3>
              <p className="font-sans text-gray-300 mb-6">Press SPACE or click to jump over obstacles!</p>
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
              <h3 className="font-sans font-bold text-2xl text-white mb-2 tracking-wide">PROTOCOL TERMINATED</h3>
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
        Use SPACEBAR or CLICK to jump • Avoid the red obstacles • Beat your high score!
      </div>
    </div>
  )
}