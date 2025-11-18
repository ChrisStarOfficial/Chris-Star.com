import { MutableRefObject, useRef, useCallback, useMemo, useEffect } from "react"; // Import new hooks

/**
 * BullRun2D — Finalized T-Rex Runner port.
 * - Uses sprite sheet under /game
 * - Adds crouch, death pose, clouds, birds, checkpoint sound
 * - Exposes API: start, stop, reset, jump, crouch, uncrouch, pause, destroy
 */

// --- Sprite Coordinate Definitions ---
// (No changes here... sprite definitions are correct)
// Based on original index.js (LDPI)
const LDPI_COORDS = {
  TREX: { x: 848, y: 2, w: 44, h: 47 },
  TREX_RUN: [
    { x: 936, y: 2, w: 44, h: 47 }, // 848 + 88
    { x: 980, y: 2, w: 44, h: 47 }, // 848 + 132
  ],
  TREX_CROUCH: [
    { x: 1112, y: 2, w: 59, h: 25 }, // 848 + 264
    { x: 1171, y: 2, w: 59, h: 25 }, // 848 + 323
  ],
  TREX_JUMP: { x: 848, y: 2, w: 44, h: 47 }, // 848 + 0
  TREX_DEAD: { x: 1068, y: 2, w: 44, h: 47 }, // 848 + 220
  CACTUS_SMALL: [
    { x: 228, y: 2, w: 17, h: 35 }, // 1
    { x: 245, y: 2, w: 34, h: 35 }, // 2
    { x: 279, y: 2, w: 51, h: 35 }, // 3
  ],
  CACTUS_LARGE: [
    { x: 332, y: 2, w: 25, h: 50 }, // 1
    { x: 357, y: 2, w: 50, h: 50 }, // 2
    { x: 407, y: 2, w: 75, h: 50 }, // 3
  ],
  BIRD: [
    { x: 134, y: 2, w: 46, h: 40 },
    { x: 180, y: 2, w: 46, h: 40 }, // 134 + 46
  ],
  CLOUD: { x: 86, y: 2, w: 46, h: 14 },
  GROUND: { x: 2, y: 54, w: 600, h: 12 },
  RESTART: { x: 2, y: 2, w: 36, h: 32 },
};

// Based on original index.js (HDPI)
const HDPI_COORDS = {
  TREX: { x: 1678, y: 2, w: 88, h: 94 },
  TREX_RUN: [
    { x: 1854, y: 2, w: 88, h: 94 }, // 1678 + 176 (88*2)
    { x: 1942, y: 2, w: 88, h: 94 }, // 1678 + 264 (132*2)
  ],
  TREX_CROUCH: [
    { x: 2206, y: 2, w: 118, h: 50 }, // 1678 + 528 (264*2)
    { x: 2324, y: 2, w: 118, h: 50 }, // 1678 + 646 (323*2)
  ],
  TREX_JUMP: { x: 1678, y: 2, w: 88, h: 94 }, // 1678 + 0
  TREX_DEAD: { x: 2118, y: 2, w: 88, h: 94 }, // 1678 + 440 (220*2)
  CACTUS_SMALL: [
    { x: 446, y: 2, w: 34, h: 70 },
    { x: 480, y: 2, w: 68, h: 70 },
    { x: 548, y: 2, w: 102, h: 70 },
  ],
  CACTUS_LARGE: [
    { x: 652, y: 2, w: 50, h: 100 },
    { x: 702, y: 2, w: 100, h: 100 },
    { x: 802, y: 2, w: 150, h: 100 },
  ],
  BIRD: [
    { x: 260, y: 2, w: 92, h: 80 },
    { x: 352, y: 2, w: 92, h: 80 }, // 260 + 92
  ],
  CLOUD: { x: 166, y: 2, w: 92, h: 28 },
  GROUND: { x: 2, y: 104, w: 1200, h: 24 },
  RESTART: { x: 2, y: 2, w: 72, h: 64 }, // This is 2x { x: 2, y: 2, w: 36, h: 32 }
};
// --- End Sprite Definitions ---

type SpriteCoords = typeof LDPI_COORDS;

type HookOptions = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  width?: number;
  height?: number;
  onScore?: (score: number) => void;
  onHighScore?: (highScore: number) => void;
  onGameOver?: () => void;
  onStart?: () => void;
};

type HookAPI = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  jump: () => void;
  crouch: () => void;
  uncrouch: () => void;
  pause: () => void;
  destroy: () => void;
};

