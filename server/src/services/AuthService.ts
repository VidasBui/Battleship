import jwt from "jsonwebtoken";
import { secretKey } from "../index";
import { Request } from "express";

export class AuthService {
  constructor() {}

  getToken(gameId: string) {
    return jwt.sign({ gameId }, secretKey, {
      expiresIn: "4h",
    });
  }

  async validateToken(req: Request): Promise<{
    status: number;
    errMessage?: string;
    gameId?: string;
  }> {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) {
        return { status: 401, errMessage: "Unauthorized" };
      }
      const decoded = await jwt.verify(token, secretKey);
      const gameId: string = (decoded as any).gameId;

      return { status: 200, gameId: gameId };
    } catch (err) {
      return { status: 403, errMessage: "Forbidden" };
    }
  }
}

const authService = new AuthService();

export default authService;
