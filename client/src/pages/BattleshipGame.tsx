import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import EndGameModal from "../components/EndGameModal";
import GameGrid from "../components/GameGrid";
import { ShootResponse } from "../services/endpoints/Shoot";
import StartGame, {
  GameData,
  ProtectedTile,
} from "../services/endpoints/StartGame";
import RestartGame from "../services/endpoints/StartGame";
import "./BattleshipGame-module.scss";

const BattleShipGame = () => {
  const [grid, setGrid] = useState<ProtectedTile[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingShots, setRemainingShots] = useState(0);
  const [remainingShips, setRemainingShips] = useState(0);
  const [error, setError] = useState<string>();
  const [endMessage, setEndMessage] = useState<string>();
  const [gridSize, setGridSize] = useState(0);
  const [openModal, setModalOpen] = useState(false);

  const handleStartGame = () => {
    StartGame().then((res) => {
      if (res) {
        setGameValues(res);
      } else {
        setError("Failed to connect to the server");
      }
    });
  };

  const handleRestartGame = () => {
    RestartGame().then((res) => {
      if (res) {
        setGameValues(res);
      } else {
        setError("Failed to connect to the server");
      }
    });
  };

  const setGameValues = (res: GameData) => {
    setError(undefined);
    setEndMessage(undefined);
    setGameStarted(true);
    setGrid(res.grid);
    setRemainingShips(res.remainingShips);
    setRemainingShots(res.remainingShots);
    setGridSize(res.gridSize);
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
      setError(undefined);
      updateTiles(res.updatedTiles);
      setRemainingShips(res.remainingShips);
      setRemainingShots(res.remainingShots);
      setEndMessage(res.endMessage);
      if (res.endMessage) setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Box id="mainBox" className="mainBox">
      <Typography variant="h2">Batteship</Typography>
      {gameStarted && (
        <>
          <Box className="centeredBox">
            <Typography className="message">
              remaining shots: {remainingShots}
            </Typography>
            <Typography sx={{ ml: "15px" }} className="message">
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
      <Button
        onClick={
          !endMessage && gameStarted ? handleRestartGame : handleStartGame
        }
        className="gameStartButton"
      >
        {endMessage ? "Restart" : gameStarted ? "Play again" : "Start game"}
      </Button>
      <EndGameModal
        open={openModal}
        onRestart={handleRestartGame}
        onClose={handleClose}
        message={endMessage}
      />
    </Box>
  );
};

export default BattleShipGame;
