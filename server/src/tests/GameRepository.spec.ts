import Game from "../models/Game";
import GameRepository from "../repositories/GameRepository";

describe("GameRepository", () => {
  let gameRepository: GameRepository;

  beforeEach(() => {
    gameRepository = new GameRepository();
  });

  it("should add a game to the repository", () => {
    const game = new Game("testGameId");
    gameRepository.add(game);

    expect(gameRepository["_games"]).toContain(game);
  });

  it("should get a game by ID", () => {
    const game = new Game("testGameId");
    gameRepository.add(game);

    const retrievedGame = gameRepository.get("testGameId");

    expect(retrievedGame).toStrictEqual(game);
  });

  it("should return undefined when getting a non-existing game", () => {
    const retrievedGame = gameRepository.get("nonExistingGameId");

    expect(retrievedGame).toBeUndefined();
  });

  it("should delete a game from the repository", () => {
    const game = new Game("testGameId");
    gameRepository.add(game);

    gameRepository.delete("testGameId");

    expect(gameRepository["_games"]).not.toContain(game);
  });
});
