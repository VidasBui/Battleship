import GameGrid from "./GameGrid";

class Game {
  public grid: GameGrid;
  public remainingShots: number;

  constructor(public gameId: string) {
    this.grid = new GameGrid();
    this.remainingShots = 25;
  }
}

export default Game;
