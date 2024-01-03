import ApiClient from "../ApiClient";
import { startGameEndpoint } from "./EndpointConstants";

type Response = {
  grid: ProtectedTile[];
  remainingShots: number;
  remainingShips: number;
  gridSize: number;
};

export type ProtectedTile = {
  coordinates: TileKey;
  wasShot: boolean;
  hit: boolean;
  destroyed: boolean;
};

type TileKey = { x: number; y: number };

const StartGame = async () => {
  try {
    const res = await ApiClient.get<Response>(`${startGameEndpoint}`);
    if (res.status === 200) {
      const token = res.headers["authorization"];
      sessionStorage.setItem("accessToken", token);
    }
    return res.status === 200 ? res.data : undefined;
  } catch (error: any) {
    return undefined;
  }
};

export default StartGame;
