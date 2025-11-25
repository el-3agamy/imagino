"use client";

import { useRouteLang } from "@/hooks/useLang";
import { redirect } from "next/navigation";

export default function AuthPage() {
  const lang = useRouteLang();
  redirect(`/${lang}/auth/login`);
}
