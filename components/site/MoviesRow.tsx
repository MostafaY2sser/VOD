import MovieCard from "@/components/shared/MovieCard";

type Movie = {
  id: number;
  title: string;
  cover: string;
  category: string;
  rate: number;
};

export default function MoviesRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  return (
    <section className="px-2 md:px-8 py-4 md:py-10">
      <h2 className="mb-5 text-2xl font-bold text-white">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}