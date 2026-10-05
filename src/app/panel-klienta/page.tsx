import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { ClientDashboard } from "@/components/ClientDashboard";

export const metadata: Metadata = {
  title: "Panel Klienta",
  description: "Panel Klienta deloskiyt - zlecenia i status projektów.",
};

export default async function PanelKlientaPage() {
  const user = await getSessionUser();

  // Niezalogowany użytkownik jest automatycznie przekierowywany do /login
  if (!user) {
    redirect("/login");
  }

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

        <ClientDashboard user={user} />
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
