"use client";

import { useState } from "react";
import Link from "next/link";
import { License, Product } from "./types";

interface LicenseDetailViewProps {
  license: License & { product?: Product | null };
}

export function LicenseDetailView({ license }: LicenseDetailViewProps) {
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
          href="/panel-klienta/licencje"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Wróć do listy licencji</span>
        </Link>

        <span className="text-[11px] font-mono text-zinc-600 bg-zinc-900/60 px-2.5 py-1 rounded-md border border-zinc-850">
          ID: {license.id}
        </span>
      </div>

      {/* Nagłówek licencji */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              {license.status === "active" ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Aktywna & Ważna
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                  {license.status}
                </span>
              )}

              {license.product && (
                <Link
                  href={`/panel-klienta/produkty/${license.product.id}`}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  Produkt: {license.product.name} →
                </Link>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {license.name}
            </h1>
          </div>
        </div>

        {/* Klucz licencji */}
        <div className="p-4 sm:p-6 rounded-2xl bg-black border border-zinc-850 space-y-3">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
            Twój unikalny klucz aktywacyjny
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <code className="text-base sm:text-xl font-mono text-zinc-100 font-bold tracking-wider select-all break-all">
              {license.licenseKey}
            </code>

            <button
              onClick={() => copyToClipboard(license.licenseKey)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
            >
              {copiedKey === license.licenseKey ? (
                <>
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Skopiowano do schowka</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Kopiuj klucz</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informacje szczegółowe */}
        <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block text-[11px]">Ważność</span>
            <span className="text-white font-medium mt-0.5 block">
              {license.expiresAt ? new Date(license.expiresAt).toLocaleDateString("pl-PL") : "Dożywotnia (Lifetime)"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Typ licencji</span>
            <span className="text-white font-medium mt-0.5 block">Standard Commercial</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Data wygenerowania</span>
            <span className="text-white font-medium mt-0.5 block">
              {new Date(license.createdAt).toLocaleDateString("pl-PL")}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Dozwolone instancje</span>
            <span className="text-emerald-400 font-medium mt-0.5 block">1 Domena / Projekt</span>
          </div>
        </div>
      </div>

      {/* Integracja & API */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-4">
        <h2 className="text-lg font-bold text-white">Weryfikacja Licencji w Kodzie</h2>
        <p className="text-xs text-zinc-400">
          Możesz zweryfikować ważność tego klucza bezpośrednio w swojej aplikacji lub skrypcie:
        </p>

        <div className="p-4 rounded-xl bg-black border border-zinc-900 font-mono text-xs text-zinc-300 overflow-x-auto">
          <code>
            {`// Przykład walidacji klucza licencji
const response = await fetch("https://deloskiyt-web.vercel.app/api/licenses", {
  headers: {
    "X-License-Key": "${license.licenseKey}"
  }
});`}
          </code>
        </div>
      </div>
    </div>
  );
}
