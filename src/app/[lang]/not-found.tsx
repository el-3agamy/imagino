"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function LangNotFound() {
  const params = useParams();
  const lang = params.lang;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4 mb-6">Oops! Page not found.</p>

      <Link
        href={`/${lang}`}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
