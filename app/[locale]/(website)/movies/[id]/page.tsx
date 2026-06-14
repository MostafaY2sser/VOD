"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  cover: string;
  category: string;
  rate: number;
  description: string;
  video: string;
};

export default function MovieDetailsPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/movies").then((res) => {
      setMovies(res.data);
    });
  }, []);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:3001/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  // 🔥 Recommended Movies Logic
  const recommended = useMemo(() => {
    if (!movie) return [];

    return movies
      .filter(
        (m) => m.id !== movie.id && m.category === movie.category
      )
      .slice(0, 6);
  }, [movies, movie]);

  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Video Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <video
          src={movie.video}
          autoPlay
          muted
          controls
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">{movie.title}</h1>

        <p className="text-gray-400 mt-2">
          {movie.category} • ⭐ {movie.rate}
        </p>

        <p className="mt-6 text-gray-300 leading-7">
          {movie.description}
        </p>

        <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg">
          ▶ Play Again
        </button>
      </div>

      {/* 🔥 Recommended Section */}
      {recommended.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          
          <h2 className="text-2xl font-bold mb-6">
            More Like This
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recommended.map((m) => (
              <Link
                key={m.id}
                href={`/movies/${m.id}`}
                className="group relative overflow-hidden rounded-xl"
              >
                <img
                  src={m.cover}
                  alt={m.title}
                  className="h-56 w-full object-cover transition group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-sm font-semibold line-clamp-1">
                    {m.title}
                  </p>
                  <p className="text-xs text-gray-300">
                    ⭐ {m.rate}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}