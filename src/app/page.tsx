import { getMaintenanceMode, getPortfolioEnabled } from "@/lib/settings";
import { getSessionUser } from "@/lib/auth";
import { MaintenancePage } from "@/components/MaintenancePage";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const isMaintenance = await getMaintenanceMode();

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  const isPortfolioEnabled = await getPortfolioEnabled();
  const user = await getSessionUser();
  const isAdmin = user && (user.role === "admin" || user.email === "deloskiyt@gmail.com");

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      {!isPortfolioEnabled && isAdmin && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300 text-xs py-2 px-4 text-center font-medium sticky top-0 z-50 backdrop-blur-md">
          ⚠️ <strong>Tryb administratora:</strong> Sekcja Portfolio jest obecnie WYŁĄCZONA dla odwiedzających.
        </div>
      )}
      <Hero showScrollArrow={isPortfolioEnabled || Boolean(isAdmin)} />
      {(isPortfolioEnabled || isAdmin) && <Portfolio />}
    </main>
  );
}
