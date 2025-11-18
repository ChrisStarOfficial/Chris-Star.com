"use client";

import React, { useEffect, useRef, useState, useCallback } from "react"; // Import useCallback
import styles from "@/public/games/bull-run-2d/BullRun2D.module.css";
import useBullRun2D from "@/components/shared/hooks/useBullRun2D";

export type BullRun2DProps = {
  onScoreUpdate?: (score: number) => void;
  onHighScoreUpdate?: (highScore: number) => void;
  initialHighScore?: number;
  width?: number;
  height?: number;
};

export default function BullRun2D({
  onScoreUpdate,
  onHighScoreUpdate,
  initialHighScore = 0,
  width = 600,
  height = 150,
}: BullRun2DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(initialHighScore);
  const [running, setRunning] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);

  // *** NEW: Memoize callbacks to stabilize the hook's props ***
  const onScoreCallback = useCallback((s: number) => {
    setScore(s);
    onScoreUpdate?.(s);
  }, [onScoreUpdate]);

  const onHighScoreCallback = useCallback((h: number) => {
    setHighScore(h);
    onHighScoreUpdate?.(h);
  }, [onHighScoreUpdate]);

  const onGameOverCallback = useCallback(() => {
    setRunning(false);
  }, []);

  const onStartCallback = useCallback(() => {
    setShowStartOverlay(false);
  }, []);
  // *********************************************************

  const api = useBullRun2D({
    canvasRef,
    width,
    height,
    onScore: onScoreCallback, // Use memoized callback
    onHighScore: onHighScoreCallback, // Use memoized callback
    onGameOver: onGameOverCallback, // Use memoized callback
    onStart: onStartCallback, // Use memoized callback
  });

  // keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!running) {
          api.start(); // This will auto-reset if dead
          setRunning(true);
        }
        api.jump();
        setShowStartOverlay(false);
      }
      if (e.code === "ArrowDown" || e.key === "ArrowDown") {
        api.crouch();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.key === "ArrowDown") {
        api.uncrouch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // *** FIXED: Add `api` to dependency array ***
  }, [running, api]);

  // mouse / click to jump
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const handleClick = () => {
      if (!running) {
        api.start(); // This will auto-reset if dead
        setRunning(true);
        setShowStartOverlay(false);
      } else {
        api.jump();
      }
    };
    c.addEventListener("pointerdown", handleClick);
    return () => {
      c.removeEventListener("pointerdown", handleClick);
    };
  }, [running, api]); // This one was correct

  // Pause / resume buttons (optional)
  const toggleRunning = () => {
    if (running) {
      api.pause();
      setRunning(false);
    } else {
      api.start();
      setRunning(true);
    }
  };

  return (
    <div className={styles.container} style={{ width: "100%", maxWidth: 900 }}>
      <div className={styles.header}>
        <div className={styles.scoreBox}>
          <div className={styles.scoreLabel}>SCORE</div>
          <div className={styles.scoreValue}>{score}</div>
        </div>
        <div className={styles.highScoreBox}>
          <div className={styles.scoreLabel}>HIGH</div>
          <div className={styles.scoreValue}>{highScore}</div>
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={styles.runnerCanvas}
          width={width}
          height={height}
        />
        {/* Start overlay */}
        {showStartOverlay && (
          <div
            className={styles.overlay}
            onClick={() => {
              api.start();
              setRunning(true);
              setShowStartOverlay(false);
            }}
          >
            <div className={styles.overlayText}>PRESS SPACE TO START</div>
            <div className={styles.overlayHint}>
              (Space / Click to jump, Down to crouch)
            </div>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.btn}
          onClick={() => {
            api.jump();
            // No need to setRunning(true) here, jump will start if not running
          }}
        >
          JUMP
        </button>
        <button className={styles.btn} onPointerDown={() => api.crouch()} onPointerUp={() => api.uncrouch()}>
          CROUCH
        </button>
        <button className={styles.btnSecondary} onClick={toggleRunning}>
          {running ? "PAUSE" : "RESUME"}
        </button>
      </div>

      <div className={styles.hint}>
        <small>
          Tip: press <b>Space</b> to start and jump. Use <b>Down Arrow</b> to
          crouch.
        </small>
      </div>
    </div>
  );
}