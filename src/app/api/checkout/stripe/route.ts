import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
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

    // 1. Jeśli klucz Stripe jest skonfigurowany -> prawdziwy Stripe Checkout Session
    if (stripe) {
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
    }

    // 2. Tryb Testowy / Symulacja (jeśli klucze Stripe nie są jeszcze uzupełnione w .env)
    const orderNumber = `STRIPE-${Date.now().toString().slice(-6)}`;
    const totalSum = dbProducts.reduce((sum, p) => sum + (p.price || 0), 0);

    // Znajdź użytkownika do przypisania licencji
    let targetUserId = sessionUser?.id;
    if (!targetUserId) {
      const defaultUser = await prisma.user.findFirst({
        where: { email: "deloskiyt@gmail.com" },
      });
      targetUserId = defaultUser?.id || "cmuvwj9jo000004jt6t0gcqdl";
    }

    // Utwórz zamówienie w Neon DB
    const order = await prisma.order.create({
      data: {
        orderNumber,
        title: `Stripe Checkout: ${dbProducts.map((p) => p.name).join(", ")}`,
        description: `Płatność online Stripe (Tryb demonstracyjny / testowy) | Produkty: ${dbProducts.map((p) => p.id).join(", ")}`,
        status: "oplacone",
        price: totalSum,
        userId: targetUserId,
      },
    });

    // Wygeneruj licencje dla każdego zakupionego produktu
    const generatedLicenses = [];
    for (const prod of dbProducts) {
      const cleanPrefix = prod.name.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 15);
      const randomSuffix = crypto.randomBytes(4).toString("hex");
      const licenseKey = `lic_deloski_${cleanPrefix}_${randomSuffix}`;

      const lic = await prisma.license.create({
        data: {
          licenseKey,
          name: prod.name,
          status: "active",
          expiresAt: null, // lifetime
          productId: prod.id,
          userId: targetUserId,
        },
      });

      generatedLicenses.push({
        productName: prod.name,
        licenseKey: lic.licenseKey,
        downloadUrl: prod.downloadUrl,
      });
    }

    return NextResponse.json({
      url: `${origin}/sklep/sukces?demo_order=${order.orderNumber}&licenses=${encodeURIComponent(JSON.stringify(generatedLicenses))}`,
    });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Wystąpił błąd podczas inicjalizacji płatności Stripe." },
      { status: 500 }
    );
  }
}
