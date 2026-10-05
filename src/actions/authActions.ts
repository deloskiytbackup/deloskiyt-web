"use server";

import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword, createSession, destroySession, getSessionUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type AuthState = {
  success?: boolean;
  error?: string;
};

export async function registerAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Wszystkie pola są wymagane." };
  }

  if (password.length < 6) {
    return { error: "Hasło musi mieć co najmniej 6 znaków." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Konto z tym adresem email już istnieje." };
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split("@")[0],
        password: hashedPassword,
      },
    });

    await createSession(user.id);
    revalidatePath("/panel-klienta");
    return { success: true };
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Wystąpił błąd podczas rejestracji. Spróbuj ponownie." };
  }
}

export async function loginAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Wpisz email oraz hasło." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Nieprawidłowy email lub hasło." };
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return { error: "Nieprawidłowy email lub hasło." };
    }

    await createSession(user.id);
    revalidatePath("/panel-klienta");
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Wystąpił błąd podczas logowania." };
  }
}

export async function logoutAction() {
  await destroySession();
  revalidatePath("/panel-klienta");
}

export async function createOrderAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const user = await getSessionUser();
  if (!user) {
    return { error: "Musisz być zalogowany, aby dodać zlecenie." };
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!title) {
    return { error: "Tytuł zlecenia jest wymagany." };
  }

  try {
    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    await prisma.order.create({
      data: {
        orderNumber,
        title,
        description: description || null,
        userId: user.id,
        status: "w_kolejce",
      },
    });

    revalidatePath("/panel-klienta");
    return { success: true };
  } catch (error) {
    console.error("Create order error:", error);
    return { error: "Nie udało się utworzyć zlecenia." };
  }
}
