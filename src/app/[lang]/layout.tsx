import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { languages } from "@/i18n/settings";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import "@/app/globals.css"

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!languages.find((l) => l.code === lang)) {
    redirect("/en");
  }

  return (
    <>
      <Toaster position="top-right" duration={1000} richColors />
      <Navbar />

      <main
        lang={lang}
        className={`flex-1`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
