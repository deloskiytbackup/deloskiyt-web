import Link from "next/link";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { ClientDashboard } from "@/components/ClientDashboard";

export const metadata: Metadata = {
  title: "Panel Klienta",
  description: "Panel Klienta deloskiyt - logowanie, rejestracja i status zleceń.",
};

export default async function PanelKlientaPage() {
  const user = await getSessionUser();

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 py-12 sm:py-20 max-w-4xl mx-auto w-full flex flex-col justify-between">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500 hover:text-white transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Powrót na stronę główną</span>
        </Link>

        {user ? (
          <ClientDashboard user={user} />
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Strefa Klienta
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Panel Klienta
              </h1>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Zaloguj się lub zarejestruj, aby śledzić realizację swoich zleceń w czasie rzeczywistym.
              </p>
            </div>

            <AuthForm />
          </div>
        )}
      </div>

      <footer className="mt-16 pt-8 border-t border-zinc-900 text-xs text-zinc-600 flex justify-between">
        <span>© {new Date().getFullYear()} deloskiyt</span>
        <Link href="/" className="hover:text-white transition-colors">
          deloskiyt-web
        </Link>
      </footer>
    </main>
  );
}
