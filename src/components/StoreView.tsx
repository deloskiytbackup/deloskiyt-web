"use client";

import { useState } from "react";
import Link from "next/link";

export interface StoreProduct {
  id: string;
  name: string;
  description: string | null;
  version: string;
  category: string;
  price: number | null;
  badge: string | null;
  features: string | null;
  videoUrl?: string | null;
  imageUrl?: string | null;
  downloadUrl: string | null;
  createdAt: Date | string;
}

interface StoreViewProps {
  products: StoreProduct[];
}

import { useCart } from "@/context/CartContext";
import { CartButton } from "./CartButton";

export function StoreView({ products }: StoreViewProps) {
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "Wszystkie produkty" },
    { id: "Bot Discord", label: "Boty Discord" },
    { id: "Minecraft", label: "Pluginy Minecraft" },
    { id: "Web Platform & Template", label: "Strony & Szablony WWW" },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "all" ||
      prod.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Pasek Górny Sklepu */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-sm">
              D
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">deloskiyt</span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
              Sklep
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white transition-colors hidden sm:block"
            >
              Strona główna
            </Link>
            <CartButton />
            <Link
              href="/panel-klienta"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
            >
              <span>Panel Klienta</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Sklepu */}
      <section className="relative px-4 sm:px-8 pt-16 pb-12 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Oficjalny Sklep Projektów deloskiyt</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
          Gotowe Boty, Pluginy & Strony WWW
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Kup gotowe, przetestowane rozwiązania z dożywotnią licencją, wsparciem technicznym oraz wbudowaną ochroną kodu.
        </p>

        {/* Wyszukiwarka i Filtry */}
        <div className="pt-8 max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj produktu (np. bot discord, tickety, template)..."
              className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-zinc-950 border border-zinc-850 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all"
            />
            <svg
              className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-white text-black shadow-sm"
                    : "bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista Produktów w Sklepie */}
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto pb-24">
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">Brak produktów spełniających kryteria</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Nie znaleziono pasujących produktów. Sprawdź inne kategorie lub skontaktuj się ze mną na Discordzie, aby zamówić projekt indywidualny.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => {
              const featuresList = prod.features
                ? prod.features.split(";").map((f) => f.trim()).filter(Boolean)
                : [];

              return (
                <div
                  key={prod.id}
                  className="group relative rounded-3xl bg-zinc-950/80 border border-zinc-850 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
                >
                  {/* Podgląd Mediów / Wideo Miniatura */}
                  {(prod.videoUrl || prod.imageUrl) ? (
                    <Link href={`/sklep/${prod.id}`} className="block relative aspect-video w-full overflow-hidden bg-black border-b border-zinc-900 group/img">
                      {prod.imageUrl ? (
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-zinc-950 via-zinc-900 to-black p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-1 group-hover/img:scale-110 transition-transform">
                            <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <span className="text-[11px] font-semibold text-zinc-300">Zobacz Wideo Prezentację</span>
                        </div>
                      )}

                      {prod.videoUrl && (
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-zinc-700 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>WIDEO</span>
                        </span>
                      )}
                    </Link>
                  ) : (
                    <Link href={`/sklep/${prod.id}`} className="block relative h-24 w-full overflow-hidden bg-gradient-to-tr from-zinc-950 to-zinc-900 border-b border-zinc-900 p-4 flex items-center justify-between group/preview">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">Prezentacja</span>
                        <span className="text-xs font-bold text-zinc-300 group-hover/preview:text-white transition-colors">Zobacz szczegóły & demo →</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-zinc-850 flex items-center justify-center text-zinc-400 group-hover/preview:text-white group-hover/preview:bg-zinc-800 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  )}

                  <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Badge & Kategoria */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                          {prod.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {prod.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                              {prod.badge}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                            v{prod.version}
                          </span>
                        </div>
                      </div>

                      {/* Tytuł & Opis */}
                      <div className="space-y-2">
                        <Link href={`/sklep/${prod.id}`}>
                          <h3 className="text-xl font-extrabold text-white hover:text-emerald-400 transition-colors tracking-tight">
                            {prod.name}
                          </h3>
                        </Link>
                        {prod.description && (
                          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                            {prod.description}
                          </p>
                        )}
                      </div>

                      {/* Lista Cech */}
                      {featuresList.length > 0 && (
                        <div className="pt-2 border-t border-zinc-900/80 space-y-2">
                          {featuresList.slice(0, 3).map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                              <svg
                                className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="leading-snug line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dolna Sekcja: Cena & Akcja */}
                  <div className="p-6 sm:p-7 bg-black/40 border-t border-zinc-900 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">
                          Cena jednorazowa
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {prod.price ? `${prod.price.toFixed(2)} PLN` : "Wycena"}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] text-zinc-500 font-medium">
                        Dożywotnia licencja
                      </span>
                    </div>

                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() =>
                          addToCart({
                            id: prod.id,
                            name: prod.name,
                            price: prod.price || 0,
                            version: prod.version,
                            badge: prod.badge,
                            imageUrl: prod.imageUrl,
                          })
                        }
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                          isInCart(prod.id)
                            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                            : "bg-white hover:bg-zinc-200 text-black"
                        }`}
                      >
                        <svg className="w-4 h-4 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span>{isInCart(prod.id) ? "W koszyku ✓" : "Dodaj do koszyka"}</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/sklep/${prod.id}`}
                          className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-white transition-colors text-center flex items-center justify-center gap-1.5"
                        >
                          <span>Szczegóły</span>
                          <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>

                        <a
                          href="https://discord.gg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                        >
                          <span>Discord</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sekcja Gwarancji & Zaufania */}
        <div className="mt-20 pt-16 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white">Legalny Klucz Licencyjny</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Każdy zakup automatycznie generuje unikalny klucz licencyjny powiązany z Twoim kontem w Panelu Klienta deloskiyt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white">Dożywotnie Aktualizacje</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Kupując raz, otrzymujesz dostęp do wszystkich przyszłych wersji i patchy danego oprogramowania bez żadnych subskrypcji.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white">Pomoc przy Instalacji</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pomagam w pełnej konfiguracji na Twoim serwerze (VPS, Pterodactyl, Discloud) oraz podłączeniu bazy danych.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
