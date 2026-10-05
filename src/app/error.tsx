"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error if needed
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Wystąpił nieoczekiwany błąd
          </h1>
          <p className="text-sm text-zinc-400">
            Coś poszło nie tak podczas wczytywania strony. Spróbuj odświeżyć stronę lub powrócić do strony głównej.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer"
          >
            Spróbuj ponownie
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold hover:bg-zinc-800 active:scale-95 transition-all"
          >
            Strona główna
          </Link>
        </div>
      </div>
    </main>
  );
}
