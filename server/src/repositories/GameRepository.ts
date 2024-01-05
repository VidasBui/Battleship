import Game from "../models/Game";

class GameRepository {
  private _games: Game[];

  constructor() {
    this._games = [];
  }

  add(game: Game) {
    this._games.push(game);
  }

  getAll(): Game[] {
    return this._games;
  }

  get(gameId: string): Game | undefined {
    return this._games.find((game) => game.gameId === gameId);
  }

  delete(gameId: string) {
    this._games = this._games.filter((game) => game.gameId !== gameId);
  }
}

export default GameRepository;
