"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import CategoriesSection from "@/components/site/CategoriesSection";
import HeroSection from "@/components/site/HeroSection";
import MoviesRow from "@/components/site/MoviesRow";

type Movie = {
  id: number;
  title: string;
  description: string;
  category: string;
  rate: number;
  cover: string;
  video: string;
};

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get("https://66fa7571afc569e13a9bd881.mockapi.io/vod/movies")
      .then((res) => setMovies(res.data));
  }, []);

  const trendingMovies = [...movies]
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 6);

  const popularMovies = movies.filter(
    (movie) =>
      movie.category === "Action" ||
      movie.category === "Superhero"
  );

  const popularSeries = movies.filter(
    (movie) => movie.category === "Sci-Fi"
  );

  const topRated = [...movies]
    .filter((movie) => movie.rate >= 8.8)
    .sort((a, b) => b.rate - a.rate);

  const newReleases = movies.slice().reverse();

  return (
    <>
      <HeroSection />

      <MoviesRow
        title="Trending Now"
        movies={trendingMovies}
      />

      <MoviesRow
        title="Popular Movies"
        movies={popularMovies}
      />

      <MoviesRow
        title="Popular Series"
        movies={popularSeries}
      />

      <MoviesRow
        title="Top Rated"
        movies={topRated}
      />

      <MoviesRow
        title="New Releases"
        movies={newReleases}
      />

      <CategoriesSection />
    </>
  );
}