import Game from "../models/Game";

class GameRepository {
  private games: Game[] = [];

  add(game: Game) {
    this.games.push(game);
  }

  getAll(): Game[] {
    return this.games;
  }

  get(gameId: string): Game | undefined {
    return this.games.find((game) => game.gameId === gameId);
  }

  delete(gameId: string) {
    this.games = this.games.filter((game) => game.gameId !== gameId);
  }
}

const gameRepository = new GameRepository();

export default gameRepository;
