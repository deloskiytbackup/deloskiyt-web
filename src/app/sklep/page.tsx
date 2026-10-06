import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { StoreView } from "@/components/StoreView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sklep | Gotowe Boty Discord & Pluginy MC - deloskiyt",
  description:
    "Kup gotowe boty Discord, pluginy Minecraft, szablony i oprogramowanie z dożywotnią licencją i autoryzacją.",
};

export default async function SklepPage() {
  const products = await prisma.product.findMany({
    where: { isPublic: true },
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
      downloadUrl: true,
      createdAt: true,
    },
  });

  return <StoreView products={products} />;
}
