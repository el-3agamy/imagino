import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthRootLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full px-4 py-6 flex items-center justify-center"
      style={{backgroundImage: "url(/assets/auth/auth_bg.webp)"}}
    >
      <section
        aria-label="Authentication"
        className="
          w-full max-w-md rounded-3xl
          shadow-[0_18px_45px_rgba(15,23,42,0.18)]
          px-6 py-8
          bg-white sm:px-8 sm:py-10
        "
      >
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            aria-label="Back to home page"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-main hover:underline transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {children}
      </section>
    </div>
  );
}
