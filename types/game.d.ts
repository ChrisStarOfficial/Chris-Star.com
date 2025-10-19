interface Window {
  initGame: () => void;
  gameManager: {
    stop: () => void;
    restart: () => void;
    gameOver: () => void;
  };
  scoreManager: {
    update: (score: number) => void;
    getScore: () => number;
  };
  // Add other globals from the game
  THREE: any;
  Howl: any;
  Nebula: any;
}

declare module '*.vox' {
  const content: any;
  export default content;
}