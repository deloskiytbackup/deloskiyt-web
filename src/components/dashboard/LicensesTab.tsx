"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { License, Product } from "./types";

interface LicensesTabProps {
  licenses: License[];
  setLicenses: React.Dispatch<React.SetStateAction<License[]>>;
  products: Product[];
}

export function LicensesTab({ licenses, setLicenses, products }: LicensesTabProps) {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Formularz nowej licencji
  const [name, setName] = useState("");
  const [productId, setProductId] = useState("");

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/licenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          productId: productId || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.license) {
        setLicenses((prev) => [data.license, ...prev]);
        setShowAddModal(false);
        setName("");
        setProductId("");
        router.refresh();
      } else {
        alert(data.error || "Wystąpił błąd.");
      }
    } catch {
      alert("Błąd połączenia z serwerem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Moje Licencje
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Zarządzaj swoimi kluczami licencyjnymi, weryfikacją domen i czasem ważności.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer w-fit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Wygeneruj / Aktywuj klucz</span>
        </button>
      </div>

      {/* Modal dodawania licencji */}
      {showAddModal && (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Wygeneruj nowy klucz licencyjny</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-zinc-500 hover:text-white text-xs cursor-pointer"
            >
              ✕ Zamknij
            </button>
          </div>
          <form onSubmit={handleCreateLicense} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Nazwa licencji / Projekt *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="np. Licencja Komercyjna - Moja Strona"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Powiązany produkt (opcjonalnie)</label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-500"
                >
                  <option value="">-- Wybierz produkt --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Generowanie..." : "Generuj klucz licencji"}
            </button>
          </form>
        </div>
      )}

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
            Każdy zakupiony skrypt lub oprogramowanie deloskiyt posiada unikalny klucz licencyjny chroniący Twoją instalację.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Wygeneruj klucz testowy
          </button>
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

                <button
                  onClick={() => copyToClipboard(lic.licenseKey)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer shrink-0"
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
