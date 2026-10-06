import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { ClientDashboard } from "@/components/ClientDashboard";

export const metadata: Metadata = {
  title: "Moje Licencje - Panel Klienta | deloskiyt",
  description: "Zarządzaj swoimi kluczami licencyjnymi i aktywnymi produktami deloskiyt.",
};

export default async function LicencjePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <ClientDashboard user={user} initialTab="licenses" />;
}
