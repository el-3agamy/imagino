import { NextResponse } from "next/server";
import { languages, defaultLang } from "@/src/i18n/settings";

export function middleware(req: { nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
  const pathname = req.nextUrl.pathname;

  const hasLang = languages.some((lng) => pathname.startsWith(`/${lng}`));

  if (!hasLang) {
    return NextResponse.redirect(
      new URL(`/${defaultLang}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}
