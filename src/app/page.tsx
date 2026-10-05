import { getMaintenanceMode } from "@/lib/settings";
import { MaintenancePage } from "@/components/MaintenancePage";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const isMaintenance = await getMaintenanceMode();

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Hero />
      <Portfolio />
    </main>
  );
}
