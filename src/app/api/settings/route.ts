import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import {
  getAllSiteSettings,
  setMaintenanceMode,
  setStoreEnabled,
  setClientPortalEnabled,
} from "@/lib/settings";

export async function GET() {
  const settings = await getAllSiteSettings();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    const isAdmin = user && (user.role === "admin" || user.email === "deloskiyt@gmail.com");

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Brak uprawnień administratora." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { key, enabled } = body;

    if (typeof enabled !== "boolean") {
      return NextResponse.json(
        { error: "Wartość 'enabled' musi być typu boolean." },
        { status: 400 }
      );
    }

    let success = false;
    let message = "";

    if (key === "store_enabled") {
      success = await setStoreEnabled(enabled);
      message = enabled ? "Sklep został WŁĄCZONY." : "Sklep został WYŁĄCZONY.";
    } else if (key === "client_portal_enabled") {
      success = await setClientPortalEnabled(enabled);
      message = enabled ? "Panel Klienta został WŁĄCZONY." : "Panel Klienta został WYŁĄCZONY.";
    } else if (key === "maintenance_mode") {
      success = await setMaintenanceMode(enabled);
      message = enabled
        ? "Tryb przerwy technicznej został WŁĄCZONY."
        : "Tryb przerwy technicznej został WYŁĄCZONY.";
    } else {
      return NextResponse.json(
        { error: "Nieznany klucz ustawienia." },
        { status: 400 }
      );
    }

    if (!success) {
      return NextResponse.json(
        { error: "Wystąpił błąd podczas zapisywania ustawienia w bazie." },
        { status: 500 }
      );
    }

    const updatedSettings = await getAllSiteSettings();

    return NextResponse.json({
      success: true,
      message,
      settings: updatedSettings,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