export default function useBullRun2D(opts: HookOptions): HookAPI {
  const {
    canvasRef,
    width = 600,
    height = 150,
    onScore,
    onHighScore,
    onGameOver,
    onStart,
  } = opts;

  // Game constants
  const GRAVITY = 0.6;
  const JUMP_VEL = -10;
  const GROUND_Y = height - 20;
  const CHECKPOINT_INTERVAL = 100;
  const FPS = 60;
  const MS_PER_FRAME = 1000 / FPS;
  const ACCELERATION = 0.001;
  const MAX_SPEED = 13;
  const SCORE_COEFFICIENT = 0.025; // From original game config

  // state refs
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const deadRef = useRef(false);
  const crouchingRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  const distanceRef = useRef(0);
  const groundOffsetRef = useRef(0);
  const lastScoreRampRef = useRef(0);

  const highScoreRef = useRef(0);
  const playerYRef = useRef(GROUND_Y);
  const playerVRef = useRef(0);
  const frameRef = useRef(0);
  const frameTimerRef = useRef(0);
  const obstaclesRef = useRef<
    { x: number; w: number; h: number; spriteX: number; spriteW: number }[]
  >([]);
  const speedRef = useRef(6);
  const spawnTimerRef = useRef(0);

  // clouds & birds
  const cloudsRef = useRef<{ x: number; y: number; w: number; speed: number }[]>(
    []
  );
  const birdsRef = useRef<
    { x: number; y: number; w: number; h: number; frame: number }[]
  >([]);
  const cloudSpawnTimer = useRef(0);
  const birdSpawnTimer = useRef(0);

  // day/night
  const dayNightRef = useRef(0); // 0 day, 1 night
  const dayTimerRef = useRef(0);

  // checkpoint sound gate
  const checkpointPlayedRef = useRef(false);

  // assets
  const spriteRef = useRef(new Image());
  const soundJumpRef = useRef(new Audio());
  const soundHitRef = useRef(new Audio());
  const soundCheckpointRef = useRef(new Audio());
  const coordsRef = useRef<SpriteCoords>(LDPI_COORDS); // Default to LDPI
  const isHiDPIRef = useRef(false);

  // *** NEW: Store callbacks in refs to keep API stable ***
  const onScoreRef = useRef(onScore);
  const onHighScoreRef = useRef(onHighScore);
  const onGameOverRef = useRef(onGameOver);
  const onStartRef = useRef(onStart);

  // Update refs when props change
  useEffect(() => {
    onScoreRef.current = onScore;
    onHighScoreRef.current = onHighScore;
    onGameOverRef.current = onGameOver;
    onStartRef.current = onStart;
  }, [onScore, onHighScore, onGameOver, onStart]);
  // ******************************************************


  // helpers
  const rectsIntersect = useCallback((a: any, b: any) => {
    return !(
      a.x + a.w < b.x ||
      a.x > b.x + b.w ||
      a.y + a.h < b.y ||
      a.y > b.y + b.h
    );
  }, []);

  // spawn cloud
  const spawnCloud = useCallback(() => {
    const coords = coordsRef.current;
    const y = 20 + Math.random() * 40;
    const speed = 0.3 + Math.random() * 0.6;
    cloudsRef.current.push({
      x: width + coords.CLOUD.w,
      y,
      w: coords.CLOUD.w,
      speed,
    });
  }, [width]);

  // spawn bird
  const spawnBird = useCallback(() => {
    const coords = coordsRef.current;
    const y = GROUND_Y - 80 - Math.random() * 40;
    birdsRef.current.push({
      x: width + coords.BIRD[0].w,
      y,
      w: coords.BIRD[0].w,
      h: coords.BIRD[0].h,
      frame: 0,
    });
  }, [width]);

  // game over logic
  const gameOver = useCallback(() => {
    deadRef.current = true;
    runningRef.current = false;
    try {
      soundHitRef.current.play().catch(() => {});
    } catch {}
    onGameOverRef.current?.();
  }, []);

  // update logic
  const update = useCallback((dt: number) => {
    if (deadRef.current) return;
    const coords = coordsRef.current;
    
    // Calculate frames elapsed based on 60fps baseline
    const framesElapsed = dt / MS_PER_FRAME;

    // player physics
    playerVRef.current += GRAVITY * framesElapsed; // Scale gravity by frames
    playerYRef.current += playerVRef.current * framesElapsed; // Scale velocity by frames
    if (playerYRef.current > GROUND_Y) {
      playerYRef.current = GROUND_Y;
      playerVRef.current = 0;
    }

    // obstacles
    for (const ob of obstaclesRef.current) {
      ob.x -= speedRef.current * framesElapsed; // Scale movement by frames
    }
    obstaclesRef.current = obstaclesRef.current.filter((o) => o.x + o.w > -50);

    // spawn obstacles (cacti)
    spawnTimerRef.current += dt;
    if (spawnTimerRef.current > 1000 + Math.random() * 1200) {
      spawnTimerRef.current = 0;
      // Choose small or large cactus
      const isSmall = Math.random() > 0.5;
      const cactusGroup = isSmall ? coords.CACTUS_SMALL : coords.CACTUS_LARGE;
      // Choose 1, 2, or 3 cacti
      const spriteIndex = Math.floor(Math.random() * cactusGroup.length);
      const s = cactusGroup[spriteIndex];

      // Get the base height for the chosen type
      const obstacleHeight = isSmall
        ? coords.CACTUS_SMALL[0].h
        : coords.CACTUS_LARGE[0].h;

      obstaclesRef.current.push({
        x: width + 30,
        w: s.w, // The width of the sprite group (e.g., 3 cacti)
        h: obstacleHeight, // The height of a single cactus
        spriteX: s.x,
        spriteW: s.w,
      });
    }

    // clouds
    cloudSpawnTimer.current += dt;
    if (cloudSpawnTimer.current > 2000 + Math.random() * 3000) {
      cloudSpawnTimer.current = 0;
      spawnCloud();
    }
    for (const c of cloudsRef.current) {
      c.x -= c.speed * (speedRef.current / 6) * framesElapsed;
    }
    cloudsRef.current = cloudsRef.current.filter((c) => c.x + c.w > -50);

    // birds
    birdSpawnTimer.current += dt;
    if (birdSpawnTimer.current > 7000 + Math.random() * 8000) {
      birdSpawnTimer.current = 0;
      spawnBird();
    }
    for (const b of birdsRef.current) {
      b.x -= (speedRef.current + 2) * framesElapsed; // Birds move a bit faster
      b.frame = (b.frame + 1) % 2; // Toggle between 0 and 1
    }
    birdsRef.current = birdsRef.current.filter((b) => b.x + b.w > -50);

    // SCORE, DISTANCE, AND GROUND LOGIC
    distanceRef.current += speedRef.current * framesElapsed;
    groundOffsetRef.current -= speedRef.current * framesElapsed;

    const score = Math.floor(distanceRef.current * SCORE_COEFFICIENT);
    onScoreRef.current?.(score);

    if (score > highScoreRef.current) {
      highScoreRef.current = score;
      onHighScoreRef.current?.(highScoreRef.current);
    }
    // ************************************************

    // checkpoint sound
    if (score > 0 && score % CHECKPOINT_INTERVAL === 0) {
      if (!checkpointPlayedRef.current) {
        try {
          soundCheckpointRef.current.play().catch(() => {});
        } catch {}
        checkpointPlayedRef.current = true;
      }
    } else {
      checkpointPlayedRef.current = false;
    }

    // TIGHTENED COLLISION BOXES
    const playerW = crouchingRef.current
      ? coords.TREX_CROUCH[0].w
      : coords.TREX.w;
    const playerH = crouchingRef.current
      ? coords.TREX_CROUCH[0].h
      : coords.TREX.h;
      
    // Shrink the player box to be more forgiving
    const playerRect = {
      x: 40 + 5, // 5px padding left
      y: playerYRef.current - playerH + 4, // 4px padding top
      w: playerW - 10, // 10px total horizontal padding
      h: playerH - 8, // 8px total vertical padding
    };

    // Check cacti
    for (const ob of obstaclesRef.current) {
      // Shrink the cactus box
      const obRect = {
        x: ob.x + 2, // 2px padding left
        y: GROUND_Y - ob.h + 2, // 2px padding top
        w: ob.w - 4, // 4px total horizontal padding
        h: ob.h - 4, // 4px total vertical padding
      };
      if (rectsIntersect(playerRect, obRect)) {
        gameOver();
        return; // Stop update
      }
    }
    // Check birds
    for (const b of birdsRef.current) {
       // Shrink the bird box
      const birdRect = {
        x: b.x + 6, // 6px padding left
        y: b.y + 8, // 8px padding top
        w: b.w - 12, // 12px total horizontal padding
        h: b.h - 16, // 16px total vertical padding
      };
      if (rectsIntersect(playerRect, birdRect)) {
        gameOver();
        return; // Stop update
      }
    }
    // *************************************

    // animate running/crouching
    frameTimerRef.current += dt;
    if (frameTimerRef.current > 100) { // 100ms per anim frame
      frameTimerRef.current = 0;
      frameRef.current = (frameRef.current + 1) % 2;
    }

    // NEW/FIXED SPEED RAMP
    // Use acceleration logic from original game
    if (speedRef.current < MAX_SPEED) {
      speedRef.current += ACCELERATION * framesElapsed;
    }
    // ******************************

    // day/night
    dayTimerRef.current += dt;
    if (dayTimerRef.current > 20000) { // 20 seconds per cycle
      dayTimerRef.current = 0;
      dayNightRef.current = 1 - dayNightRef.current;
    }
  }, [gameOver, rectsIntersect, spawnBird, spawnCloud, width]);

  // render logic
  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    const coords = coordsRef.current;
    const sprite = spriteRef.current;

    // Don't render if sprite isn't loaded yet
    if (!sprite || !sprite.complete || sprite.naturalHeight === 0) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    // background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dayNightRef.current === 0 ? "#f3f3f3" : "#121212";
    ctx.fillRect(0, 0, width, height);

    // clouds (real sprite)
    for (const c of cloudsRef.current) {
      ctx.drawImage(
        sprite,
        coords.CLOUD.x,
        coords.CLOUD.y,
        coords.CLOUD.w,
        coords.CLOUD.h,
        c.x,
        c.y,
        coords.CLOUD.w,
        coords.CLOUD.h
      );
    }

    // NEW/FIXED GROUND RENDER (2-PART LOOP)
    const ground = coords.GROUND;
    const groundX = groundOffsetRef.current % ground.w;
    
    // First draw
    ctx.drawImage(
      sprite,
      ground.x,
      ground.y,
      ground.w,
      ground.h,
      groundX,
      GROUND_Y,
      ground.w,
      ground.h
    );
    // Second draw (for looping)
    ctx.drawImage(
      sprite,
      ground.x,
      ground.y,
      ground.w,
      ground.h,
      groundX + ground.w, // Positioned right after the first
      GROUND_Y,
      ground.w,
      ground.h
    );
    // *******************************************


    // obstacles (cacti)
    for (const ob of obstaclesRef.current) {
      ctx.drawImage(
        sprite,
        ob.spriteX,
        coords.CACTUS_SMALL[0].y, // Y is always 2 (or 2*ratio)
        ob.spriteW,
        ob.h,
        ob.x,
        GROUND_Y - ob.h,
        ob.w,
        ob.h
      );
    }

    // birds (real sprite)
    for (const b of birdsRef.current) {
      const birdFrame = coords.BIRD[b.frame]; // Get frame 0 or 1
      ctx.drawImage(
        sprite,
        birdFrame.x,
        birdFrame.y,
        birdFrame.w,
        birdFrame.h,
        b.x,
        b.y,
        birdFrame.w,
        birdFrame.h
      );
    }

    // player (dino)
    let frame;
    // Use frameRef for animations, which ticks 0, 1, 0, 1...
    const animFrame = frameRef.current;

    if (deadRef.current) {
      frame = coords.TREX_DEAD;
    } else if (crouchingRef.current) {
      frame = coords.TREX_CROUCH[animFrame];
    } else if (playerYRef.current < GROUND_Y) {
      frame = coords.TREX_JUMP;
    } else {
      frame = coords.TREX_RUN[animFrame];
    }

    const drawW = frame.w;
    const drawH = frame.h;
    const drawX = 40;
    const drawY = playerYRef.current - drawH;

    ctx.drawImage(
      sprite,
      frame.x,
      frame.y,
      frame.w,
      frame.h,
      drawX,
      drawY,
      drawW,
      drawH
    );

    // SCORE/HI-SCORE RENDER (values are now correct)
    const score = Math.floor(distanceRef.current * SCORE_COEFFICIENT);
    ctx.fillStyle = dayNightRef.current === 0 ? "#555" : "#ddd";
    ctx.font = "14px monospace";
    ctx.textAlign = "right";
    ctx.fillText(score.toString().padStart(5, "0"), width - 10, 20);
    ctx.fillText(
      `HI ${highScoreRef.current.toString().padStart(5, "0")}`,
      width - 120,
      20
    );

    // Game Over Panel (drawn on canvas)
    if (deadRef.current) {
      const restart = coords.RESTART;

      // Semi-transparent overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, width, height);

      // "GAME OVER" text
      ctx.fillStyle = dayNightRef.current === 0 ? "#555" : "#ddd";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", width / 2, height / 2 - 20);

      // Draw restart button sprite
      const btnX = width / 2 - restart.w / 2;
      const btnY = height / 2;
      ctx.drawImage(
        sprite,
        restart.x,
        restart.y,
        restart.w,
        restart.h,
        btnX,
        btnY,
        restart.w,
        restart.h
      );
    }
  }, [height, width]);

  // RAF loop
  const loop = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!lastTimeRef.current) lastTimeRef.current = ts;
    const dt = ts - lastTimeRef.current;
    lastTimeRef.current = ts;

    if (runningRef.current) update(dt);
    render(ctx); // Render ALWAYS, even if paused or dead

    rafRef.current = requestAnimationFrame(loop);
  }, [render, update]);

  // api
  const reset = useCallback(() => {
    // RESET NEW/FIXED REFS
    distanceRef.current = 0;
    groundOffsetRef.current = 0;
    lastScoreRampRef.current = 0;
    onScoreRef.current?.(0); // Explicitly reset score in UI
    // **************************

    obstaclesRef.current = [];
    cloudsRef.current = [];
    birdsRef.current = [];
    speedRef.current = 6;
    playerYRef.current = GROUND_Y;
    playerVRef.current = 0;
    spawnTimerRef.current = 0;
    frameRef.current = 0;
    frameTimerRef.current = 0;
    dayNightRef.current = 0;
    dayTimerRef.current = 0;
    deadRef.current = false;
    crouchingRef.current = false;
    checkpointPlayedRef.current = false;
  }, []);

  const start = useCallback(() => {
    if (deadRef.current) {
      // if dead, reset before start
      reset();
    }
    if (runningRef.current) return;
    runningRef.current = true;
    lastTimeRef.current = null; // Reset lastTime to prevent huge 'dt' jump
    if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
    onStartRef.current?.();
  }, [loop, reset]);

  const stop = useCallback(() => {
    runningRef.current = false;
  }, []);

  const jump = useCallback(() => {
    if (deadRef.current) return;
    // Start game on jump if not running
    if (!runningRef.current) {
      start();
    }
    
    // *** FIXED: Lenient check for floating point errors ***
    if (playerYRef.current >= GROUND_Y) {
      playerVRef.current = JUMP_VEL;
      try {
        soundJumpRef.current.play().catch(() => {});
      } catch {}
    }
  }, [start]);

  const crouch = useCallback(() => {
    if (deadRef.current) return;
    crouchingRef.current = true;
  }, []);

  const uncrouch = useCallback(() => {
    crouchingRef.current = false;
  }, []);

  const pause = useCallback(() => {
    runningRef.current = false;
  }, []);

  const destroy = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // init (set canvas HiDPI)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // --- Asset Loading ---
    const ratio = window.devicePixelRatio || 1;
    isHiDPIRef.current = ratio > 1;
    coordsRef.current = isHiDPIRef.current ? HDPI_COORDS : LDPI_COORDS;

    const assetBase = isHiDPIRef.current
      ? "/game/default_200_percent"
      : "/game/default_100_percent";
    const spriteName = isHiDPIRef.current
      ? "200-offline-sprite.png"
      : "100-offline-sprite.png";

    spriteRef.current.src = `${assetBase}/${spriteName}`;
    soundJumpRef.current.src = `/game/audio/press.ogg`;
    soundHitRef.current.src = `/game/audio/hit.ogg`;
    soundCheckpointRef.current.src = `/game/audio/reached.ogg`;
    // --- End Asset Loading ---

    if (ctx) {
      // Set canvas scaling for HiDPI
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.imageSmoothingEnabled = false;
    }
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Wait for sprite to load before starting the game
    spriteRef.current.onload = () => {
      reset(); // Draw the initial state
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
      // Stop the game loop immediately, wait for user 'start'
      pause(); 
      // Manually call render one more time to ensure title screen is drawn
      const initialCtx = canvas.getContext("2d");
      if (initialCtx) render(initialCtx); 
    };
    spriteRef.current.onerror = () => {
      console.error("Failed to load game sprite sheet.");
      if (ctx) {
        ctx.fillStyle = "red";
        ctx.font = "12px sans-serif";
        ctx.fillText("Error loading assets. Check console.", 10, 20);
      }
    };
    
    // Return a cleanup function for destroy
    return () => {
        destroy();
    }
  }, [canvasRef, destroy, height, loop, pause, render, reset, width]); // Added dependencies


  // *** NEW: Memoize the returned API object ***
  const api = useMemo(() => ({
    start,
    stop,
    reset,
    jump,
    crouch,
    uncrouch,
    pause,
    destroy,
  }), [start, stop, reset, jump, crouch, uncrouch, pause, destroy]);

  return api;
}