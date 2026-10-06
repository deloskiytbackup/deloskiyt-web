"use client";

import { useCart } from "@/context/CartContext";

export function CartButton({ className = "" }: { className?: string }) {
  const { itemCount, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer ${className}`}
      title="Otwórz koszyk"
    >
      <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span className="hidden sm:inline">Koszyk</span>
      {itemCount > 0 && (
        <span className="w-5 h-5 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
