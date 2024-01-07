import ApiClient from "../ApiClient";
import { restartGameEndpoint } from "./EndpointConstants";
import { GameData } from "./StartGame";

const RestartGame = async () => {
  try {
    const res = await ApiClient.get<GameData>(`${restartGameEndpoint}`);
    if (res.status === 200) {
      const token = res.headers["authorization"];
      sessionStorage.setItem("accessToken", token);
    }
    return res.status === 200 ? res.data : undefined;
  } catch (error: any) {
    return undefined;
  }
};

export default RestartGame;
