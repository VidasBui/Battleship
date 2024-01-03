import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import GameGrid from "../components/GameGrid";
import { ShootResponse } from "../services/endpoints/Shoot";
import StartGame, { ProtectedTile } from "../services/endpoints/StartGame";
import "./BattleshipGame-module.scss";

const BattleShipGame = () => {
  const [grid, setGrid] = useState<ProtectedTile[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingShots, setRemainingShots] = useState(0);
  const [remainingShips, setRemainingShips] = useState(0);
  const [error, setError] = useState<string>();
  const [endMessage, setEndMessage] = useState<string>();
  const [gridSize, setGridSize] = useState(0);

  const handleStartGame = () => {
    StartGame().then((res) => {
      if (res) {
        setEndMessage(undefined);
        setGameStarted(true);
        setGrid(res.grid);
        setRemainingShips(res.remainingShips);
        setRemainingShots(res.remainingShots);
        setGridSize(res.gridSize);
      } else {
        setError("Failed to connect to the server");
      }
    });
  };

  const updateTiles = (tiles: ProtectedTile[]) => {
    const updatedGrid = [...grid];

    tiles.forEach((tile) => {
      const index = updatedGrid.findIndex(
        (c) =>
          c.coordinates.x === tile.coordinates.x &&
          c.coordinates.y === tile.coordinates.y
      );

      if (index !== -1) {
        updatedGrid[index] = tile;
      }
    });

    setGrid(updatedGrid);
  };

  const handleShootResponse = async (
    req: Promise<ShootResponse | undefined>
  ) => {
    const res = await req;
    if (typeof res === "undefined") {
      setError("Failed to connect to the server");
    } else {
      updateTiles(res.updatedTiles);
      setRemainingShips(res.remainingShips);
      setRemainingShots(res.remainingShots);
      setEndMessage(res.endMessage);
    }
  };

  return (
    <Box id="mainBox" className="mainBox">
      <Typography variant="h2" sx={{ ml: 1 }}>
        Batteship
      </Typography>
      {gameStarted && (
        <>
          <Box className="spaceEvenlyBox">
            <Typography className="message">
              remaining shots: {remainingShots}
            </Typography>
            <Typography className="message">
              remaining ships:{remainingShips}
            </Typography>
          </Box>
          <GameGrid
            handleShootResponse={handleShootResponse}
            grid={grid}
            gridSize={gridSize}
            disableButtons={endMessage ? true : false}
          />
        </>
      )}
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      {endMessage && (
        <Typography variant="h4" className="message" sx={{ mt: 2 }}>
          {endMessage}
        </Typography>
      )}
      {(!gameStarted || endMessage) && (
        <Button onClick={handleStartGame} className="gameStartButton">
          {!gameStarted ? "Start Game" : "Play Again"}
        </Button>
      )}
    </Box>
  );
};

export default BattleShipGame;
