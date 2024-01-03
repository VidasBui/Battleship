import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

ApiClient.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `${accessToken}`;
  }
  return config;
});

export default ApiClient;
