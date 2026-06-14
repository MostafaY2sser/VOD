"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

const locales = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const segments = pathname.split("/");
    segments[1] = newLocale;

    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-white 
                   bg-white/5 border border-white/10 hover:bg-white/10 transition"
      >
        <Globe size={14} />
        <span>{currentLocale.toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl 
                        border border-white/10 bg-black/80 backdrop-blur-lg shadow-lg z-50">
          {locales.map((locale) => {
            const isActive = locale.code === currentLocale;

            return (
              <button
                key={locale.code}
                onClick={() => changeLanguage(locale.code)}
                className={`w-full px-4 py-2 text-sm text-left transition ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {locale.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;