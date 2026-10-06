import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  const licenses = await prisma.license.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ licenses });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, productId, expiresAt } = body;

    if (!name) {
      return NextResponse.json({ error: "Nazwa licencji jest wymagana." }, { status: 400 });
    }

    // Generowanie klucza w formacie LIC-XXXX-XXXX-XXXX-XXXX
    const randomBlock = () => crypto.randomBytes(2).toString("hex").toUpperCase();
    const generatedKey = `LIC-${randomBlock()}-${randomBlock()}-${randomBlock()}-${randomBlock()}`;

    const license = await prisma.license.create({
      data: {
        licenseKey: generatedKey,
        name: String(name).trim(),
        status: "active",
        userId: user.id,
        productId: productId ? String(productId) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ success: true, license }, { status: 201 });
  } catch (error) {
    console.error("Create license API error:", error);
    return NextResponse.json({ error: "Błąd podczas generowania licencji." }, { status: 500 });
  }
}
