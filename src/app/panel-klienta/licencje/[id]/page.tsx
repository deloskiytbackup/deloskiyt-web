import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LicenseDetailView } from "@/components/dashboard/LicenseDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const license = await prisma.license.findUnique({
    where: { id },
    select: { name: true },
  });

  return {
    title: license ? `${license.name} - Szczegóły Licencji | deloskiyt` : "Szczegóły Licencji | deloskiyt",
    description: "Szczegóły klucza licencyjnego, status ważności i integracja.",
  };
}

export default async function LicenseDetailPage({ params }: PageProps) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const license = await prisma.license.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      product: true,
    },
  });

  if (!license) {
    notFound();
  }

  return <LicenseDetailView license={license} />;
}
