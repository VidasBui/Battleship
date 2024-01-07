import { Request, Response } from "express";
import Joi from "joi";
import { TileKey } from "../models/GameGrid";
import gameService from "../services/GameService";
import authService from "../services/AuthService";

class GameController {
  async startGame(req: Request, res: Response) {
    try {
      const { gameId, grid, gridSize, remainingShips, remainingShots } =
        gameService.startNewGame();

      const token = authService.getToken(gameId);

      res.header("Authorization", `Bearer ${token}`);
      res.status(200).json({ grid, remainingShots, gridSize, remainingShips });
    } catch (e: any) {
      return res.status(500).json({ errorMessage: e.message });
    }
  }

  async restart(req: Request, res: Response) {
    try {
      const {
        status,
        errMessage,
        gameId: previousGameId,
      } = authService.validateToken(req);
      if (!previousGameId)
        return res.status(status).json({ message: `${errMessage}` });

      const { gameId, grid, gridSize, remainingShips, remainingShots } =
        gameService.restartGame(previousGameId);

      const token = authService.getToken(gameId);

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

      const { status, errMessage, gameId } = authService.validateToken(req);

      if (!gameId) return res.status(status).json({ message: `${errMessage}` });

      const coordinates: TileKey = req.body;
      const r = gameService.handleShot(gameId, coordinates);

      if (r.error) return res.status(400).json({ message: r.error });

      return res.status(200).json({ ...r });
    } catch (e: any) {
      return res.status(500).json({ errorMessage: e.message });
    }
  }
}

export default GameController;
