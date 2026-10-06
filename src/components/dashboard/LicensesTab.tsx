"use client";

import { useState } from "react";
import Link from "next/link";
import { License } from "./types";

interface LicensesTabProps {
  licenses: License[];
}

export function LicensesTab({ licenses }: LicensesTabProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Moje Licencje
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Zarządzaj swoimi kluczami licencyjnymi, weryfikacją domen i czasem ważności.
        </p>
      </div>

      {/* Lista licencji */}
      {licenses.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-white">Brak aktywnych licencji</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Nie masz jeszcze przypisanych żadnych kluczy licencyjnych. Zakupiony kod i usługi deloskiyt będą automatycznie widoczne na Twoim koncie.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {licenses.map((lic) => (
            <div
              key={lic.id}
              className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{lic.name}</h3>
                    {lic.product && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium">
                        {lic.product.name}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-500 block">
                    Wygenerowano: {new Date(lic.createdAt).toLocaleDateString("pl-PL")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {lic.status === "active" ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      Aktywna
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                      {lic.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Klucz licencji z kopiowaniem */}
              <div className="p-3 rounded-xl bg-black border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-zinc-500 text-xs shrink-0 font-mono">KEY:</span>
                  <code className="text-xs sm:text-sm font-mono text-zinc-200 tracking-wider font-semibold truncate select-all">
                    {lic.licenseKey}
                  </code>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyToClipboard(lic.licenseKey)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
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
                        <span>Kopiuj klucz</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/panel-klienta/licencje/${lic.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
                  >
                    <span>Szczegóły</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
                <span>
                  Ważność: {lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString("pl-PL") : "Dożywotnia (Lifetime)"}
                </span>
                <span>Typ licencji: Commercial Single Use</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
