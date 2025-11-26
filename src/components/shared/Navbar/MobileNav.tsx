import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MobileNavProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (x: boolean) => void;
  lang: string;
}

export default function MobileNav({
  isMobileOpen,
  setIsMobileOpen,
  lang,
}: MobileNavProps) {
  return (
    <div
      id="mobile-nav"
      className={`
        fixed inset-0 z-[60] md:hidden
        bg-white dark:bg-neutral-900
        transform transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
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
          <button
            aria-label="Close menu"
            className="p-2"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          {["Resources", "API", "Pricing", "Log in"].map((item) => (
            <Link
              key={item}
              href={`/${lang}/${
                item === "Log in"
                  ? "auth/login"
                  : item === "API"
                  ? "api"
                  : item.toLowerCase().replace(" ", "-")
              }`}
              onClick={() => setIsMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              {item}
            </Link>
          ))}

          <Link
            href={`/${lang}/get-started`}
            className="mx-4 mt-3 mb-4 bg-yellow-400 text-center text-black py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
            onClick={() => setIsMobileOpen(false)}
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
