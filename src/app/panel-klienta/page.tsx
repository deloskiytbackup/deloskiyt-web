import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { ClientDashboard } from "@/components/ClientDashboard";

export const metadata: Metadata = {
  title: "Panel Klienta | deloskiyt",
  description: "Panel Klienta deloskiyt - zarządzaj produktami cyfrowymi i licencjami.",
};

export default async function PanelKlientaPage() {
  const user = await getSessionUser();

  // Niezalogowany użytkownik jest automatycznie przekierowywany do /login
  if (!user) {
    redirect("/login");
  }

  return <ClientDashboard user={user} />;
}
