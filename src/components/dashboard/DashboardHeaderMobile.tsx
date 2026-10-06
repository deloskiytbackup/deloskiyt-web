"use client";

interface DashboardHeaderMobileProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function DashboardHeaderMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
}: DashboardHeaderMobileProps) {
  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-850 z-30 sticky top-0">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-sm">
          D
        </div>
        <div>
          <span className="font-bold text-sm text-white block">deloskiyt</span>
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Panel Klienta</span>
        </div>
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </header>
  );
}
