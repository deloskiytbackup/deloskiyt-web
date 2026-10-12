"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface LicenseData {
  id?: string;
  productName: string;
  licenseKey: string;
  downloadUrl?: string | null;
  isClaimed?: boolean;
  accountCredentials?: string | null;
}

function SukcesContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<string>("przedmiot");
  const [targetGameNick, setTargetGameNick] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("oplacone");
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [claimedAt, setClaimedAt] = useState<string | null>(null);
  const [accountCredentials, setAccountCredentials] = useState<string | null>(null);
  const [licenses, setLicenses] = useState<LicenseData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Stan odbioru konta
  const [acceptNoRefund, setAcceptNoRefund] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [copiedCreds, setCopiedCreds] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError("Brak identyfikatora sesji płatności Stripe.");
      setIsLoading(false);
      return;
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderNumber(data.orderNumber);
          setOrderType(data.orderType || "przedmiot");
          setTargetGameNick(data.targetGameNick || null);
          setStatus(data.status || "oplacone");
          setIsClaimed(Boolean(data.isClaimed));
          setClaimedAt(data.claimedAt || null);
          setAccountCredentials(data.accountCredentials || null);
          setLicenses(data.licenses || []);
        } else {
          setError(data.error || "Nie udało się zweryfikować sesji płatności.");
        }
      })
      .catch(() => setError("Błąd połączenia z serwerem podczas weryfikacji płatności."))
      .finally(() => setIsLoading(false));
  }, [sessionId]);

  const handleClaimAccount = async () => {
    if (!acceptNoRefund) {
      setClaimError("Musisz zaznaczyć akceptację braku zwrotu, aby odsłonić dane konta.");
      return;
    }

    setIsClaiming(true);
    setClaimError(null);

    try {
      const res = await fetch("/api/orders/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          acceptNoRefund: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsClaimed(true);
        setStatus("odebrane");
        setClaimedAt(data.claimedAt || new Date().toISOString());
        setAccountCredentials(data.accountCredentials || "Brak dodatkowych danych.");
      } else {
        setClaimError(data.error || "Nie udało się odebrać konta.");
      }
    } catch {
      setClaimError("Błąd połączenia z serwerem podczas odbierania konta.");
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-4 sm:p-8">
      <div className="max-w-2xl mx-auto w-full py-12 space-y-8">
        {/* Nagłówek sukcesu */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Płatność Zakończona Sukcesem!
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Dziękujemy za zamówienie w oficjalnym sklepie **deloskiyt**. Twoje zamówienie {orderNumber ? `(#${orderNumber})` : ""} zostało opłacone.
          </p>
        </div>

        {isLoading ? (
          <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-850 text-center">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-zinc-400">Weryfikacja zamówienia i przygotowanie danych...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {/* SEKCJA: KONTO DO GRY (Z ZASADĄ BRAKU ZWROTU) */}
            {orderType === "konto" && (
              <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950 border border-indigo-500/30 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg">
                      🎮
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight">
                        Zamówienie: Konto do gry
                      </h2>
                      <span className="text-[11px] text-zinc-400">
                        {orderNumber ? `Numer zlecenia: #${orderNumber}` : ""}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      isClaimed || status === "odebrane"
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        : "bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse"
                    }`}
                  >
                    {isClaimed || status === "odebrane" ? "ODEBRANE ✓" : "DO ODBIORU"}
                  </span>
                </div>

                {!isClaimed && status !== "odebrane" ? (
                  /* STAN PRZED ODEBRANIEM KシリA */
                  <div className="space-y-4">
                    {/* Ważne pouczenie prawne o braku zwrotu */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Ważne pouczenie o prawie do odstąpienia od umowy</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">
                        Zgodnie z art. 38 pkt 13 Ustawy o prawach konsumenta, kupując treści cyfrowe (dane logowania do konta do gry) i żądając ich natychmiastowego wydania, **tracisz prawo do odstąpienia od umowy oraz zwrotu środków** po odsłonięciu danych.
                      </p>
                    </div>

                    {/* Checkbox akceptacji */}
                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={acceptNoRefund}
                        onChange={(e) => setAcceptNoRefund(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-zinc-700 text-indigo-500 focus:ring-indigo-400 cursor-pointer"
                      />
                      <span className="text-xs text-zinc-200 leading-snug">
                        <strong>Oświadczam, że zapoznałem się z pouczeniem i akceptuję brak prawa do zwrotu</strong> po odebraniu danych logowania do konta. Zobowiązuję się do niezwłocznej zmiany hasła i zabezpieczenia konta.
                      </span>
                    </label>

                    {claimError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {claimError}
                      </div>
                    )}

                    {/* Przycisk Odbierz Konto */}
                    <button
                      onClick={handleClaimAccount}
                      disabled={!acceptNoRefund || isClaiming}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black tracking-wide transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      {isClaiming ? (
                        <span>Zmienianie statusu na Odebrane...</span>
                      ) : (
                        <>
                          <span>Odbierz konto i odsłoń dane logowania</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* STAN PO ODEBRANIU KシリA - DANE UJAWNIONE */
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          Konto zostało pomyślnie odebrane {claimedAt ? `(${new Date(claimedAt).toLocaleString("pl-PL")})` : ""}.
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                        Brak zwrotu
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-white block">
                        Twoje dane logowania do konta:
                      </span>
                      <div className="relative p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
                        <pre className="text-xs font-mono text-zinc-100 whitespace-pre-wrap select-all leading-relaxed">
                          {accountCredentials || "Login i hasło zostały wygenerowane i przypisane do Twojego konta w Panelu Klienta."}
                        </pre>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={copyCredsToClipboard}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer"
                          >
                            {copiedCreds ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-emerald-400">Skopiowano!</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>Kopiuj dane logowania</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                      <p className="font-semibold text-white">Instrukcja po odebraniu:</p>
                      <p>1. Zaloguj się natychmiast na oficjalnej stronie lub w grze.</p>
                      <p>2. Zmień hasło dostępu oraz powiąż swój własny adres e-mail / telefon.</p>
                      <p>3. Włącz uwierzytelnianie dwuskładnikowe (2FA) dla maksymalnego bezpieczeństwa.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEKCJA: PRZEDMIOT W GRZE */}
            {orderType === "przedmiot" && (
              <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950 border border-amber-500/30 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-lg">
                      ⚔️
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight">
                        Zamówienie: Przedmiot w grze
                      </h2>
                      <span className="text-[11px] text-zinc-400">
                        {orderNumber ? `Numer zlecenia: #${orderNumber}` : ""}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    W TRAKCIE REALIZACJI
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-black border border-zinc-850 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Twój Nick / Dane do odbioru w grze:</span>
                    <span className="font-bold font-mono text-emerald-400">
                      {targetGameNick || "Przypisano do konta"}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-zinc-900">
                    Przedmiot zostanie przekazany na serwerze gry na podany nick. Jeśli wymagana jest obecność online, otrzymasz wiadomość w Panelu Klienta lub na Discordzie.
                  </p>
                </div>
              </div>
            )}

            {/* SEKCJA: WYGENEROWANE LICENCJE (DLA BOTÓW / OPROGRAMOWANIA) */}
            {licenses.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-400">
                  Twoje Wygenerowane Licencje ({licenses.length})
                </h3>

                {licenses.map((lic, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{lic.productName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Aktywna (Dożywotnia)
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-zinc-500">Twój Klucz Licencyjny:</span>
                      <div className="flex items-center gap-2">
                        <code className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-400 block w-full select-all">
                          {lic.licenseKey}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(lic.licenseKey);
                            alert("Skopiowano klucz licencji do schowka!");
                          }}
                          className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                        >
                          Kopiuj
                        </button>
                      </div>
                    </div>

                    {lic.downloadUrl && (
                      <div className="pt-2">
                        <a
                          href={lic.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline"
                        >
                          <span>Pobierz paczkę ZIP produktu →</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Przyciski nawigacyjne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <Link
            href="/panel-klienta"
            className="w-full py-3 px-4 rounded-xl bg-white text-black text-xs font-extrabold hover:bg-zinc-200 transition-colors text-center"
          >
            Przejdź do Panelu Klienta
          </Link>
          <Link
            href="/sklep"
            className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold hover:bg-zinc-850 transition-colors text-center"
          >
            Wróć do Sklepu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SukcesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white p-8 text-center text-xs">Ładowanie...</div>}>
      <SukcesContent />
    </Suspense>
  );
}
