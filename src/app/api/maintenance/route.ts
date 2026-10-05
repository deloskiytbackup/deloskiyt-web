import { NextResponse } from "next/server";
import { getMaintenanceMode, setMaintenanceMode } from "@/lib/settings";

export async function GET() {
  const isMaintenance = await getMaintenanceMode();
  return NextResponse.json({ maintenance: isMaintenance });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { enabled } = body;

    if (typeof enabled !== "boolean") {
      return NextResponse.json(
        { error: "Pole 'enabled' musi być wartością boolean (true/false)." },
        { status: 400 }
      );
    }

    const success = await setMaintenanceMode(enabled);
    if (!success) {
      return NextResponse.json({ error: "Błąd bazy danych." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      maintenance: enabled,
      message: enabled
        ? "Tryb 'Zmieniamy się na lepsze' został WŁĄCZONY."
        : "Tryb 'Zmieniamy się na lepsze' został WYŁĄCZONY.",
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
