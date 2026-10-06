"use client";

import { useState } from "react";
import { User, DashboardTab } from "./types";

interface OrdersTabProps {
  user: User;
  setActiveTab: (tab: DashboardTab) => void;
}

export function OrdersTab({ user, setActiveTab }: OrdersTabProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Witaj, {user.name || user.email.split("@")[0]} 👋
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Śledź status bieżących projektów oraz zamówień w jednym miejscu.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("new_order")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer w-fit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Nowe Zlecenie</span>
        </button>
      </div>

      {/* Podsumowanie Liczbowe */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">Wszystkie zlecenia</span>
          <span className="text-2xl font-black text-white mt-1 block">{totalOrders}</span>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider block">W trakcie / W kolejce</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">{inProgressOrders}</span>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
          <span className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider block">Ukończone</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">{completedOrders}</span>
        </div>
      </div>

      {/* Filtrowanie i Lista */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-900">
          <h2 className="text-base font-bold text-white">Historia i Postęp Zleceń</h2>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["all", "w_kolejce", "w_trakcie", "do_akceptacji", "zakonczone"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterStatus === st
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                }`}
              >
                {st === "all" ? "Wszystkie" : st.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-850 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white">Brak zarejestrowanych zleceń</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Nie masz jeszcze żadnego aktywnego zlecenia w wybranej kategorii. Złóż formularz, aby rozpocząć realizację projektu.
            </p>
            <button
              onClick={() => setActiveTab("new_order")}
              className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Złóż pierwsze zlecenie
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-500 font-semibold">
                      {order.orderNumber}
                    </span>
                    <h3 className="font-bold text-sm text-white">{order.title}</h3>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {order.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {order.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-900 text-[11px] text-zinc-500">
                  <span>
                    Data zgłoszenia: {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                  </span>
                  {order.price && (
                    <span className="font-bold text-white">
                      Wycena: {order.price} PLN
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
