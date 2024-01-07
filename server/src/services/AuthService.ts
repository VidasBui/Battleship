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

  validateToken(req: Request): {
    status: number;
    errMessage?: string;
    gameId?: string;
  } {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return { status: 401, errMessage: "Unauthorized" };
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        return { status: 403, errMessage: "Forbidden" };
      }
      const gameId: string = decoded.gameId;
      return { status: 200, gameId: gameId };
    });
    return { status: 400, errMessage: "Bad request" };
  }
}

const authService = new AuthService();

export default authService;
