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
        orderId: existingOrder.id,
        orderType: existingOrder.orderType,
        targetGameNick: existingOrder.targetGameNick,
        status: existingOrder.status,
        isClaimed: existingOrder.isClaimed,
        claimedAt: existingOrder.claimedAt,
        accountCredentials: existingOrder.isClaimed ? existingOrder.accountCredentials : null,
        licenses: licenses.map((l) => ({
          id: l.id,
          productName: l.name,
          licenseKey: l.licenseKey,
          downloadUrl: l.product?.downloadUrl,
          isClaimed: l.isClaimed,
          accountCredentials: l.isClaimed ? l.accountCredentials : null,
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

    const metadataOrderType = session.metadata?.orderType;
    const hasAccount = products.some((p) => p.itemType === "konto");
    const orderType = metadataOrderType || (hasAccount ? "konto" : "przedmiot");
    const targetGameNick = session.metadata?.targetGameNick || null;

    // Połącz ewentualne dane konta z produktów
    const combinedCredentials = products
      .map((p) => p.accountCredentials)
      .filter(Boolean)
      .join("\n---\n") || null;

    const orderNumber = `STRIPE-${session.id.slice(-8)}`;
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        title: `Stripe Online: ${products.map((p) => p.name).join(", ")}`,
        description: `Stripe Session: ${session.id} | Email: ${session.customer_details?.email || "brak"}`,
        status: orderType === "konto" ? "do_odbioru" : "oplacone",
        orderType,
        targetGameNick,
        accountCredentials: combinedCredentials,
        isClaimed: false,
        noRefundAccepted: false,
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
          accountCredentials: prod.accountCredentials || null,
          isClaimed: false,
          noRefundAccepted: false,
        },
      });

      generatedLicenses.push({
        id: lic.id,
        productName: prod.name,
        licenseKey: lic.licenseKey,
        downloadUrl: prod.downloadUrl,
        isClaimed: false,
        accountCredentials: null,
      });
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: newOrder.id,
      orderType,
      targetGameNick,
      status: newOrder.status,
      isClaimed: false,
      claimedAt: null,
      accountCredentials: null,
      licenses: generatedLicenses,
    });
  } catch (error: any) {
    console.error("Verify Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
