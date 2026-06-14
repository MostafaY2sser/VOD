"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getMovies } from "@/lib/api";

type Movie = {
  id: number;
  title: string;
  category: string;
  cover: string;
  rate: number;
};

export default function CategoriesSection() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  // استخراج الفئات من الداتا (بدون تكرار)
  const categories = useMemo(() => {
    const all = movies.map((m) => m.category);
    return ["All", ...Array.from(new Set(all))];
  }, [movies]);

  const handleClick = (category: string) => {
    router.push(`/movies?category=${category}`);
  };

  return (
    <section className="relative px-6 md:px-12 py-20 bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white">
      
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Explore Categories
        </h2>
        <p className="text-gray-400 mt-2">
          Discover movies by genre and find what fits your mood
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className="
              group relative overflow-hidden rounded-2xl
              border border-white/10 bg-white/5
              p-6 text-left
              transition-all duration-300
              hover:scale-[1.05] hover:border-red-500/50
              hover:shadow-[0_0_30px_rgba(255,0,0,0.25)]
            "
          >
            {/* glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-red-600 blur-2xl transition-all" />

            {/* animated background stripe */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-red-500 opacity-0 group-hover:opacity-30 transition-all duration-500" />

            {/* content */}
            <div className="relative z-10">
              <h3 className="text-lg font-semibold capitalize">
                {category}
              </h3>

              <p className="mt-2 text-xs text-gray-400">
                Browse {category} movies
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}