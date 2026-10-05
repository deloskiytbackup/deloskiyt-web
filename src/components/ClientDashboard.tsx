"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { logoutAction, createOrderAction } from "@/actions/authActions";

interface Order {
  id: string;
  orderNumber: string;
  title: string;
  description: string | null;
  status: string;
  price: number | null;
  createdAt: Date;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  orders: Order[];
}

export function ClientDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<"orders" | "new_order" | "support">("orders");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [orderState, orderDispatch, isPending] = useActionState(createOrderAction, null);

  useEffect(() => {
    if (orderState?.success) {
      setActiveTab("orders");
    }
  }, [orderState]);

  const totalOrders = user.orders.length;
  const inProgressOrders = user.orders.filter(
    (o) => o.status === "w_trakcie" || o.status === "w_kolejce"
  ).length;
  const completedOrders = user.orders.filter((o) => o.status === "zakonczone").length;

  const filteredOrders = user.orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "w_kolejce":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
            W kolejce
          </span>
        );
      case "w_trakcie":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
            W realizacji
          </span>
        );
      case "do_akceptacji":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">
            Do akceptacji
          </span>
        );
      case "zakonczone":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            Zakończone
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row w-full selection:bg-white/20">
      {/* PASEK MOBILNY (WIDOCZNY TYLKO NA TELEFONACH) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-850 z-30 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-sm">
            D
          </div>
          <div>
            <span className="font-bold text-sm text-white block">deloskiyt</span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Panel Klienta</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* SIDEBAR (DESKTOP + MOBILNY PO ROZWINIĘCIU) */}
      <aside
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col justify-between w-full md:w-64 md:min-w-[16rem] bg-zinc-950 border-r border-zinc-850 p-5 md:min-h-screen fixed md:sticky top-0 z-20 h-auto md:h-screen`}
      >
        <div className="space-y-6">
          {/* Logo i Tytuł Sidebara */}
          <div className="hidden md:flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-base shadow-sm">
              D
            </div>
            <div>
              <span className="font-bold text-base text-white block tracking-tight">deloskiyt</span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-medium">
                Panel Klienta
              </span>
            </div>
          </div>

          {/* Nawigacja w Sidebarze */}
          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveTab("orders");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Twoje Zlecenia</span>
              {totalOrders > 0 && (
                <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === "orders" ? "bg-zinc-200 text-black" : "bg-zinc-900 text-zinc-400"
                }`}>
                  {totalOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("new_order");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "new_order"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Nowe Zlecenie</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("support");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "support"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Wsparcie & Discord</span>
            </button>
          </nav>

          {/* Linki Zewnętrzne / Pomocnicze */}
          <div className="pt-4 border-t border-zinc-900 space-y-1">
            <span className="px-3 text-[10px] uppercase tracking-wider text-zinc-600 font-bold block mb-1">
              Przydatne linki
            </span>
            <Link
              href="/regulamin"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/40 transition-colors"
            >
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Regulamin zleceń</span>
            </Link>

            <Link
              href="/"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/40 transition-colors"
            >
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Strona główna</span>
            </Link>
          </div>
        </div>

        {/* Profil i Wylogowanie w dole sidebara */}
        <div className="pt-4 border-t border-zinc-900 mt-6">
          <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 mb-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center font-bold text-white text-sm shrink-0">
              {(user.name || user.email)[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold text-xs text-white block truncate">
                {user.name || user.email.split("@")[0]}
              </span>
              <span className="text-[10px] text-zinc-500 block truncate">
                {user.email}
              </span>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 border border-zinc-800 text-zinc-400 text-xs font-semibold transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Wyloguj się</span>
            </button>
          </form>
        </div>
      </aside>

      {/* GŁÓWNA ZAWARTOŚĆ (PO PRAWEJ STRONIE) */}
      <main className="flex-1 p-5 sm:p-8 md:p-10 max-w-6xl w-full">
        {/* STATYSTYKI NA GÓRZE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
              Wszystkie Zlecenia
            </span>
            <span className="text-3xl font-black text-white">{totalOrders}</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
              W Realizacji
            </span>
            <span className="text-3xl font-black text-blue-400">{inProgressOrders}</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
              Zakończone
            </span>
            <span className="text-3xl font-black text-emerald-400">{completedOrders}</span>
          </div>
        </div>

        {/* ZAKŁADKA 1: LISTA ZLECEŃ */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Twoje Zlecenia
                </h1>
                <p className="text-xs text-zinc-400">
                  Przeglądaj historię i aktualny postęp prac nad Twoimi projektami.
                </p>
              </div>

              {/* Filtry statusów */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-850 rounded-xl">
                {[
                  { id: "all", label: "Wszystkie" },
                  { id: "w_kolejce", label: "W kolejce" },
                  { id: "w_trakcie", label: "W toku" },
                  { id: "zakonczone", label: "Gotowe" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterStatus(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      filterStatus === f.id
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista zleceń */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 sm:p-16 rounded-3xl bg-zinc-950/60 border border-dashed border-zinc-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Brak zleceń w tej kategorii</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                    Nie posiadasz jeszcze projektów o wybranym statusie.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("new_order")}
                  className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer"
                >
                  Złóż nowe zlecenie teraz
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                          #{order.orderNumber}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <h4 className="text-lg font-bold text-white">{order.title}</h4>
                      {order.description && (
                        <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                          {order.description}
                        </p>
                      )}
                    </div>

                    <div className="text-left sm:text-right text-xs text-zinc-500 whitespace-nowrap">
                      <span>Złożono: {new Date(order.createdAt).toLocaleDateString("pl-PL")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ZAKŁADKA 2: NOWE ZLECENIE */}
        {activeTab === "new_order" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Nowe Zlecenie
              </h1>
              <p className="text-xs text-zinc-400">
                Wypełnij poniższy formularz, aby rozpocząć realizację projektu.
              </p>
            </div>

            <form
              action={orderDispatch}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-5"
            >
              {orderState?.error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                  {orderState.error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Tytuł zlecenia / Nazwa projektu
                </label>
                <input
                  name="title"
                  required
                  placeholder="np. Montaż odcinka YouTube, Konfiguracja Discorda..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Szczegółowy opis & Link do materiałów
                </label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="Opisz oczekiwania, preferowany styl, format i wklej ewentualny link do dysku Google / WeTransfer..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 disabled:opacity-50 active:scale-95 transition-all cursor-pointer"
              >
                {isPending ? "Zapisywanie w bazie..." : "Wyślij zgłoszenie zlecenia"}
              </button>
            </form>
          </div>
        )}

        {/* ZAKŁADKA 3: WSPARCIE & DISCORD */}
        {activeTab === "support" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Wsparcie & Pomoc
              </h1>
              <p className="text-xs text-zinc-400">
                Masz pytania do swojego zamówienia? Skontaktuj się ze mną bezpośrednio.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">System Ticketów Discord</h3>
                  <p className="text-xs text-zinc-400">Najszybsza forma kontaktu w sprawie bieżących zleceń.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <p>1. Dołącz do oficjalnego serwera Discord.</p>
                <p>2. Wejdź na kanał <code className="text-white bg-zinc-900 px-2 py-0.5 rounded">#pomoc-ticket</code> i utwórz zgłoszenie.</p>
                <p>3. Podaj numer swojego zlecenia (np. <code className="text-white bg-zinc-900 px-2 py-0.5 rounded">#ORD-xxxx</code>), aby natychmiast otrzymać odpowiedź.</p>
              </div>

              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition-colors"
              >
                <span>Przejdź do Discorda</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
