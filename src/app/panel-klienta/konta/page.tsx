import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { AccountsTab } from "@/components/dashboard/AccountsTab";

export const metadata: Metadata = {
  title: "Moje Konta do Gier - Panel Klienta | deloskiyt",
  description: "Odbieraj i zarządzaj zakupionymi kontami do gier (Minecraft, Steam i inne).",
};

export default async function KontaPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AccountsTab
      orders={user.orders || []}
      licenses={user.licenses || []}
    />
  );
}
