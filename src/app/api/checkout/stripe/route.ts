import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Płatności Stripe nie zostały jeszcze aktywowane (brak klucza STRIPE_SECRET_KEY)." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Koszyk jest pusty." }, { status: 400 });
    }

    // Pobierz aktualne produkty z bazy danych Neon DB, aby zweryfikować ceny
    const productIds = items.map((i: { id: string }) => String(i.id));
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (dbProducts.length === 0) {
      return NextResponse.json({ error: "Żaden z produktów nie został odnaleziony w sklepie." }, { status: 404 });
    }

    const sessionUser = await getSessionUser();
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "https://deloskiyt-web.vercel.app";

    const line_items = dbProducts.map((prod) => {
      const unitAmount = Math.round((prod.price || 0) * 100); // kwota w groszach

      return {
        price_data: {
          currency: "pln",
          product_data: {
            name: prod.name,
            description: prod.description ? prod.description.slice(0, 200) : "Licencja deloskiyt",
            images: prod.imageUrl ? [prod.imageUrl] : [],
          },
          unit_amount: unitAmount > 0 ? unitAmount : 100, // min 1 PLN
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: sessionUser?.email,
      metadata: {
        productIds: JSON.stringify(dbProducts.map((p) => p.id)),
        userId: sessionUser?.id || null,
      },
      success_url: `${origin}/sklep/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/sklep/anulowano`,
    } as any);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Błąd podczas generowania sesji płatności Stripe." },
      { status: 500 }
    );
  }
}
