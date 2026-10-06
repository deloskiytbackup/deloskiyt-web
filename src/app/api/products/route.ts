import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, version, category, downloadUrl } = body;

    if (!name) {
      return NextResponse.json({ error: "Nazwa produktu jest wymagana." }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: String(name).trim(),
        description: description ? String(description).trim() : null,
        version: version ? String(version).trim() : "1.0.0",
        category: category ? String(category).trim() : "Digital",
        downloadUrl: downloadUrl ? String(downloadUrl).trim() : null,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Create product API error:", error);
    return NextResponse.json({ error: "Błąd podczas tworzenia produktu." }, { status: 500 });
  }
}
