export function ScrollDownArrow({ targetId = "portfolio" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      aria-label="Przejdź do portfolio"
      className="p-3 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white active:scale-95 transition-all touch-manipulation group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors whitespace-nowrap">
        Portfolio
      </span>
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce"
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
