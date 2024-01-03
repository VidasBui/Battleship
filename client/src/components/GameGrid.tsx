import { Stack } from "@mui/material";
import GridHeader from "./GridHeader";
import Cell from "./Cell";
import { ProtectedTile } from "../services/endpoints/StartGame";
import Shoot, { ShootResponse } from "../services/endpoints/Shoot";

type Props = {
  gridSize: number;
  grid: ProtectedTile[];
  handleShootResponse: (res: Promise<ShootResponse | undefined>) => void;
  disableButtons: boolean;
};

const GameGrid = ({
  gridSize,
  grid,
  handleShootResponse,
  disableButtons,
}: Props) => {
  const handleDisplayCell = (x: number, y: number): string => {
    const cell = grid.find(
      (cell) => cell.coordinates.x === x && cell.coordinates.y === y
    );
    if (cell) {
      if (cell.destroyed) {
        return "red";
      } else if (cell.hit) {
        return "yellow";
      } else if (cell.wasShot) {
        return "gray";
      }
    }

    return "lightblue"; //default
  };

  const handleOnClick = (x: number, y: number): (() => void) | undefined => {
    const cell = grid.find(
      (cell) => cell.coordinates.x === x && cell.coordinates.y === y
    );
    if (disableButtons) return undefined;

    return cell?.wasShot
      ? undefined
      : () => handleShootResponse(Shoot({ x: x, y: y }));
  };

  return (
    <>
      <GridHeader length={gridSize} />
      <Stack direction="column" spacing={0.5}>
        {Array.from({ length: gridSize }, (_, rowIndex) => (
          <Stack
            key={`row-${rowIndex}`}
            direction="row"
            spacing={0.5}
            justifyContent="center"
          >
            <Cell key={`index-${rowIndex}`} text={rowIndex + 1} />
            {Array.from({ length: gridSize }, (_, colIndex) => (
              <Cell
                key={`cell-${rowIndex}-${colIndex}`}
                backgroundColor={handleDisplayCell(colIndex, rowIndex)}
                onClick={handleOnClick(colIndex, rowIndex)}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default GameGrid;
