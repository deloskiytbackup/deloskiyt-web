import Link from "next/link";

export function StoreDisabledPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl">
          <svg
            className="w-8 h-8 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v3" />
          </svg>
        </div>

        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">
          Komunikat Sklepu
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Sklep jest obecnie wyłączony
        </h1>

        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          Właściciel tymczasowo wstrzymał przyjmowanie zamówień w sklepie WWW.
          Prowadzimy aktualizację oferty lub przerwę techniczną.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-md active:scale-95"
          >
            Strona główna
          </Link>
          <a
            href="https://discord.gg/deloskiyt"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-sm hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
          >
            Discord
          </a>
        </div>
      </div>
    </div>
  );
}
