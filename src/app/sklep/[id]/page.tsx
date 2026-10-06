import { notFound } from "next/navigation";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { StoreProductDetailView } from "@/components/StoreProductDetailView";
import { getStoreEnabled } from "@/lib/settings";
import { getSessionUser } from "@/lib/auth";
import { StoreDisabledPage } from "@/components/StoreDisabledPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, description: true },
  });

  if (!product) {
    return {
      title: "Produkt nie znaleziony | Sklep deloskiyt",
    };
  }

  return {
    title: `${product.name} | Sklep deloskiyt`,
    description: product.description || "Gotowy bot Discord, plugin Minecraft z licencją.",
  };
}

export default async function SklepProductPage({ params }: PageProps) {
  const isStoreEnabled = await getStoreEnabled();
  const user = await getSessionUser();
  const isAdmin = user && (user.role === "admin" || user.email === "deloskiyt@gmail.com");

  if (!isStoreEnabled && !isAdmin) {
    return <StoreDisabledPage />;
  }

  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id,
      isPublic: true,
    },
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

  if (!product) {
    notFound();
  }

  return (
    <>
      {!isStoreEnabled && isAdmin && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300 text-xs py-2 px-4 text-center font-medium sticky top-0 z-50 backdrop-blur-md">
          ⚠️ <strong>Tryb administratora:</strong> Sklep jest obecnie WYŁĄCZONY dla klientów. Odwiedzający widzą stronę informacyjną.
        </div>
      )}
      <StoreProductDetailView product={product} />
    </>
  );
}
