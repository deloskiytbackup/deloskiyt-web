"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, License } from "./types";

interface ProductDetailViewProps {
  product: Product & { licenses?: License[] };
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-5 md:p-12 max-w-5xl mx-auto space-y-8 selection:bg-white/20">
      {/* Nawigacja powrotu */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/panel-klienta/produkty"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Wróć do listy produktów</span>
        </Link>

        <span className="text-[11px] font-mono text-zinc-600 bg-zinc-900/60 px-2.5 py-1 rounded-md border border-zinc-850">
          ID: {product.id}
        </span>
      </div>

      {/* Nagłówek produktu */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400">
                {product.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                v{product.version}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
          </div>

          {product.downloadUrl && (
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Pobierz paczkę plików</span>
            </a>
          )}
        </div>

        {product.description && (
          <div className="pt-4 border-t border-zinc-900">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Opis i specyfikacja
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block text-[11px]">Data przypisania</span>
            <span className="text-white font-medium mt-0.5 block">
              {new Date(product.createdAt).toLocaleDateString("pl-PL")}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Wsparcie techniczne</span>
            <span className="text-emerald-400 font-medium mt-0.5 block">Aktywne</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Aktualizacje</span>
            <span className="text-white font-medium mt-0.5 block">Dożywotnie</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Status</span>
            <span className="text-emerald-400 font-medium mt-0.5 block">Zweryfikowany</span>
          </div>
        </div>
      </div>

      {/* Powiązane licencje */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Przypisane Klucze Licencyjne</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Klucze aktywacyjne uprawniające do instalacji i użytkowania tego oprogramowania.
            </p>
          </div>

          <Link
            href="/panel-klienta/licencje"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Zobacz wszystkie licencje →
          </Link>
        </div>

        {product.licenses && product.licenses.length > 0 ? (
          <div className="space-y-3">
            {product.licenses.map((lic) => (
              <div
                key={lic.id}
                className="p-4 rounded-xl bg-black border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{lic.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {lic.status}
                    </span>
                  </div>
                  <code className="text-xs font-mono text-zinc-400 mt-1 block select-all">
                    {lic.licenseKey}
                  </code>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(lic.licenseKey)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
                  >
                    {copiedKey === lic.licenseKey ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-emerald-400">Skopiowano</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Kopiuj</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/panel-klienta/licencje/${lic.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors"
                  >
                    <span>Szczegóły</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-black border border-dashed border-zinc-850 text-center space-y-1">
            <p className="text-xs text-zinc-400">Brak bezpośrednio przypisanych licencji do tego produktu.</p>
            <p className="text-[11px] text-zinc-600">
              Możesz skorzystać ze swoich licencji globalnych w zakładce Moje Licencje.
            </p>
          </div>
        )}
      </div>

      {/* Instrukcja instalacji */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-4">
        <h2 className="text-lg font-bold text-white">Instrukcja instalacji & Uruchomienie</h2>
        <div className="space-y-3 text-xs text-zinc-300">
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
              1
            </span>
            <p className="pt-0.5">Pobierz archiwum plików klikając przycisk <strong>Pobierz paczkę plików</strong>.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
              2
            </span>
            <p className="pt-0.5">Rozpakuj pliki na serwerze lub lokalnym środowisku deweloperskim.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
              3
            </span>
            <p className="pt-0.5">W pliku konfiguracyjnym wpisz swój klucz licencyjny, aby aktywować pełną funkcjonalność.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
