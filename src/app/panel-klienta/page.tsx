import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Klienta",
  description: "Panel Klienta deloskiyt - sprawdzanie statusu zamówienia i realizacja zleceń.",
};

export default function PanelKlientaPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 py-16 sm:py-24 max-w-4xl mx-auto w-full flex flex-col justify-between">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Powrót na stronę główną</span>
        </Link>

        <div className="space-y-3 mb-10">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            Strefa Zleceń
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Panel Klienta
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
            Sprawdź status swojego projektu, pobierz gotowe pliki lub skontaktuj się w sprawie trwającego zlecenia.
          </p>
        </div>

        {/* Formularz sprawdzania statusu */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 mb-8 space-y-5">
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold text-white">
              Sprawdź status zamówienia
            </h2>
            <p className="text-xs text-zinc-400">
              Wpisz identyfikator zlecenia otrzymany na Discordzie lub mailu (np. <code className="text-zinc-300">#ORD-2026</code>).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Wpisz ID zlecenia..."
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer select-none"
            >
              Sprawdź status
            </button>
          </div>
        </div>

        {/* Sekcja szybkiej pomocy / ticket na discordzie */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">
              Potrzebujesz pilnego kontaktu lub nowego zlecenia?
            </h3>
            <p className="text-xs text-zinc-400">
              Otwórz ticket bezpośrednio na serwerze Discord.
            </p>
          </div>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold transition-colors"
          >
            <span>Otwórz Ticket Discord</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-zinc-900 text-xs text-zinc-600 flex justify-between">
        <span>© {new Date().getFullYear()} deloskiyt</span>
        <Link href="/" className="hover:text-white transition-colors">
          deloskiyt-web
        </Link>
      </footer>
    </main>
  );
}
