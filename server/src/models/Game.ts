import GameGrid, { protectedTile, TileKey } from "./GameGrid";

class Game {
  public grid: GameGrid;
  public remainingShots: number;

  constructor(public gameId: string) {
    this.grid = new GameGrid();
    this.remainingShots = 25;
  }

  handleShot(coordinates: TileKey): {
    error?: string;
    updatedTiles?: protectedTile[];
  } {
    const res = this.grid.handleHit(coordinates);
    if (res.error) return { error: res.error, updatedTiles: [] };
    if (!res.successfulShot) this.remainingShots--;

    return { updatedTiles: res.updatedTiles };
  }

  checkGameEnd(): { ended: boolean; message?: string } {
    if (this.grid.remainingShips == 0)
      return { ended: true, message: "Victory!" };

    if (this.remainingShots == 0) return { ended: true, message: "Game over" };

    return { ended: false };
  }
}

export default Game;
