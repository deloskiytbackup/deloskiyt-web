"use client";

import { useActionState, useEffect } from "react";
import { createOrderAction } from "@/actions/authActions";
import { DashboardTab } from "./types";

interface NewOrderTabProps {
  setActiveTab: (tab: DashboardTab) => void;
}

export function NewOrderTab({ setActiveTab }: NewOrderTabProps) {
  const [orderState, orderDispatch, isPending] = useActionState(createOrderAction, null);

  useEffect(() => {
    if (orderState?.success) {
      setActiveTab("orders");
    }
  }, [orderState, setActiveTab]);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Złóż Nowe Zlecenie
        </h1>
        <p className="text-xs text-zinc-400">
          Wypełnij formularz. Otrzymasz indywidualną wycenę oraz status zlecenia w panelu.
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
  );
}
