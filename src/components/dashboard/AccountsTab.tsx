"use client";

import { useState } from "react";
import Link from "next/link";
import { Order, License } from "./types";

export interface AccountEntry {
  id: string;
  sourceType: "order" | "license";
  orderNumber?: string;
  orderId?: string;
  licenseId?: string;
  title: string;
  gameNick?: string | null;
  status: string;
  isClaimed: boolean;
  claimedAt?: string | null;
  accountCredentials?: string | null;
  createdAt: string;
}

interface AccountsTabProps {
  orders?: Order[];
  licenses?: License[];
}

export function AccountsTab({ orders = [], licenses = [] }: AccountsTabProps) {
  // Budujemy zunifikowaną listę kont na podstawie zamówień i licencji typu 'konto'
  const accountsMap = new Map<string, AccountEntry>();

  // 1. Zamówienia typu 'konto' lub z poświadczeniami
  orders
    .filter((o) => o.orderType === "konto" || Boolean(o.accountCredentials))
    .forEach((o) => {
      accountsMap.set(o.orderNumber || o.id, {
        id: o.id,
        sourceType: "order",
        orderNumber: o.orderNumber,
        orderId: o.id,
        title: o.title,
        gameNick: o.targetGameNick,
        status: o.status,
        isClaimed: Boolean(o.isClaimed),
        claimedAt: o.claimedAt ? String(o.claimedAt) : null,
        accountCredentials: o.accountCredentials,
        createdAt: String(o.createdAt),
      });
    });

  // 2. Licencje powiązane z kontami
  licenses
    .filter(
      (l) =>
        l.product?.itemType === "konto" ||
        Boolean(l.accountCredentials) ||
        Boolean(l.product?.accountCredentials)
    )
    .forEach((l) => {
      const key = l.licenseKey || l.id;
      // Jeśli już istnieje po numerze zamówienia, możemy powiązać licenseId
      const existing = Array.from(accountsMap.values()).find(
        (acc) =>
          acc.title.toLowerCase() === (l.name || l.product?.name || "").toLowerCase()
      );

      if (existing) {
        existing.licenseId = l.id;
        if (!existing.accountCredentials) {
          existing.accountCredentials = l.accountCredentials || l.product?.accountCredentials;
        }
        if (l.isClaimed) {
          existing.isClaimed = true;
          existing.claimedAt = l.claimedAt ? String(l.claimedAt) : existing.claimedAt;
        }
      } else {
        accountsMap.set(key, {
          id: l.id,
          sourceType: "license",
          licenseId: l.id,
          title: l.name || l.product?.name || "Konto do gry",
          status: l.isClaimed ? "odebrane" : "do_odbioru",
          isClaimed: Boolean(l.isClaimed),
          claimedAt: l.claimedAt ? String(l.claimedAt) : null,
          accountCredentials: l.accountCredentials || l.product?.accountCredentials,
          createdAt: String(l.createdAt),
        });
      }
    });

  const [accounts, setAccounts] = useState<AccountEntry[]>(Array.from(accountsMap.values()));
  const [filter, setFilter] = useState<"all" | "unclaimed" | "claimed">("all");
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [acceptRefundMap, setAcceptRefundMap] = useState<Record<string, boolean>>({});
  const [claimErrors, setClaimErrors] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const unclaimedCount = accounts.filter((a) => !a.isClaimed).length;
  const claimedCount = accounts.filter((a) => a.isClaimed).length;

  const filteredAccounts = accounts.filter((a) => {
    if (filter === "unclaimed") return !a.isClaimed;
    if (filter === "claimed") return a.isClaimed;
    return true;
  });

  const handleClaimAccount = async (acc: AccountEntry) => {
    const isAccepted = acceptRefundMap[acc.id];
    if (!isAccepted) {
      setClaimErrors((prev) => ({
        ...prev,
        [acc.id]: "Zaznacz akceptację braku prawa do zwrotu przed odebraniem danych.",
      }));
      return;
    }

    setClaimingId(acc.id);
    setClaimErrors((prev) => ({ ...prev, [acc.id]: "" }));

    try {
      const payload: {
        acceptNoRefund: boolean;
        orderNumber?: string;
        orderId?: string;
        licenseId?: string;
      } = {
        acceptNoRefund: true,
      };

      if (acc.licenseId) {
        payload.licenseId = acc.licenseId;
      }
      if (acc.orderNumber) {
        payload.orderNumber = acc.orderNumber;
      } else if (acc.orderId) {
        payload.orderId = acc.orderId;
      }

      const res = await fetch("/api/orders/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAccounts((prev) =>
          prev.map((item) =>
            item.id === acc.id
              ? {
                  ...item,
                  isClaimed: true,
                  status: "odebrane",
                  claimedAt: data.claimedAt || new Date().toISOString(),
                  accountCredentials: data.accountCredentials || item.accountCredentials,
                }
              : item
          )
        );
      } else {
        setClaimErrors((prev) => ({
          ...prev,
          [acc.id]: data.error || "Wystąpił błąd podczas odbierania danych konta.",
        }));
      }
    } catch {
      setClaimErrors((prev) => ({
        ...prev,
        [acc.id]: "Błąd połączenia z serwerem. Spróbuj ponownie.",
      }));
    } finally {
      setClaimingId(null);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Nagłówek sekcji */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Moje Konta do Gier</span>
              <span className="text-xl">🎮</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Zarządzaj swoimi kontami do gier, odbieraj dane logowania i zabezpieczaj dostęp.
          </p>
        </div>

        {/* Szybkie liczniki */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
            <span className="text-[11px] text-zinc-400 font-medium">Do odbioru:</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                unclaimedCount > 0
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                  : "bg-zinc-900 text-zinc-500"
              }`}
            >
              {unclaimedCount}
            </span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
            <span className="text-[11px] text-zinc-400 font-medium">Odebrane:</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              {claimedCount}
            </span>
          </div>
        </div>
      </div>

      {/* Pasek filtrów */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-950 border border-zinc-850 w-fit text-xs">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filter === "all"
              ? "bg-white text-black shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Wszystkie ({accounts.length})
        </button>
        <button
          onClick={() => setFilter("unclaimed")}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            filter === "unclaimed"
              ? "bg-amber-400 text-black shadow-sm"
              : "text-zinc-400 hover:text-amber-400"
          }`}
        >
          <span>Do odbioru</span>
          {unclaimedCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          )}
        </button>
        <button
          onClick={() => setFilter("claimed")}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filter === "claimed"
              ? "bg-white text-black shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Odebrane ({claimedCount})
        </button>
      </div>

      {/* Lista kont */}
      {filteredAccounts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-2xl">
            🎮
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {filter === "all"
                ? "Brak kont do gier na Twoim koncie"
                : filter === "unclaimed"
                ? "Brak kont oczekujących na odbiór"
                : "Brak odebranych kont"}
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Zakupione konta (np. Minecraft Full Access, Steam i inne) pojawią się w tej
              zakładce. Będziesz mógł odebrać dane logowania w dowolnym momencie.
            </p>
          </div>
          <Link
            href="/sklep"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
          >
            <span>Przeglądaj Sklep</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAccounts.map((acc) => {
            const isAccepted = Boolean(acceptRefundMap[acc.id]);
            const isBusy = claimingId === acc.id;
            const error = claimErrors[acc.id];

            return (
              <div
                key={acc.id}
                className={`p-6 sm:p-7 rounded-3xl bg-zinc-950 border transition-all ${
                  acc.isClaimed
                    ? "border-zinc-850 hover:border-zinc-700"
                    : "border-amber-500/30 hover:border-amber-500/50 shadow-lg shadow-amber-500/5"
                } space-y-6`}
              >
                {/* Górny pasek karty */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-lg">🎮</span>
                      <h3 className="font-extrabold text-lg text-white tracking-tight">
                        {acc.title}
                      </h3>
                      {acc.orderNumber && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                          Zamówienie: {acc.orderNumber}
                        </span>
                      )}
                      {acc.gameNick && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900/80 border border-zinc-800 text-indigo-400 font-medium">
                          Nick: {acc.gameNick}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-500 block">
                      Data zakupu: {new Date(acc.createdAt).toLocaleDateString("pl-PL")}
                    </span>
                  </div>

                  {/* Badge statusu */}
                  <div>
                    {acc.isClaimed ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Odebrane ✓
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        Do Odbioru
                      </span>
                    )}
                  </div>
                </div>

                {/* Sekcja odbioru lub wyświetlania danych */}
                {!acc.isClaimed ? (
                  <div className="space-y-4 bg-gradient-to-b from-amber-500/5 to-transparent p-5 sm:p-6 rounded-2xl border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="space-y-1 text-xs">
                        <h4 className="font-bold text-amber-300">
                          Pouczenie prawne: Utrata prawa do odstąpienia od umowy (art. 38 pkt 13)
                        </h4>
                        <p className="text-zinc-300 text-[11px] leading-relaxed">
                          Konto do gry jest treścią cyfrową dostarczaną natychmiastowo. Zgodnie z przepisami prawa konsumenckiego, odsłonięcie i odebranie danych logowania oznacza pełne spełnienie świadczenia i <strong>całkowity brak możliwości zwrotu lub odstąpienia od umowy</strong>.
                        </p>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-black/60 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isAccepted}
                        onChange={(e) =>
                          setAcceptRefundMap((prev) => ({
                            ...prev,
                            [acc.id]: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 mt-0.5 rounded border-zinc-700 text-amber-400 focus:ring-amber-400 cursor-pointer"
                      />
                      <span className="text-xs text-zinc-200 leading-snug">
                        <strong>Potwierdzam chęć natychmiastowego odebrania danych konta</strong> i przyjmuję do wiadomości, że tracę prawo do odstąpienia od umowy. Zobowiązuję się do niezwłocznej zmiany hasła.
                      </span>
                    </label>

                    {error && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={() => handleClaimAccount(acc)}
                      disabled={!isAccepted || isBusy}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-extrabold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isBusy ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>Odsłanianie danych...</span>
                        </>
                      ) : (
                        <>
                          <span>Odbierz dane konta i ujawnij poświadczenia</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-black border border-zinc-850 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                          Poświadczenia i dane dostępowe:
                        </span>
                        <div className="flex items-center gap-2">
                          {acc.claimedAt && (
                            <span className="text-[10px] text-zinc-500">
                              Odebrano: {new Date(acc.claimedAt).toLocaleString("pl-PL")}
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Brak zwrotu
                          </span>
                        </div>
                      </div>

                      <pre className="text-xs sm:text-sm font-mono text-zinc-100 bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 whitespace-pre-wrap select-all leading-relaxed">
                        {acc.accountCredentials || "Dane logowania zostały przypisane do Twojego konta."}
                      </pre>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-zinc-500">
                          Zapisz dane w bezpiecznym miejscu (menedżer haseł).
                        </span>
                        <button
                          onClick={() => copyToClipboard(acc.accountCredentials || "", acc.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                        >
                          {copiedId === acc.id ? (
                            <>
                              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Skopiowano dane!</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span>Kopiuj wszystkie dane</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Zalecenia bezpieczeństwa po odbiorze */}
                    <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-850/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">1.</span>
                        <span className="text-zinc-400 text-[11px]">
                          <strong>Zmień hasło:</strong> Zaloguj się natychmiast na oficjalnej stronie gry i ustaw nowe, silne hasło.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">2.</span>
                        <span className="text-zinc-400 text-[11px]">
                          <strong>E-mail pomocniczy:</strong> Ustaw swój prywatny adres e-mail jako jedyny adres do odzyskiwania.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">3.</span>
                        <span className="text-zinc-400 text-[11px]">
                          <strong>Włącz 2FA:</strong> Aktywuj weryfikację dwuetapową (Google Authenticator / SMS) dla maksymalnego bezpieczeństwa.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
