"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items, removeFromCart, clearCart, totalAmount, isCartOpen, setIsCartOpen } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Nie udało się rozpocząć płatności.");
      }

      // Wyczyść koszyk przed przekierowaniem
      clearCart();
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas przekierowywania do Stripe.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Tło przyciemniające */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Panel Boczny Koszyka */}
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-850 h-full flex flex-col justify-between p-6 sm:p-7 shadow-2xl z-10 overflow-y-auto">
        <div className="space-y-6">
          {/* Nagłówek */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">Twój Koszyk ({items.length})</h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Lista Produktów */}
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-xs text-zinc-400">Twój koszyk jest pusty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
              >
                Przejdź do przeglądania sklepu
              </button>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-zinc-900">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-800 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-xs font-bold shrink-0">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-[11px] font-semibold text-emerald-400">
                        {item.price ? `${item.price.toFixed(2)} PLN` : "0.00 PLN"}
                      </p>
                      {item.version && (
                        <span className="text-[10px] text-zinc-500 font-mono">v{item.version}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 cursor-pointer"
                    title="Usuń z koszyka"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Podsumowanie i Przycisk Płatności Stripe */}
        {items.length > 0 && (
          <div className="border-t border-zinc-900 pt-5 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Suma do zapłaty:</span>
              <span className="text-base font-extrabold text-white tracking-tight">
                {totalAmount.toFixed(2)} PLN
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-extrabold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Przetwarzanie...</span>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.756 4.992 3.756 7.218c0 4.039 2.467 5.76 6.476 7.219 2.583.92 3.444 1.568 3.444 2.549 0 .992-.872 1.533-2.285 1.533-2.771 0-5.464-1.144-7.228-2.094l-.904 5.54c1.711.833 4.631 1.635 8.136 1.635 2.607 0 4.773-.625 6.299-1.836 1.594-1.272 2.438-3.149 2.438-5.437 0-4.258-2.61-5.952-6.156-7.187z" />
                    </svg>
                    <span>Kup przez Stripe (Karta, BLIK)</span>
                  </>
                )}
              </button>

              <button
                onClick={clearCart}
                className="w-full py-2 text-[11px] text-zinc-500 hover:text-zinc-300 font-medium transition-colors cursor-pointer text-center block"
              >
                Wyczyść koszyk
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
              <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Bezpieczne szyfrowane płatności Stripe</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
