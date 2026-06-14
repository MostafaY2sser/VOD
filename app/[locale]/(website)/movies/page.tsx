"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getMovies } from "@/lib/api";
import MovieCard from "@/components/shared/MovieCard";
import { useSearchParams, useRouter } from "next/navigation";

type Movie = {
  id: number;
  title: string;
  description: string;
  category: string;
  rate: number;
  cover: string;
  video: string;
};

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get("category") || "All";
  const category = categoryFromUrl;

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  const categories = [
    "All",
    ...new Set(movies.map((movie) => movie.category)),
  ];

  const filteredMovies = useMemo(() => {
    let data = [...movies];

    if (category !== "All") {
      data = data.filter((movie) => movie.category === category);
    }

    if (search) {
      data = data.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "rating") {
      data.sort((a, b) => b.rate - a.rate);
    }

    if (sort === "title") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }

    return data;
  }, [movies, search, category, sort]);

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero */}
      <section className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000"
          alt="Movies Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-black/5 to-black/30" /> */}

        <div className="relative z-10 flex h-full items-center px-6 md:px-12">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1 text-sm font-medium">
              Unlimited Movies
            </span>

            <h1 className="mb-4 text-5xl font-bold md:text-7xl">
              Watch Your Favorite Movies
            </h1>

            <p className="text-lg text-gray-300">
              Discover trending movies, top-rated classics and the latest
              releases all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 py-8 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-card py-3 pl-10 pr-4 outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-3">
            {/* Category */}
            <select
              value={category}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "All") {
                  router.push("/movies");
                } else {
                  router.push(`/movies?category=${value}`);
                }
              }}              
              className="rounded-xl border border-white/10 bg-card px-4 py-3"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-white/10 bg-card px-4 py-3"
            >
              <option value="rating">Top Rated</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="mt-6">
          <p className="text-sm text-gray-400">
            Showing {filteredMovies.length} movies
          </p>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="px-4 pb-12 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </section>
    </div>
  );
}