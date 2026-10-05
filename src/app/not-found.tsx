import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <span className="text-7xl sm:text-9xl font-black tracking-tighter text-zinc-800">
          404
        </span>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Nie znaleziono strony
          </h1>
          <p className="text-sm text-zinc-400">
            Strona, której szukasz, nie istnieje lub została przeniesiona pod inny adres.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 active:scale-95 transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Wróć na stronę główną</span>
        </Link>
      </div>
    </main>
  );
}
