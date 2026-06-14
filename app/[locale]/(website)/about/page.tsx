const AboutPage = () => {
  return (
    <div className="bg-background text-white min-h-screen">

      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About NETVOD
          </h1>
          <p className="text-zinc-300 text-lg">
            Your ultimate destination for streaming movies, series, and
            exclusive entertainment content.
          </p>
        </div>
      </section>

      {/* ABOUT TEXT */}
      <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>

        <p className="text-zinc-400 leading-7 mb-4">
          NETVOD is a modern streaming platform built to deliver high-quality
          movies and series experience. We focus on performance, design, and
          user experience.
        </p>

        <p className="text-zinc-400 leading-7">
          Our mission is to bring cinema closer to you with a smooth,
          fast, and beautiful interface powered by modern web technologies.
        </p>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12 py-10">
        {[
          { label: "Movies", value: "10K+" },
          { label: "Users", value: "1M+" },
          { label: "Ratings", value: "4.9/5" },
          { label: "Countries", value: "120+" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <h3 className="text-2xl font-bold text-red-500">
              {item.value}
            </h3>
            <p className="text-zinc-400 mt-2">{item.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-12 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "High Quality Streaming",
              desc: "Watch movies in HD and 4K without interruptions.",
            },
            {
              title: "Fast Performance",
              desc: "Optimized for speed and smooth browsing experience.",
            },
            {
              title: "Huge Library",
              desc: "Thousands of movies and series updated daily.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Start Watching Now
        </h2>
        <p className="text-zinc-400 mb-6">
          Explore thousands of movies and series anytime.
        </p>

        <a
          href="/movies"
          className="inline-block bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full font-medium"
        >
          Browse Movies
        </a>
      </section>

    </div>
  );
};

export default AboutPage;