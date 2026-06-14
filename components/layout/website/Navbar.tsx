"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Menu, Search, X, Bell, Globe } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { User } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import MobileMenu from "@/components/layout/website/MobileMenu";

type Movie = {
  id: number;
  title: string;
  cover: string;
  category: string;
  rate: number;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      axios.get("https://66fa7571afc569e13a9bd881.mockapi.io/vod/movies").then((res) => {
        const filtered = res.data.filter((movie: Movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
      });
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const menuItems = [
    { label: "Home", route: `/${locale}` },
    { label: "Movies", route: `/${locale}/movies` },
    { label: "About Us", route: `/${locale}/about` },
    { label: "Contact", route: `/${locale}/contact` },
  ];

  const isActive = (route: string) => pathname === route;

  const goToMovie = (id: number) => {
    setSearchTerm("");
    setResults([]);
    setShowSearch(false);
    router.push(`/movies/${id}`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md"
            : "bg-gradient-to-b from-black via-black/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-6">

          {/* LEFT */}
          <div className="flex items-center gap-10">
            <Link
              href={`/${locale}`}
              className="text-3xl font-black text-red-600"
            >
              NETVOD
            </Link>

            <nav className="hidden md:flex gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.route}
                  href={item.route}
                  className={`text-sm ${
                    isActive(item.route)
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <div className="relative flex items-center">

              {/* DESKTOP INPUT */}
              <div className="hidden md:block relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search movies..."
                  className="w-60 rounded-full bg-white/10 pl-10 pr-4 py-2 text-sm text-white outline-none backdrop-blur"
                />

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              </div>

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setShowSearch((p) => !p)}
                className="md:hidden p-2 hover:bg-white/10 rounded-full"
              >
                <Search className="h-5 w-5 text-white" />
              </button>

              {/* MOBILE INPUT */}
              {showSearch && (
                <div className="absolute top-12 right-0 md:hidden">
                  <input
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies..."
                    className="w-56 rounded-full bg-white/10 pl-10 pr-4 py-2 text-sm text-white outline-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                </div>
              )}

              {/* 🔥 RESULTS DROPDOWN (IMPORTANT FIX) */}
              {searchTerm.trim() !== "" && (
                <div className="absolute top-12 right-0 w-72 bg-[#141414] border border-white/10 rounded-lg overflow-hidden z-50">

                  {results.length > 0 ? (
                    results.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => goToMovie(movie.id)}
                        className="flex items-center gap-3 p-2 hover:bg-white/10 cursor-pointer"
                      >
                        <img
                          src={movie.cover}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div>
                          <p className="text-white text-sm">{movie.title}</p>
                          <p className="text-xs text-zinc-400">
                            {movie.category}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-sm text-zinc-400">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* SOCIAL (desktop) */}
            <div className="hidden lg:flex items-center gap-5 px-2">
              <FaFacebookF className="h-5 w-5 text-zinc-400 hover:text-blue-500 cursor-pointer" />
              <FaInstagram className="h-5 w-5 text-zinc-400 hover:text-pink-500 cursor-pointer" />
              <FaYoutube className="h-5 w-5 text-zinc-400 hover:text-red-500 cursor-pointer" />
            </div>

            <button className="p-2 hover:bg-white/10 rounded-full">
              <Bell className="h-5 w-5 text-white" />
            </button>

            {/* AUTH DROPDOWN (desktop) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setAuthOpen((p) => !p)}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <User className="h-5 w-5 text-white" />
              </button>

              {authOpen && (
                <>
                  {/* backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setAuthOpen(false)}
                  />

                  {/* dropdown */}
                  <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-xl z-50">
                    
                    <Link
                      href={`/${locale}/login`}
                      onClick={() => setAuthOpen(false)}
                      className="block px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                    >
                      Login
                    </Link>

                    <Link
                      href={`/${locale}/register`}
                      onClick={() => setAuthOpen(false)}
                      className="block px-4 py-3 text-sm text-white hover:bg-white/10 transition border-t border-white/10"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* LanguageSwitcher (desktop) */}
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            {/* MOBILE */}
            <button onClick={() => setIsOpen(true)}>
              <Menu className="h-6 w-6 text-white md:hidden" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItems={menuItems}
        locale={locale}
      />
    </>
  );
}