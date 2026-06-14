// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};

export const getMovieById = async (id: number) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};