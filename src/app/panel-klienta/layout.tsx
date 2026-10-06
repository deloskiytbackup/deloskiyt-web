import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";

export default async function PanelKlientaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardLayoutWrapper user={user}>
      {children}
    </DashboardLayoutWrapper>
  );
}
