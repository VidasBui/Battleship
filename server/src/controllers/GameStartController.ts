import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import Game from "../models/Game";
import gameRepository from "../repositories/GameRepository";

const secretKey = process.env.JWT_SECRET_KEY || uuid();

const GameStartController = (req: Request, res: Response): void => {
  const gameId: string = uuid();

  const token: string = jwt.sign({ gameId }, secretKey, {
    expiresIn: "4h",
  });

  var game = new Game(gameId);
  gameRepository.add(game);

  res.json(token);
};

export default GameStartController;
