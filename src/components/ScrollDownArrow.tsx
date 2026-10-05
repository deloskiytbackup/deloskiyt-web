export function ScrollDownArrow({ targetId = "portfolio" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      aria-label="Przejdź do portfolio"
      className="absolute bottom-6 sm:bottom-8 px-4 py-2.5 rounded-full liquid-glass liquid-glass-interactive flex items-center gap-2 text-zinc-400 hover:text-white active:scale-95 transition-all touch-manipulation group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200 transition-colors">
        Portfolio
      </span>
      <svg
        className="w-4 h-4 text-zinc-400 group-hover:text-white animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  );
}
