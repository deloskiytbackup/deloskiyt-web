import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, discordTag, type, orderNumber, subject, message } = body;

    // Walidacja pól obowiązkowych
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Podaj swoje imię lub nick (minimum 2 znaki)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Podaj poprawny adres e-mail do kontaktu." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Podaj temat wiadomości (minimum 3 znaki)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Treść wiadomości musi zawierać minimum 10 znaków." },
        { status: 400 }
      );
    }

    // Unikalny identyfikator zgłoszenia
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const ticketCode = `POMOC-${randomCode}`;

    const inquiry = await prisma.supportInquiry.create({
      data: {
        ticketCode,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        discordTag: discordTag ? String(discordTag).trim() : null,
        type: type && typeof type === "string" ? type : "pomoc",
        orderNumber: orderNumber ? String(orderNumber).trim() : null,
        subject: subject.trim(),
        message: message.trim(),
        status: "nowe",
      },
    });

    return NextResponse.json({
      success: true,
      ticketCode: inquiry.ticketCode,
      message: "Twoje zgłoszenie zostało pomyślnie zarejestrowane w systemie.",
    });
  } catch (error) {
    console.error("Błąd podczas zapisywania zgłoszenia:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera podczas wysyłania zgłoszenia. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
