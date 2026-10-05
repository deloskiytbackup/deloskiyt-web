import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email i hasło są wymagane." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło." },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(String(password), user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło." },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("API login error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas logowania." },
      { status: 500 }
    );
  }
}
