import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ProductDetailView } from "@/components/dashboard/ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true },
  });

  return {
    title: product ? `${product.name} - Szczegóły Produktu | deloskiyt` : "Szczegóły Produktu | deloskiyt",
    description: "Szczegóły produktu cyfrowego, pliki do pobrania i powiązane licencje.",
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      licenses: true,
    },
  });

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
