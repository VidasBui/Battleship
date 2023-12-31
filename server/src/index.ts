import express from "express";
import GameStartController from "./controllers/GameStartController";

const port = 8000;

const app = express();
app.use(express.json());

app.get("/api/startGame", GameStartController);

app.get("/api", (req, res) => {
  res.send("Battleship game");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
