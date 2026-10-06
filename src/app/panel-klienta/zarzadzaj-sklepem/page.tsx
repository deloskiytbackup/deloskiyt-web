import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { StoreManagerView } from "@/components/dashboard/StoreManagerView";

export const metadata: Metadata = {
  title: "Zarządzaj Sklepem - Panel Administratora | deloskiyt",
  description: "Wystawiaj i zarządzaj produktami w oficjalnym sklepie deloskiyt.",
};

export default async function ZarzadzajSklepemPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  // Tylko dla właściciela deloskiyt / admina
  const isAdmin = user.role === "admin" || user.email === "deloskiyt@gmail.com";
  if (!isAdmin) {
    redirect("/panel-klienta/produkty");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      version: true,
      category: true,
      price: true,
      badge: true,
      features: true,
      isPublic: true,
      downloadUrl: true,
      videoUrl: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  return <StoreManagerView products={products} />;
}
