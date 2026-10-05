import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email i hasło są wymagane." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Hasło musi mieć co najmniej 6 znaków." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Konto z tym adresem email już istnieje." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        name: name ? String(name).trim() : cleanEmail.split("@")[0],
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("API register error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas rejestracji." },
      { status: 500 }
    );
  }
}
