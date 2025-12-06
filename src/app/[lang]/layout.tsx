'use client';

import '@/app/globals.css';
import AppInit from '@/components/shared/AppInit/AppInit';
import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import { useRouteLang } from '@/hooks/useLang';
import { languages } from '@/i18n/settings';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';

export default function LangLayout({ children }: { children: React.ReactNode }) {
  const lang = useRouteLang();
  const router = useRouter();

  if (!languages.find((l) => l.code === lang)) {
    router.replace('/en');
  }

  return (
    <>
      <AppInit />
      <Toaster position="top-right" duration={1000} richColors />
      <Navbar />

      <main lang={lang} className={`flex-1`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </main>
      <Footer />
    </>
  );
}
