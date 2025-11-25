"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LangDropdown from "./LangDropdown";
import ThemeDropdown from "./ThemeDropdown";
import { useRouteLang } from "@/hooks/useLang";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lang = useRouteLang();

  if (pathname.includes("/auth")) return null;

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="Pebblely Logo"
            className="h-6 w-auto"
          />
          <span className="font-semibold text-lg tracking-tight dark:text-white">
            Pebblely
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href={`/${lang}/resources`}
            className="hover:opacity-80 transition"
          >
            Resources
          </Link>
          <Link href={`${lang}/api`} className="hover:opacity-80 transition">
            API
          </Link>
          <Link
            href={`/${lang}/pricing`}
            className="hover:opacity-80 transition"
          >
            Pricing
          </Link>
          <Link
            href={`/${lang}/auth/login`}
            className="hover:opacity-80 transition"
          >
            Log in
          </Link>
          <Link
            href={`/${lang}/get-started`}
            className="bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Get started
          </Link>

          <LangDropdown />
          <ThemeDropdown />
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden flex flex-col bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
          {["Resources", "API", "Pricing", "Log in"].map((item) => (
            <Link
              key={item}
              href={`/${lang}/${
                item === "Log in"
                  ? `auth/${item.toLowerCase().replace(" ", "")}`
                  : item.toLowerCase().replace(" ", "-")
              }`}
              onClick={() => setIsMobileOpen(false)}
              className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              {item}
            </Link>
          ))}
          <Link
            href={`/${lang}/get-started`}
            className="mx-4 my-3 bg-yellow-400 text-center text-black py-2 rounded-md font-semibold"
            onClick={() => setIsMobileOpen(false)}
          >
            Get started
          </Link>
          <div className="flex items-center justify-around py-3 border-t border-neutral-200 dark:border-neutral-800">
            <LangDropdown mobile />
            <ThemeDropdown mobile />
          </div>
        </div>
      )}
    </header>
  );
}
