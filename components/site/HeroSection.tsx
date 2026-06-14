export default function HeroSection() {
  return (
    <section className="relative h-screen">
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />

      {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" /> */}

      <div className="relative z-10 flex h-full items-center px-8">
        <div className="max-w-3xl">
          <span className="text-primary font-semibold tracking-widest">
            MOVIX ORIGINAL
          </span>

          <h1 className="mt-4 text-6xl md:text-8xl font-black">
            THE LAST KINGDOM
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-zinc-300">
            Follow the journey of warriors and kings in a world filled
            with battles, betrayal and destiny.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-md bg-white px-8 py-3 font-bold text-black">
              ▶ Play
            </button>

            <button className="rounded-md bg-zinc-700/70 px-8 py-3 font-bold">
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}