import express from "express";

const port = 8000;

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Battleship game");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
