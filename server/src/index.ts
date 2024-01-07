import cors from "cors";
import express from "express";
import { v4 as uuid } from "uuid";
import GameController from "./controllers/GameController";

export const secretKey = process.env.JWT_SECRET_KEY || uuid();
const port = 8000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: "Authorization",
  })
);

app.use(express.json());

const gameController = new GameController();

app.get("/api/startGame", gameController.startGame);
app.post("/api/shoot", gameController.shoot);
app.get("/api/restartGame", gameController.restart);

app.get("/api", (req, res) => {
  res.send("Battleship game");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
