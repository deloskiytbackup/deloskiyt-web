"use client";

import { useActionState, useState } from "react";
import { loginAction, registerAction } from "@/actions/authActions";

export function AuthForm({ defaultMode = "login" }: { defaultMode?: "login" | "register" }) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);

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
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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

      {/* Przyciski Google i Discord (wyszarzone / wyłączone) */}
      <div className="space-y-2.5 mb-6">
        {/* Google (Wyłączone) */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Logowanie przez Google jest tymczasowo niedostępne"
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-zinc-500 text-xs font-medium cursor-not-allowed opacity-60 select-none"
        >
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 fill-current opacity-70" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span>{mode === "login" ? "Zaloguj przez Google" : "Zarejestruj przez Google"}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-500 font-semibold">
            Wyłączone
          </span>
        </button>

        {/* Discord (Wyłączone) */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Logowanie przez Discord jest tymczasowo niedostępne"
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-zinc-500 text-xs font-medium cursor-not-allowed opacity-60 select-none"
        >
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 fill-current opacity-70" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>{mode === "login" ? "Zaloguj przez Discord" : "Zarejestruj przez Discord"}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-500 font-semibold">
            Wyłączone
          </span>
        </button>
      </div>

      {/* Rozdzielacz */}
      <div className="relative flex items-center justify-center my-6">
        <div className="w-full border-t border-zinc-800" />
        <span className="absolute px-3 bg-zinc-950 text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
          lub email
        </span>
      </div>

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

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setMode("register")}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Nie masz jeszcze konta? <span className="text-white underline underline-offset-4">Zarejestruj się</span>
            </button>
          </div>
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

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Masz już konto? <span className="text-white underline underline-offset-4">Zaloguj się</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
