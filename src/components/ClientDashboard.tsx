"use client";

import { useActionState, useState } from "react";
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
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [orderState, orderDispatch, isPending] = useActionState(createOrderAction, null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "w_kolejce":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">W kolejce</span>;
      case "w_trakcie":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">W realizacji</span>;
      case "do_akceptacji":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">Do akceptacji</span>;
      case "zakonczone":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Zakończone</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-300">{status}</span>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Pasek górny profilu */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Zalogowano pomyślnie
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Witaj, {user.name || user.email}!
          </h2>
          <p className="text-xs text-zinc-400 mt-1">{user.email}</p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white text-zinc-400 text-xs font-semibold transition-all cursor-pointer"
          >
            Wyloguj się
          </button>
        </form>
      </div>

      {/* Akcje: Dodaj nowe zlecenie */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Twoje Zlecenia</h3>
          <p className="text-xs text-zinc-400">
            Śledź status swoich projektów powiązanych z kontem.
          </p>
        </div>

        <button
          onClick={() => setShowNewOrder(!showNewOrder)}
          className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer"
        >
          {showNewOrder ? "Anuluj" : "+ Dodaj nowe zlecenie"}
        </button>
      </div>

      {/* Formularz nowego zlecenia */}
      {showNewOrder && (
        <form
          action={async (formData) => {
            await orderDispatch(formData);
            setShowNewOrder(false);
          }}
          className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4"
        >
          <h4 className="text-sm font-bold text-white">Nowe zlecenie / zapytanie</h4>
          {orderState?.error && (
            <p className="text-xs text-red-400">{orderState.error}</p>
          )}
          <input
            name="title"
            required
            placeholder="Tytuł projektu (np. Montaż vloga, Strona internetowa)..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          <textarea
            name="description"
            rows={3}
            placeholder="Krótki opis oczekiwań, materiałów lub link do dysku..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isPending ? "Zapisywanie..." : "Wyślij zgłoszenie"}
          </button>
        </form>
      )}

      {/* Lista zleceń */}
      {user.orders.length === 0 ? (
        <div className="p-12 rounded-3xl bg-zinc-950/40 border border-dashed border-zinc-800 text-center space-y-3">
          <p className="text-sm text-zinc-400">
            Nie masz jeszcze żadnych aktywnych zleceń.
          </p>
          <button
            onClick={() => setShowNewOrder(true)}
            className="text-xs text-white underline underline-offset-4 hover:text-zinc-300"
          >
            Złóż swoje pierwsze zapytanie
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {user.orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-zinc-500">
                    #{order.orderNumber}
                  </span>
                  {getStatusBadge(order.status)}
                </div>
                <h4 className="text-base font-bold text-white">{order.title}</h4>
                {order.description && (
                  <p className="text-xs text-zinc-400 max-w-xl">
                    {order.description}
                  </p>
                )}
              </div>

              <div className="text-right text-xs text-zinc-500">
                <span>{new Date(order.createdAt).toLocaleDateString("pl-PL")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
