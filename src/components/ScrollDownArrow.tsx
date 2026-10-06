"use client";

import { motion } from "framer-motion";

export function ScrollDownArrow({ targetId = "portfolio" }: { targetId?: string }) {
  return (
    <motion.a
      href={`#${targetId}`}
      aria-label="Przejdź do portfolio"
      whileHover={{ y: 2 }}
      className="p-3 flex flex-col items-center gap-2 text-zinc-500 hover:text-white active:scale-95 transition-colors touch-manipulation group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors whitespace-nowrap font-medium">
        Portfolio
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="p-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/50 group-hover:border-zinc-700 transition-colors"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.a>
  );
}
