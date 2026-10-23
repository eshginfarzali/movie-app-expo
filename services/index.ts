import { create } from "axios";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

if (!API_KEY && process.env.NODE_ENV !== "test") {
  console.warn(
    "EXPO_PUBLIC_TMDB_API_KEY is not set. Copy .env.example to .env and add your TMDB key."
  );
}

const axiosClient = create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: API_KEY,
  },
});

export default axiosClient;
