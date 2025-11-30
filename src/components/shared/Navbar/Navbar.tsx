'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LangDropdown from './LangDropdown';
import ThemeDropdown from './ThemeDropdown';
import { useRouteLang } from '@/hooks/useLang';
import Container from '../Container/Container';
import MobileNav from './MobileNav';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lang = useRouteLang();

  if (pathname.includes('/auth') || pathname.includes('/dashboard')) return null;

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-md dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
        <Container>
          <nav className="flex items-center justify-between py-5">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="Pebblely Logo"
                className="h-6 w-auto"
              />
              <span className="font-semibold text-lg tracking-tight dark:text-white">Pebblely</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href={`/${lang}/resources`} className="hover:opacity-80 transition">
                Resources
              </Link>
              <Link href={`/${lang}/api`} className="hover:opacity-80 transition">
                API
              </Link>
              <Link href={`/${lang}/pricing`} className="hover:opacity-80 transition">
                Pricing
              </Link>
              <Link href={`/${lang}/auth/login`} className="hover:opacity-80 transition">
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

            <div className="flex items-center gap-2 md:hidden">
              <LangDropdown mobile />
              <ThemeDropdown mobile />

              <button
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-nav"
                className="p-2"
                onClick={() => setIsMobileOpen((prev) => !prev)}
              >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      <MobileNav lang={lang} setIsMobileOpen={setIsMobileOpen} isMobileOpen={isMobileOpen} />
    </>
  );
}
