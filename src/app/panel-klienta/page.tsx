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

  return <ClientDashboard user={user} />;
}
