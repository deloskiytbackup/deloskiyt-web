"use client";

import Link from "next/link";

interface DashboardHeaderMobileProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  unclaimedAccountsCount?: number;
}

export function DashboardHeaderMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  unclaimedAccountsCount = 0,
}: DashboardHeaderMobileProps) {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-850/80 z-30 sticky top-0">
      <Link href="/panel-klienta/produkty" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-sm text-white shadow-sm">
          D
        </div>
        <div>
          <span className="font-bold text-sm text-white block leading-tight">deloskiyt</span>
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">
            Panel Klienta
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        {unclaimedAccountsCount > 0 && (
          <Link
            href="/panel-klienta/konta"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold animate-pulse"
          >
            <span>🎮</span>
            <span>{unclaimedAccountsCount} do odbioru</span>
          </Link>
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
