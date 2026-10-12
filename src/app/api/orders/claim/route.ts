import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderNumber, orderId, licenseId, acceptNoRefund } = body;

    if (!acceptNoRefund) {
      return NextResponse.json(
        {
          error:
            "Aby odebrać konto, musisz zaznaczyć akceptację braku prawa do odstąpienia od umowy / zwrotu po odsłonięciu danych logowania.",
        },
        { status: 400 }
      );
    }

    const sessionUser = await getSessionUser();

    // Szukanie po zamówieniu
    if (orderNumber || orderId) {
      const order = await prisma.order.findFirst({
        where: {
          OR: [
            ...(orderNumber ? [{ orderNumber: String(orderNumber) }] : []),
            ...(orderId ? [{ id: String(orderId) }] : []),
          ],
        },
      });

      if (!order) {
        return NextResponse.json(
          { error: "Nie znaleziono wskazanego zamówienia." },
          { status: 404 }
        );
      }

      // Bezpieczeństwo: jeśli zamówienie ma userId, upewnij się że użytkownik jest właścicielem lub adminem
      if (
        order.userId &&
        sessionUser &&
        order.userId !== sessionUser.id &&
        sessionUser.role !== "admin" &&
        sessionUser.email !== "deloskiyt@gmail.com"
      ) {
        return NextResponse.json(
          { error: "Brak uprawnień do odebrania tego zamówienia." },
          { status: 403 }
        );
      }

      const now = new Date();
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "odebrane",
          isClaimed: true,
          claimedAt: now,
          noRefundAccepted: true,
        },
      });

      // Jeśli zamówienie ma powiązane licencje z danymi konta
      if (order.userId) {
        await prisma.license.updateMany({
          where: { userId: order.userId, isClaimed: false },
          data: {
            isClaimed: true,
            claimedAt: now,
            noRefundAccepted: true,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message:
          "Konto zostało pomyślnie odebrane! Status zamówienia to: ODEBRANE. Zmiana hasła jest zalecana natychmiast.",
        status: "odebrane",
        isClaimed: true,
        claimedAt: updatedOrder.claimedAt,
        accountCredentials:
          updatedOrder.accountCredentials ||
          "Dostęp aktywowany. Skontaktuj się na Discordzie jeśli potrzebujesz pomocy technicznej.",
      });
    }

    // Szukanie po licencji
    if (licenseId) {
      const lic = await prisma.license.findUnique({
        where: { id: String(licenseId) },
        include: { product: true },
      });

      if (!lic) {
        return NextResponse.json(
          { error: "Nie znaleziono wskazanej licencji." },
          { status: 404 }
        );
      }

      if (
        sessionUser &&
        lic.userId !== sessionUser.id &&
        sessionUser.role !== "admin" &&
        sessionUser.email !== "deloskiyt@gmail.com"
      ) {
        return NextResponse.json(
          { error: "Brak uprawnień do odebrania tej licencji." },
          { status: 403 }
        );
      }

      const now = new Date();
      const credentials =
        lic.accountCredentials ||
        lic.product?.accountCredentials ||
        "Login / hasło: Dostęp przypisany do licencji";

      const updatedLic = await prisma.license.update({
        where: { id: lic.id },
        data: {
          isClaimed: true,
          claimedAt: now,
          noRefundAccepted: true,
          accountCredentials: credentials,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Dane konta zostały pomyślnie ujawnione i odebrane.",
        isClaimed: true,
        claimedAt: updatedLic.claimedAt,
        accountCredentials: credentials,
      });
    }

    return NextResponse.json(
      { error: "Wymagany identyfikator zamówienia lub licencji." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Claim account API error:", error);
    return NextResponse.json(
      { error: error.message || "Błąd podczas odbierania konta." },
      { status: 500 }
    );
  }
}
