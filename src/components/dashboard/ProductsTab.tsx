"use client";

import Link from "next/link";
import { Product } from "./types";

interface ProductsTabProps {
  products: Product[];
}

export function ProductsTab({ products }: ProductsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Moje Produkty
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Dostęp do zakupionych plików, aktualizacji oprogramowania i dokumentacji technicznej.
        </p>
      </div>

      {/* Lista produktów */}
      {products.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-white">Brak aktywnych produktów</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Nie masz jeszcze przypisanych żadnych produktów cyfrowych do tego konta. Po zakupie oprogramowania lub szablonu natychmiast uzyskasz do nich dostęp.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
                      {prod.category}
                    </span>
                    <h3 className="font-bold text-base text-white mt-0.5">{prod.name}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                    v{prod.version}
                  </span>
                </div>

                {prod.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-3">
                <span className="text-[11px] text-zinc-500">
                  Dodano: {new Date(prod.createdAt).toLocaleDateString("pl-PL")}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/panel-klienta/produkty/${prod.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Szczegóły</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {prod.downloadUrl && (
                    <a
                      href={prod.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Pobierz</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
