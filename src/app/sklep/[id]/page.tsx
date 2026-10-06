import { notFound } from "next/navigation";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { StoreProductDetailView } from "@/components/StoreProductDetailView";

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

  return <StoreProductDetailView product={product} />;
}
