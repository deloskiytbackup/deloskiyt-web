import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getClientPortalEnabled } from "@/lib/settings";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";
import { ClientPortalDisabledPage } from "@/components/ClientPortalDisabledPage";

export default async function PanelKlientaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const isPortalEnabled = await getClientPortalEnabled();
  const isAdmin = user.role === "admin" || user.email === "deloskiyt@gmail.com";

  if (!isPortalEnabled && !isAdmin) {
    return <ClientPortalDisabledPage />;
  }

  return (
    <>
      {!isPortalEnabled && isAdmin && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300 text-xs py-2 px-4 text-center font-medium sticky top-0 z-50 backdrop-blur-md">
          ⚠️ <strong>Tryb administratora:</strong> Panel Klienta jest obecnie WYŁĄCZONY dla użytkowników. Klienci widzą stronę informacyjną.
        </div>
      )}
      <DashboardLayoutWrapper user={user}>
        {children}
      </DashboardLayoutWrapper>
    </>
  );
}
