import cors from "cors";
import express from "express";
import { v4 as uuid } from "uuid";
import GameStartController from "./controllers/GameStartController";

export const secretKey = process.env.JWT_SECRET_KEY || uuid();
const port = 8000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/startGame", GameStartController);

app.get("/api", (req, res) => {
  res.send("Battleship game");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
