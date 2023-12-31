import Ship from "./Ship";

type Tile = {
  ship: Ship | undefined;
  wasShot: boolean;
};

export type TileKey = { x: number; y: number };

class GameGrid {
  private _grid: Record<string, any> = {};

  constructor() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const key: TileKey = { x: i, y: j };
        const defaultTile: Tile = {
          ship: undefined,
          wasShot: false,
        };
        this.setTile(key, defaultTile);
      }
    }
  }

  private getTile(key: TileKey): Tile | undefined {
    const keyString = JSON.stringify(key);
    return this._grid[keyString];
  }

  private setTile(key: TileKey, value: Tile): void {
    const keyString = JSON.stringify(key);
    this._grid[keyString] = value;
  }
}

export default GameGrid;
