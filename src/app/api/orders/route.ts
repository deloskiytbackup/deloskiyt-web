import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");

  // Jeśli szukamy po konkretnym numerze zlecenia
  if (orderNumber) {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      select: {
        id: true,
        orderNumber: true,
        title: true,
        status: true,
        createdAt: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Nie znaleziono zlecenia." }, { status: 404 });
    }

    return NextResponse.json({ order });
  }

  // Zwróć zlecenia zalogowanego użytkownika
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Musisz być zalogowany." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ error: "Tytuł jest wymagany." }, { status: 400 });
    }

    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        userId: user.id,
        status: "w_kolejce",
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Create order API error:", error);
    return NextResponse.json({ error: "Nie udało się utworzyć zlecenia." }, { status: 500 });
  }
}
