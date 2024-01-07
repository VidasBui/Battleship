import { v4 as uuid } from "uuid";
import Game from "../models/Game";
import { protectedTile, TileKey } from "../models/GameGrid";
import GameRepository from "../repositories/GameRepository";

class GameService {
  private _gameRepository: GameRepository;

  constructor() {
    this._gameRepository = new GameRepository();
  }

  startNewGame() {
    const gameId: string = uuid();

    const game = new Game(gameId);
    this.addGame(game);
    const grid = game.grid.getUserGrid();
    const remainingShots = game.remainingShots;
    const gridSize = game.grid.size;
    const remainingShips = game.grid.remainingShips;

    return { gameId, grid, remainingShots, gridSize, remainingShips };
  }

  restartGame(previousGameId: string) {
    this.deleteGameById(previousGameId);
    return this.startNewGame();
  }

  handleShot(
    gameId: string,
    coordinates: TileKey
  ): {
    error?: string;
    updatedTiles?: protectedTile[];
    endMessage?: string;
    remainingShots?: number;
    remainingShips?: number;
  } {
    const game = this.getGameById(gameId);
    if (!game) {
      return { error: "Game not found" };
    }

    const r = game.grid.handleHit(coordinates);
    if (r.error) return { error: r.error, updatedTiles: [] };
    if (!r.successfulShot) game.remainingShots--;

    const gameState = this.checkGameEnd(game);

    if (gameState.ended) this.deleteGameById(game.gameId);
    return {
      remainingShots: game.remainingShots,
      remainingShips: game.grid.remainingShips,
      error: r.error,
      updatedTiles: r.updatedTiles,
      endMessage: gameState.message,
    };
  }

  private checkGameEnd(game: Game) {
    if (game.grid.remainingShips == 0)
      return { ended: true, message: "Victory!" };

    if (game.remainingShots == 0) return { ended: true, message: "Game over!" };
    return { ended: false };
  }

  private addGame(game: Game): void {
    this._gameRepository.add(game);
  }

  private getGameById(gameId: string): Game | undefined {
    return this._gameRepository.get(gameId);
  }

  private deleteGameById(gameId: string): void {
    this._gameRepository.delete(gameId);
  }
}

const gameService = new GameService();

export default gameService;
