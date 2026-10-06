import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { ClientDashboard } from "@/components/ClientDashboard";

export const metadata: Metadata = {
  title: "Moje Produkty - Panel Klienta | deloskiyt",
  description: "Zarządzaj przypisanymi produktami cyfrowymi, plikami i szablonami.",
};

export default async function ProduktyPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <ClientDashboard user={user} initialTab="products" />;
}
