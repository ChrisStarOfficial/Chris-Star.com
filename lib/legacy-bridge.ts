// lib/legacy-bridge.ts
export class LegacyGameBridge {
  private score = 0;
  
  updateScore(points: number) {
    this.score += points;
    // Emit React event
    window.dispatchEvent(new CustomEvent('gameScoreUpdate', { 
      detail: { score: this.score } 
    }));
  }
  
  gameOver() {
    window.dispatchEvent(new CustomEvent('gameOver'));
  }
}