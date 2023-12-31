import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { secretKey } from "../index";
import Game from "../models/Game";
import gameRepository from "../repositories/GameRepository";

const GameStartController = (req: Request, res: Response): void => {
  const gameId: string = uuid();

  const token: string = jwt.sign({ gameId }, secretKey, {
    expiresIn: "4h",
  });

  const game = new Game(gameId);
  gameRepository.add(game);

  const grid = game.grid.getUserGrid();
  const remainingShots = game.remainingShots;

  res.json({
    token,
    grid,
    remainingShots,
    remainingShips: game.grid.remainingShips,
  });
};

export default GameStartController;
