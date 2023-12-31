import { TileKey } from "./GameGrid";

class Ship {
  constructor(public shipId: string, public occupiedTiles: TileKey[]) {}
}

export default Ship;
