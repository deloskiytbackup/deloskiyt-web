"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface LicenseData {
  productName: string;
  licenseKey: string;
  downloadUrl?: string | null;
}

function SukcesContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [licenses, setLicenses] = useState<LicenseData[]>([]);
  const [error, setError] = useState<string | null>(null);

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
          setLicenses(data.licenses || []);
        } else {
          setError(data.error || "Nie udało się zweryfikować sesji płatności.");
        }
      })
      .catch(() => setError("Błąd połączenia z serwerem podczas weryfikacji płatności."))
      .finally(() => setIsLoading(false));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-4 sm:p-8">
      <div className="max-w-2xl mx-auto w-full py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Płatność Zakończona Sukcesem!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Dziękujemy za zakup oprogramowania w oficjalnym sklepie **deloskiyt**. Twoje zamówienie {orderNumber ? `(#${orderNumber})` : ""} zostało opłacone.
          </p>
        </div>

        {isLoading ? (
          <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-850 text-center">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-zinc-400">Generowanie Twoich licencji i konfiguracja dostępu...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        ) : (
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
