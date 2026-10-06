import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { StoreView } from "@/components/StoreView";
import { getStoreEnabled } from "@/lib/settings";
import { getSessionUser } from "@/lib/auth";
import { StoreDisabledPage } from "@/components/StoreDisabledPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sklep | Gotowe Boty Discord & Pluginy MC - deloskiyt",
  description:
    "Kup gotowe boty Discord, pluginy Minecraft, szablony i oprogramowanie z dożywotnią licencją i autoryzacją.",
};

export default async function SklepPage() {
  const isStoreEnabled = await getStoreEnabled();
  const user = await getSessionUser();
  const isAdmin = user && (user.role === "admin" || user.email === "deloskiyt@gmail.com");

  if (!isStoreEnabled && !isAdmin) {
    return <StoreDisabledPage />;
  }

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
      videoUrl: true,
      imageUrl: true,
      downloadUrl: true,
      createdAt: true,
    },
  });

  return (
    <>
      {!isStoreEnabled && isAdmin && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300 text-xs py-2 px-4 text-center font-medium sticky top-0 z-50 backdrop-blur-md">
          ⚠️ <strong>Tryb administratora:</strong> Sklep jest obecnie WYŁĄCZONY dla klientów. Odwiedzający widzą stronę informacyjną.
        </div>
      )}
      <StoreView products={products} />
    </>
  );
}
