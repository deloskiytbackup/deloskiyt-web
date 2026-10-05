"use client";

import { useActionState, useState } from "react";
import { loginAction, registerAction } from "@/actions/authActions";

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [loginState, loginDispatch, isLoginPending] = useActionState(loginAction, null);
  const [registerState, registerDispatch, isRegisterPending] = useActionState(registerAction, null);

  const error = mode === "login" ? loginState?.error : registerState?.error;
  const isPending = mode === "login" ? isLoginPending : isRegisterPending;

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
      {/* Przełącznik logowanie / rejestracja */}
      <div className="flex p-1 bg-zinc-900 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            mode === "login"
              ? "bg-white text-black shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Logowanie
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            mode === "register"
              ? "bg-white text-black shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Rejestracja
        </button>
      </div>

      <div className="space-y-1.5 mb-6 text-center sm:text-left">
        <h2 className="text-xl font-bold text-white">
          {mode === "login" ? "Zaloguj się do panelu" : "Utwórz konto klienta"}
        </h2>
        <p className="text-xs text-zinc-400">
          {mode === "login"
            ? "Zarządzaj swoimi zleceniami i sprawdzaj postępy prac."
            : "Załóż bezpłatne konto, aby śledzić realizację projektów."}
        </p>
      </div>

      {error && (
        <div className="p-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
          {error}
        </div>
      )}

      {mode === "login" ? (
        <form action={loginDispatch} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Adres Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="twoj@email.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Hasło</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isPending ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
      ) : (
        <form action={registerDispatch} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Twoje Imię / Nick</label>
            <input
              name="name"
              type="text"
              placeholder="np. Marcel"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Adres Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="twoj@email.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Hasło (min. 6 znaków)</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isPending ? "Rejestracja..." : "Zarejestruj się"}
          </button>
        </form>
      )}
    </div>
  );
}
