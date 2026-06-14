import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import axios from "axios";

type Movie = {
  id: number;
  title: string;
  cover: string;
  category: string;
  rate: number;
};

const Footer = async () => {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const tNav = await getTranslations();

  const quickLinks = [
    { label: "nav.home", href: `/${locale}` },
    { label: "nav.movies", href: `/${locale}/movies` },
    { label: "nav.about", href: `/${locale}/about` },
    { label: "nav.contact", href: `/${locale}/contact` },
  ];


  // to make the genre dynamic 
  const res = await axios.get("http://localhost:3001/movies");
  const movies: Movie[] = res.data;

  const genres: string[] = Array.from(
    new Set(movies.map((m) => m.category))
  );
  

  // to make the genre columns
  const chunkArray = (arr: string[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const genreColumns = chunkArray(genres, 5);

  return (
    <footer className="bg-[#0b0b0b] text-white border-t border-white/10 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-14">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              NETVOD
            </h2>
            <p className="text-sm text-zinc-400 leading-6">
              {t("storeDescription")}
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-5">
              <a className="p-2 rounded-full bg-white/5 hover:bg-blue-600 transition">
                <FaFacebookF />
              </a>
              <a className="p-2 rounded-full bg-white/5 hover:bg-pink-500 transition">
                <FaInstagram />
              </a>
              <a className="p-2 rounded-full bg-white/5 hover:bg-red-600 transition">
                <FaYoutube />
              </a>
              <a className="p-2 rounded-full bg-white/5 hover:bg-sky-500 transition">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-white transition"
                  >
                    {tNav(label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GENRES */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Genres</h3>

            <div className="flex gap-10">
              {genreColumns.map((col, colIndex) => (
                <ul key={colIndex} className="space-y-3 text-sm text-zinc-400">
                  {col.map((g: string, i: number) => (
                    <li key={i}>
                      <Link
                        href={`/${locale}/movies?category=${encodeURIComponent(g)}`}
                        className="hover:text-white transition cursor-pointer"
                      >
                        {g}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {tNav("contact.title")}
            </h3>

            <div className="space-y-3 text-sm text-zinc-400">
              <p>Email: support@netvod.com</p>
              <p>Phone: +20 123 456 789</p>
              <p>Cairo, Egypt</p>
            </div>

            {/* NEWSLETTER */}
            <div className="mt-5">
              <p className="text-sm mb-2 text-zinc-400">
                Subscribe for updates
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-l-md outline-none"
                />
                <button className="px-4 bg-red-600 text-white text-sm rounded-r-md">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} NETVOD. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;