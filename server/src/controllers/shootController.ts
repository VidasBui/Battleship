import { Request, Response } from "express";
import gameRepository from "../repositories/GameRepository";
import jwt from "jsonwebtoken";
import { secretKey } from "../index";
import { TileKey } from "../models/GameGrid";
import Joi from "joi";

const shootController = (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      x: Joi.number().required().min(0),
      y: Joi.number().required().min(0),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: "Bad request" });
    }

    const coordinates: TileKey = req.body;
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const game = gameRepository.get(decoded.gameId);

      if (!game) {
        return res.status(400).json({ message: "Game not found" });
      }

      const r = game.handleShot(coordinates);

      if (r.error) return res.status(400).json({ message: r.error });
      const end = game.checkGameEnd();

      if (end.ended) gameRepository.delete(decoded.gameId);

      return res.status(200).json({
        updatedTiles: r.updatedTiles,
        remainingShots: game.remainingShots,
        end: end.ended,
        endMessage: end.message,
        remainingShips: game.grid.remainingShips,
      });
    });
  } catch (e: any) {
    return res.status(500).json({ errorMessage: e.message });
  }
};

export default shootController;
