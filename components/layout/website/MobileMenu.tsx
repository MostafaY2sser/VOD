"use client";

import Link from "next/link";
import { User, X } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  menuItems: { label: string; route: string }[];
  locale: string;
};

export default function MobileMenu({
  isOpen,
  setIsOpen,
  menuItems,
  locale,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setIsOpen(false)}
      />

      {/* panel */}
      <div
        className={`absolute left-0 top-0 h-full w-[300px] bg-[#141414] border-l border-zinc-800 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between">
          <span className="text-red-600 font-bold">NETVOD</span>

          <X
            onClick={() => setIsOpen(false)}
            className="text-white cursor-pointer"
          />
        </div>

        {/* content */}
        <div className="p-6 flex flex-col gap-4 h-[calc(100vh-100px)]">
          {menuItems.map((item) => (
            <Link
              key={item.route}
              href={item.route}
              onClick={() => setIsOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          {/* language */}
          <div className="pt-4">
            <LanguageSwitcher />
          </div>

            <div className="mt-auto flex flex-col gap-4 ">
            {/* auth */}
            <div className="pt-6  flex flex-col gap-3">
                <Link
                href={`/${locale}/login`}
                onClick={() => setIsOpen(false)}
                className="text-center py-2 rounded-lg border border-white/10 text-white hover:bg-white/10"
                >
                Login
                </Link>

                <Link
                href={`/${locale}/register`}
                onClick={() => setIsOpen(false)}
                className="text-center py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                Sign Up
                </Link>
            </div>

            {/* social */}
            <div className="flex gap-4 justify-around mt-4 pt-6 border-t border-zinc-800">
                <FaFacebookF className="text-white" />
                <FaInstagram className="text-white" />
                <FaYoutube className="text-white" />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}