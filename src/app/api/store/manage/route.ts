import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

function isAuthorized(user: { email: string; role: string }) {
  return user.role === "admin" || user.email === "deloskiyt@gmail.com";
}

// POST: Dodanie nowego produktu do sklepu
export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user || !isAuthorized(user)) {
    return NextResponse.json({ error: "Brak uprawnień administratora." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, description, version, category, price, features, badge, downloadUrl, isPublic } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Nazwa produktu jest wymagana." }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description ? String(description).trim() : null,
        version: version ? String(version).trim() : "1.0.0",
        category: category ? String(category).trim() : "Bot Discord",
        price: price ? parseFloat(String(price)) : null,
        badge: badge ? String(badge).trim() : null,
        features: features ? String(features).trim() : null,
        downloadUrl: downloadUrl ? String(downloadUrl).trim() : null,
        isPublic: isPublic !== undefined ? Boolean(isPublic) : true,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Create store product error:", error);
    return NextResponse.json({ error: "Błąd bazy danych podczas tworzenia produktu." }, { status: 500 });
  }
}

// PATCH: Aktualizacja ceny lub widoczności
export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user || !isAuthorized(user)) {
    return NextResponse.json({ error: "Brak uprawnień administratora." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, isPublic, price, badge } = body;

    if (!id) {
      return NextResponse.json({ error: "Wymagane ID produktu." }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id: String(id) },
      data: {
        ...(isPublic !== undefined ? { isPublic: Boolean(isPublic) } : {}),
        ...(price !== undefined ? { price: price ? parseFloat(String(price)) : null } : {}),
        ...(badge !== undefined ? { badge: badge ? String(badge).trim() : null } : {}),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Update store product error:", error);
    return NextResponse.json({ error: "Błąd podczas aktualizacji produktu." }, { status: 500 });
  }
}

// DELETE: Usunięcie produktu ze sklepu
export async function DELETE(request: Request) {
  const user = await getSessionUser();
  if (!user || !isAuthorized(user)) {
    return NextResponse.json({ error: "Brak uprawnień administratora." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Wymagane ID produktu." }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ success: true, message: "Produkt został usunięty ze sklepu." });
  } catch (error) {
    console.error("Delete store product error:", error);
    return NextResponse.json({ error: "Błąd podczas usuwania produktu." }, { status: 500 });
  }
}
