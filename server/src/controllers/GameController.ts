import { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { secretKey } from "../index";
import { TileKey } from "../models/GameGrid";
import gameService from "../services/GameService";

class GameController {
  async startGame(req: Request, res: Response) {
    try {
      const { token, grid, gridSize, remainingShips, remainingShots } =
        gameService.startNewGame();

      res.header("Authorization", `Bearer ${token}`);
      res.status(200).json({ grid, remainingShots, gridSize, remainingShips });
    } catch (e: any) {
      return res.status(500).json({ errorMessage: e.message });
    }
  }

  async shoot(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        x: Joi.number().required().min(0),
        y: Joi.number().required().min(0),
      });
      const validationResult = schema.validate(req.body);

      if (validationResult.error) {
        return res.status(400).json({ message: "Bad request" });
      }

      const token = req.header("Authorization")?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }

        const coordinates: TileKey = req.body;
        const gameId: string = decoded.gameId;
        const r = gameService.handleShot(gameId, coordinates);

        if (r.error) return res.status(400).json({ message: r.error });

        return res.status(200).json({ ...r });
      });
    } catch (e: any) {
      return res.status(500).json({ errorMessage: e.message });
    }
  }
}

export default GameController;
