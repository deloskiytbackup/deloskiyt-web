export function ScrollDownArrow({ targetId = "portfolio" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      aria-label="Przejdź do portfolio"
      className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors group cursor-pointer"
    >
      <span className="text-xs uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
        Portfolio
      </span>
      <svg
        className="w-6 h-6 animate-bounce"
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
