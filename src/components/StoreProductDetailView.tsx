"use client";

import Link from "next/link";
import { StoreProduct } from "./StoreView";

import { useCart } from "@/context/CartContext";
import { CartButton } from "./CartButton";

interface StoreProductDetailViewProps {
  product: StoreProduct;
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    if (url.includes("youtube.com/watch")) {
      const v = new URL(url).searchParams.get("v");
      return v ? `https://www.youtube-nocookie.com/embed/${v}?autoplay=1&mute=1` : null;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function StoreProductDetailView({ product }: StoreProductDetailViewProps) {
  const { addToCart, isInCart } = useCart();
  const ytEmbed = product.videoUrl ? getYouTubeEmbedUrl(product.videoUrl) : null;
  const isDirectVideo =
    product.videoUrl &&
    (product.videoUrl.endsWith(".mp4") ||
      product.videoUrl.endsWith(".webm") ||
      product.videoUrl.includes("video") ||
      !ytEmbed);

  const featuresList = product.features
    ? product.features.split(";").map((f) => f.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Pasek nawigacyjny */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/sklep"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Wróć do sklepu</span>
          </Link>

          <div className="flex items-center gap-3">
            <CartButton />
            <Link
              href="/panel-klienta"
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-colors"
            >
              Panel Klienta
            </Link>
          </div>
        </div>
      </header>

      {/* Główna Zawartość Produktu */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12 pb-24">
        {/* Nagłówek Produktu */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-zinc-900">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400">
                {product.category}
              </span>
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  {product.badge}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                v{product.version}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Karta Cenowa & Zakup */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-850 shrink-0 w-full md:w-80 space-y-4">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">
                Cena zakupu
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white mt-0.5">
                {product.price ? `${product.price.toFixed(2)} PLN` : "Wycena"}
              </div>
              <span className="text-xs text-emerald-400 font-semibold block mt-1">
                ✔ Dożywotnia licencja komercyjna
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price || 0,
                    version: product.version,
                    badge: product.badge,
                    imageUrl: product.imageUrl,
                  })
                }
                className={`w-full py-3.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] ${
                  isInCart(product.id)
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                <svg className="w-4 h-4 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>{isInCart(product.id) ? "W koszyku ✓" : "Kup przez Stripe"}</span>
              </button>

              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span>Kup przez Discord Ticket</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sekcja Miniatury Wideo / Prezentacji Projektu */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Wideo Prezentacja & Podgląd Projektu</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold uppercase tracking-wider">
                Preview
              </span>
            </h2>
            <span className="text-xs text-zinc-500">Live Demo</span>
          </div>

          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-850 shadow-2xl flex items-center justify-center">
            {ytEmbed ? (
              <iframe
                src={ytEmbed}
                title="Wideo Prezentacja"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : product.videoUrl && isDirectVideo ? (
              <video
                src={product.videoUrl}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Domyślny, efektowny podgląd graficzno-wideo jeśli brak wgranego linku */
              <div className="p-8 text-center space-y-4 max-w-lg">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Podgląd Multimedialny Projektu</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Prezentacja działania bota, komend i panelu WWW w czasie rzeczywistym.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-900/80 px-3 py-1.5 rounded-xl border border-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Weryfikacja licencji: deloskiyt API v1</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Szczegółowy Opis & Możliwości */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-4">
              <h3 className="text-base font-bold text-white">Szczegółowy Opis Projektu</h3>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {product.description || "Brak szczegółowego opisu dla tego produktu."}
              </p>
            </div>

            {/* Kluczowe Funkcje */}
            {featuresList.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-4">
                <h3 className="text-base font-bold text-white">Wszystkie Funkcje w Zestawie</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuresList.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-black border border-zinc-850 flex items-start gap-3"
                    >
                      <svg
                        className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs font-medium text-zinc-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Jak wygląda proces po zakupie */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Jak wygląda proces po zakupie?
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    1
                  </span>
                  <div>
                    <h5 className="font-bold text-white">Discord Ticket</h5>
                    <p className="text-zinc-400 mt-0.5">Otwórz zgłoszenie i opłać zamówienie (BLIK, PSC, Przelew, PayPal).</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    2
                  </span>
                  <div>
                    <h5 className="font-bold text-white">Dostęp w Panelu Klienta</h5>
                    <p className="text-zinc-400 mt-0.5">Automatycznie otrzymujesz przypisany produkt i unikalny klucz licencyjny.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    3
                  </span>
                  <div>
                    <h5 className="font-bold text-white">Gotowy do Uruchomienia</h5>
                    <p className="text-zinc-400 mt-0.5">Pobierasz zabezpieczoną paczkę, wpisujesz swój klucz w config i bot działa od razu!</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900">
                <Link
                  href="/panel-klienta"
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-white transition-colors block text-center"
                >
                  Przejdź do Panelu Klienta →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
