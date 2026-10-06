import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-License-Key, X-Server-Ip, X-Server-Port, X-HWID, X-Bot-Id",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "***";
  const maskedName =
    name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
  return `${maskedName}@${domain}`;
}

// GET: Szybka weryfikacja ważności klucza (np. sprawdzenie statusu przed uruchomieniem)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyFromQuery = searchParams.get("key") || searchParams.get("licenseKey");
    const keyFromHeader = request.headers.get("x-license-key");
    const authHeader = request.headers.get("authorization");
    const keyFromBearer = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : null;

    const licenseKey = (keyFromQuery || keyFromHeader || keyFromBearer)?.trim();

    if (!licenseKey) {
      return NextResponse.json(
        {
          valid: false,
          error: "Brak klucza licencyjnego. Przekaż klucz w query '?key=...', nagłówku 'X-License-Key' lub 'Authorization: Bearer'.",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const license = await prisma.license.findUnique({
      where: { licenseKey },
      include: {
        product: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!license) {
      return NextResponse.json(
        {
          valid: false,
          error: "Nie znaleziono licencji o podanym kluczu w bazie deloskiyt.",
        },
        { status: 404, headers: corsHeaders }
      );
    }

    if (license.status !== "active") {
      return NextResponse.json(
        {
          valid: false,
          status: license.status,
          error: `Licencja jest zablokowana lub nieaktywna (status: ${license.status}).`,
        },
        { status: 403, headers: corsHeaders }
      );
    }

    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
      return NextResponse.json(
        {
          valid: false,
          status: "expired",
          error: "Termin ważności tej licencji upłynął.",
        },
        { status: 403, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        valid: true,
        status: "active",
        licenseKey: license.licenseKey,
        licenseName: license.name,
        owner: {
          name: license.user.name || "Klient deloskiyt",
          email: maskEmail(license.user.email),
        },
        product: license.product
          ? {
              id: license.product.id,
              name: license.product.name,
              version: license.product.version,
              category: license.product.category,
            }
          : null,
        expiresAt: license.expiresAt,
        lastConnectedAt: license.lastConnectedAt,
        serverIp: license.serverIp,
        message: "Licencja jest aktywna i autoryzowana.",
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("License GET verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Wewnętrzny błąd serwera podczas weryfikacji." },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: Połączenie (handshake / connect) z serwera Minecraft / bota
export async function POST(request: Request) {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const authHeader = request.headers.get("authorization");
    const keyFromHeader = request.headers.get("x-license-key");
    const keyFromBearer = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : null;

    const licenseKey = (
      (body.licenseKey as string) ||
      (body.key as string) ||
      keyFromHeader ||
      keyFromBearer
    )?.trim();

    if (!licenseKey) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: "Wymagane pole 'licenseKey' w ciele zapytania JSON lub nagłówku 'X-License-Key'.",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Pobranie telemetrii przekazanej przez plugin lub nagłówki
    const detectedClientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;

    const serverIp = (body.serverIp as string)?.trim() || detectedClientIp;
    const serverPort = body.serverPort ? Number(body.serverPort) : null;
    const hwid = (body.hwid as string)?.trim() || null;
    const serverVersion = (body.serverVersion as string)?.trim() || null;
    const pluginVersion = (body.pluginVersion as string)?.trim() || null;
    const botId = (body.botId as string)?.trim() || null;

    const license = await prisma.license.findUnique({
      where: { licenseKey },
      include: {
        product: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!license) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: "Nie znaleziono licencji o podanym kluczu.",
        },
        { status: 404, headers: corsHeaders }
      );
    }

    if (license.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          status: license.status,
          error: `Licencja jest zablokowana lub wyłączona (status: ${license.status}).`,
        },
        { status: 403, headers: corsHeaders }
      );
    }

    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          status: "expired",
          error: "Termin ważności tej licencji upłynął.",
        },
        { status: 403, headers: corsHeaders }
      );
    }

    // Aktualizacja w bazie danych informacji o połączeniu instancji
    const now = new Date();
    await prisma.license.update({
      where: { id: license.id },
      data: {
        serverIp: serverIp || license.serverIp,
        serverPort: serverPort || license.serverPort,
        hwid: hwid || license.hwid,
        lastConnectedAt: now,
      },
    });

    // Unikalny token handshake potwierdzający autoryzację sesji
    const secret = process.env.SESSION_SECRET || "deloski-mc-secret-2026";
    const handshakeToken = crypto
      .createHmac("sha256", secret)
      .update(`${license.licenseKey}:${now.getTime()}`)
      .digest("hex");

    return NextResponse.json(
      {
        success: true,
        valid: true,
        status: "active",
        connected: true,
        handshakeToken,
        license: {
          key: license.licenseKey,
          name: license.name,
          expiresAt: license.expiresAt,
        },
        connection: {
          serverIp,
          serverPort,
          serverVersion,
          pluginVersion,
          botId,
          hwid,
          connectedAt: now.toISOString(),
        },
        owner: {
          name: license.user.name || "Klient deloskiyt",
          email: maskEmail(license.user.email),
        },
        product: license.product
          ? {
              id: license.product.id,
              name: license.product.name,
              version: license.product.version,
            }
          : null,
        message: "Plugin Minecraft / Bot został pomyślnie zweryfikowany i połączony z licencją deloskiyt.",
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("License POST connection error:", error);
    return NextResponse.json(
      {
        success: false,
        valid: false,
        error: "Wewnętrzny błąd serwera podczas autoryzacji licencji.",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
