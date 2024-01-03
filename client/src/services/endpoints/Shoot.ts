import ApiClient from "../ApiClient";
import { shootEndpoint } from "./EndpointConstants";
import { ProtectedTile } from "./StartGame";

export type ShootResponse = {
  updatedTiles: ProtectedTile[];
  remainingShots: number;
  remainingShips: number;
  gridSize: number;
  endMessage: string | undefined;
  message: string | undefined;
};

type Props = {
  x: number;
  y: number;
};

const Shoot = async (props: Props) => {
  try {
    const res = await ApiClient.post<ShootResponse>(`${shootEndpoint}`, props);
    return res.status >= 200 && res.status < 300 ? res.data : undefined;
  } catch (error: any) {
    return undefined;
  }
};

export default Shoot;
