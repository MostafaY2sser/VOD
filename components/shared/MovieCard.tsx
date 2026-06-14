
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  cover: string;
  category: string;
  rate: number;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group relative min-w-[220px] cursor-pointer snap-start">

      {/* Glow background effect */}
      <div className="absolute -inset-2 rounded-2xl bg-red-500/0 group-hover:bg-red-500/10 blur-2xl transition" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:shadow-red-500/20 group-hover:-translate-y-1">

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={movie.cover}
            alt={movie.title}
            className="aspect-[2/3] w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-75"
          />

          {/* Top gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-[11px] text-white backdrop-blur-md border border-white/10">
            ⭐ {movie.rate}
          </div>

          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <button className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition">
              ▶ Play
            </button>
          </div>
        </div>

        {/* Info panel */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-white transition group-hover:text-red-400">
            {movie.title}
          </h3>

          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {movie.category}
            </p>

            <span className="text-[10px] uppercase tracking-wider text-gray-500">
              HD
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}