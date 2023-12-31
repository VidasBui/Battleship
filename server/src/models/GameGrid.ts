import _ from "lodash";
import { v4 as uuid } from "uuid";
import Ship from "./Ship";

type Tile = {
  ship: Ship | undefined;
  wasShot: boolean;
};

export type TileKey = { x: number; y: number };

class GameGrid {
  private _grid: Record<string, any> = {};

  constructor(public size = 10) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const key: TileKey = { x: i, y: j };
        const defaultTile: Tile = {
          ship: undefined,
          wasShot: false,
        };
        this.setTile(key, defaultTile);
      }
    }
    this.placeShips();
  }

  private getTile(key: TileKey): Tile | undefined {
    const keyString = JSON.stringify(key);
    return this._grid[keyString];
  }

  private setTile(key: TileKey, value: Tile): void {
    const keyString = JSON.stringify(key);
    this._grid[keyString] = value;
  }

  private placeShips() {
    for (const shipLength of getDefaultShipLengths()) {
      let placed = false;
      while (!placed) {
        const startX = Math.floor(Math.random() * (this.size - shipLength + 1));
        const startY = Math.floor(Math.random() * (this.size - shipLength + 1));
        const isHorizontal = Math.random() < 0.5;
        const shipId: string = uuid();
        if (
          this.canPlaceShip(shipLength, startX, startY, isHorizontal, shipId)
        ) {
          this.placeShip(shipLength, startX, startY, isHorizontal, shipId);
          placed = true;
        }
      }
    }
  }

  private placeShip(
    shipLength: number,
    startX: number,
    startY: number,
    isHorizontal: boolean,
    shipId: string
  ) {
    let ship = new Ship(shipId, []);
    for (let i = 0; i < shipLength; i++) {
      const x = isHorizontal ? startX + i : startX;
      const y = isHorizontal ? startY : startY + i;
      const key: TileKey = { x: x, y: y };
      ship.occupiedTiles.push(key);

      const tile: Tile = {
        ship,
        wasShot: false,
      };

      this.setTile(key, tile);
    }
    return ship;
  }

  private canPlaceShip(
    shipLength: number,
    startX: number,
    startY: number,
    isHorizontal: boolean,
    shipId: string
  ): boolean {
    for (let i = 0; i < shipLength; i++) {
      let x = isHorizontal ? startX + i : startX;
      let y = isHorizontal ? startY : startY + i;
      if (this.isOccupied(x, y, shipId)) {
        return false;
      }
    }
    return true;
  }

  private isOccupied(x: number, y: number, shipIdToIgnore: string): boolean {
    for (let xi = -1; xi <= 1; xi++) {
      for (let yi = -1; yi <= 1; yi++) {
        const neighborX = x + xi;
        const neighborY = y + yi;
        const key: TileKey = { x: neighborX, y: neighborY };

        const tile = this.getTile(key);

        if (
          tile &&
          tile.ship !== undefined &&
          tile.ship.shipId !== shipIdToIgnore
        ) {
          return true;
        }
      }
    }

    return false;
  }
}

const getDefaultShipLengths = () =>
  _.concat(
    _.times(1, () => 5),
    _.times(1, () => 4),
    _.times(2, () => 3),
    _.times(3, () => 2),
    _.times(3, () => 1)
  );

export default GameGrid;
