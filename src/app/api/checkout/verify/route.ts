import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId || !stripe) {
      return NextResponse.json({ error: "Brak identyfikatora sesji lub konfiguracji Stripe." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Płatność nie została jeszcze opłacona." }, { status: 400 });
    }

    const productIdsRaw = session.metadata?.productIds;
    const productIds: string[] = productIdsRaw ? JSON.parse(productIdsRaw) : [];
    const userId = session.metadata?.userId || null;

    // Sprawdź czy zamówienie dla tej sesji już istnieje
    const existingOrder = await prisma.order.findUnique({
      where: { orderNumber: `STRIPE-${session.id.slice(-8)}` },
    });

    if (existingOrder) {
      // Pobierz już wygenerowane licencje
      const licenses = await prisma.license.findMany({
        where: { productId: { in: productIds } },
        orderBy: { createdAt: "desc" },
        take: productIds.length,
        include: { product: true },
      });

      return NextResponse.json({
        success: true,
        orderNumber: existingOrder.orderNumber,
        licenses: licenses.map((l) => ({
          productName: l.name,
          licenseKey: l.licenseKey,
          downloadUrl: l.product?.downloadUrl,
        })),
      });
    }

    // Znajdź użytkownika
    let targetUserId = userId;
    if (!targetUserId) {
      const defaultUser = await prisma.user.findFirst({
        where: { email: "deloskiyt@gmail.com" },
      });
      targetUserId = defaultUser?.id || "cmuvwj9jo000004jt6t0gcqdl";
    }

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const orderNumber = `STRIPE-${session.id.slice(-8)}`;
    await prisma.order.create({
      data: {
        orderNumber,
        title: `Stripe Online: ${products.map((p) => p.name).join(", ")}`,
        description: `Stripe Session: ${session.id} | Email: ${session.customer_details?.email || "brak"}`,
        status: "oplacone",
        price: (session.amount_total || 0) / 100,
        userId: targetUserId,
      },
    });

    const generatedLicenses = [];
    for (const prod of products) {
      const cleanPrefix = prod.name.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 15);
      const randomSuffix = crypto.randomBytes(4).toString("hex");
      const licenseKey = `lic_deloski_${cleanPrefix}_${randomSuffix}`;

      const lic = await prisma.license.create({
        data: {
          licenseKey,
          name: prod.name,
          status: "active",
          expiresAt: null,
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
      success: true,
      orderNumber,
      licenses: generatedLicenses,
    });
  } catch (error: any) {
    console.error("Verify Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
