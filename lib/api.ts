// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://66fa7571afc569e13a9bd881.mockapi.io/vod",
});

export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};

export const getMovieById = async (id: number) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};