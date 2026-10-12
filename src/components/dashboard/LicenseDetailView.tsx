"use client";

import { useState } from "react";
import Link from "next/link";
import { License, Product } from "./types";

interface LicenseDetailViewProps {
  license: License & { product?: Product | null };
}

export function LicenseDetailView({ license }: LicenseDetailViewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Stan odbioru danych konta do gry
  const [isClaimed, setIsClaimed] = useState(Boolean(license.isClaimed));
  const [accountCredentials, setAccountCredentials] = useState(license.accountCredentials || license.product?.accountCredentials || null);
  const [claimedAt, setClaimedAt] = useState<string | null>(license.claimedAt ? String(license.claimedAt) : null);
  const [acceptNoRefund, setAcceptNoRefund] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [copiedCreds, setCopiedCreds] = useState(false);

  const isGameAccount = license.product?.itemType === "konto" || Boolean(accountCredentials);

  const handleClaim = async () => {
    if (!acceptNoRefund) {
      setClaimError("Musisz zaznaczyć akceptację braku prawa do zwrotu, aby odsłonić dane konta.");
      return;
    }
    setIsClaiming(true);
    setClaimError(null);
    try {
      const res = await fetch("/api/orders/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseId: license.id, acceptNoRefund: true }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsClaimed(true);
        setClaimedAt(data.claimedAt || new Date().toISOString());
        setAccountCredentials(data.accountCredentials);
      } else {
        setClaimError(data.error || "Błąd podczas odbierania konta.");
      }
    } catch {
      setClaimError("Błąd połączenia z serwerem.");
    } finally {
      setIsClaiming(false);
    }
  };

  const copyCredsToClipboard = () => {
    if (!accountCredentials) return;
    navigator.clipboard.writeText(accountCredentials);
    setCopiedCreds(true);
    setTimeout(() => setCopiedCreds(false), 2000);
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };


  return (
    <div className="space-y-8 max-w-5xl">
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

        {/* Sekcja konta do gry: Odbiór konta z akceptacją braku zwrotu */}
        {isGameAccount && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-black border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎮</span>
                <h3 className="text-sm font-bold text-white">Dostęp do Konta do Gry</h3>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isClaimed
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse"
              }`}>
                {isClaimed ? "ODEBRANE ✓" : "WYMAGA ODBIORU"}
              </span>
            </div>

            {!isClaimed ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Pouczenie o braku możliwości zwrotu (art. 38 pr. konsumenta)</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    Konto do gry jest treścią cyfrową. Po kliknięciu <strong>„Odbierz konto”</strong> i odsłonięciu danych logowania, <strong>nie przysługuje zwrot ani odstąpienie od umowy</strong>.
                  </p>
                </div>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptNoRefund}
                    onChange={(e) => setAcceptNoRefund(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-zinc-700 text-indigo-500 focus:ring-indigo-400 cursor-pointer"
                  />
                  <span className="text-xs text-zinc-300 leading-snug">
                    <strong>Potwierdzam chęć odebrania danych i akceptuję brak możliwości zwrotu.</strong> Zobowiązuję się do niezwłocznej zmiany hasła po odebraniu.
                  </span>
                </label>

                {claimError && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    {claimError}
                  </div>
                )}

                <button
                  onClick={handleClaim}
                  disabled={!acceptNoRefund || isClaiming}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isClaiming ? "Odbieranie..." : "Odbierz konto i ujawnij dane logowania →"}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
                  <span>Konto odebrane {claimedAt ? `(${new Date(claimedAt).toLocaleString("pl-PL")})` : ""}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Brak zwrotu</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-2">
                  <span className="text-[11px] font-semibold text-zinc-400 block">Dane logowania:</span>
                  <pre className="text-xs font-mono text-zinc-100 whitespace-pre-wrap select-all leading-relaxed">
                    {accountCredentials || "Dane zostały przypisane do Twojego konta."}
                  </pre>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={copyCredsToClipboard}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                      {copiedCreds ? "Skopiowano!" : "Kopiuj dane"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
            <span className="text-white font-medium mt-0.5 block">Plugin / Bot / Server</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Data wygenerowania</span>
            <span className="text-white font-medium mt-0.5 block">
              {new Date(license.createdAt).toLocaleDateString("pl-PL")}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Ostatnie połączenie</span>
            <span className="text-emerald-400 font-medium mt-0.5 block">
              {license.lastConnectedAt
                ? new Date(license.lastConnectedAt).toLocaleString("pl-PL")
                : "Oczekuje na start"}
            </span>
          </div>
        </div>

        {/* Telemetria połączonego serwera */}
        {license.serverIp && (
          <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs bg-zinc-900/30 p-3.5 rounded-xl border border-zinc-900">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-400">Podłączony serwer:</span>
              <code className="text-white font-mono font-semibold">
                {license.serverIp}
                {license.serverPort ? `:${license.serverPort}` : ""}
              </code>
            </div>
            {license.hwid && (
              <span className="text-zinc-500 font-mono text-[11px]">HWID: {license.hwid}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
