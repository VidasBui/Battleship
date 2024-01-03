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
  const gridSize = game.grid.size;
  const remainingShips = game.grid.remainingShips;

  res.header("Authorization", `Bearer ${token}`);

  res.json({ grid, remainingShots, gridSize, remainingShips });
};

export default GameStartController;
