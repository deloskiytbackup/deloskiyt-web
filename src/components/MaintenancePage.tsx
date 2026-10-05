import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export function MaintenancePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 sm:p-12 select-none">
      <div />

      <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-8 my-auto">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Prace Modernizacyjne w Toku</span>
        </div>

        {/* Tytuł i Opis */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Zmieniamy się na lepsze
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto">
            Pracujemy nad nowymi projektami, ulepszeniami i odświeżeniem serwisu. Wkrótce wracamy w nowej odsłonie!
          </p>
        </div>

        {/* Social Linki na czas przerwy */}
        <div className="pt-4 space-y-3">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            Bądź na bieżąco
          </p>
          <SocialLinks />
        </div>
      </div>

      {/* Dolny pasek z dostępem do panelu klienta */}
      <footer className="w-full max-w-4xl pt-8 border-t border-zinc-900 text-xs text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} deloskiyt</span>
        <div className="flex items-center gap-6">
          <Link
            href="/panel-klienta"
            className="hover:text-zinc-300 transition-colors underline-offset-4 hover:underline"
          >
            Strefa Klienta (Panel)
          </Link>
          <span className="text-zinc-800">•</span>
          <Link
            href="/regulamin"
            className="hover:text-zinc-300 transition-colors underline-offset-4 hover:underline"
          >
            Regulamin
          </Link>
        </div>
      </footer>
    </main>
  );
}
