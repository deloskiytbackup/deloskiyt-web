"use client";

import { useState } from "react";
import Link from "next/link";
import { License, Product } from "./types";

interface LicenseDetailViewProps {
  license: License & { product?: Product | null };
}

export function LicenseDetailView({ license }: LicenseDetailViewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<"minecraft" | "discord" | "curl">("minecraft");

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const mcJavaSnippet = `// Przykład połączenia w pluginie Minecraft (Paper / Spigot / Bungee)
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class LicenseValidator {
    public static boolean verifyLicense(String serverIp, int serverPort) {
        try {
            String jsonPayload = """
                {
                    "licenseKey": "${license.licenseKey}",
                    "serverIp": "%s",
                    "serverPort": %d,
                    "serverVersion": "Paper 1.20.4",
                    "pluginVersion": "1.0.0"
                }
            """.formatted(serverIp, serverPort);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://deloskiyt-web.vercel.app/api/license/verify"))
                .header("Content-Type", "application/json")
                .header("X-License-Key", "${license.licenseKey}")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() == 200 && response.body().contains("\\"valid\\":true");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}`;

  const discordBotSnippet = `// Przykład weryfikacji w bocie Discord / Node.js
async function checkLicense() {
  const response = await fetch("https://deloskiyt-web.vercel.app/api/license/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-License-Key": "${license.licenseKey}"
    },
    body: JSON.stringify({
      licenseKey: "${license.licenseKey}",
      botId: "123456789012345678",
      pluginVersion: "1.0.0"
    })
  });

  const data = await response.json();
  if (data.valid && data.connected) {
    console.log("Licencja pomyślnie zweryfikowana dla bota!", data);
    return true;
  }
  
  console.error("Błąd weryfikacji licencji:", data.error);
  return false;
}`;

  const curlSnippet = `# Szybkie sprawdzenie statusu przez cURL
curl -X GET "https://deloskiyt-web.vercel.app/api/license/verify?key=${license.licenseKey}" \\
  -H "Accept: application/json"

# Połączenie instancji (handshake)
curl -X POST "https://deloskiyt-web.vercel.app/api/license/verify" \\
  -H "Content-Type: application/json" \\
  -d '{"licenseKey":"${license.licenseKey}","serverIp":"127.0.0.1","serverPort":25565}'`;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Nawigacja powrotu */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/panel-klienta/licencje"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Wróć do listy licencji</span>
        </Link>

        <span className="text-[11px] font-mono text-zinc-600 bg-zinc-900/60 px-2.5 py-1 rounded-md border border-zinc-850">
          ID: {license.id}
        </span>
      </div>

      {/* Nagłówek licencji */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              {license.status === "active" ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Aktywna & Ważna
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                  {license.status}
                </span>
              )}

              {license.product && (
                <Link
                  href={`/panel-klienta/produkty/${license.product.id}`}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  Produkt: {license.product.name} →
                </Link>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {license.name}
            </h1>
          </div>
        </div>

        {/* Klucz licencji */}
        <div className="p-4 sm:p-6 rounded-2xl bg-black border border-zinc-850 space-y-3">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
            Twój unikalny klucz aktywacyjny
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <code className="text-base sm:text-xl font-mono text-zinc-100 font-bold tracking-wider select-all break-all">
              {license.licenseKey}
            </code>

            <button
              onClick={() => copyToClipboard(license.licenseKey)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
            >
              {copiedKey === license.licenseKey ? (
                <>
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Skopiowano do schowka</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Kopiuj klucz</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informacje szczegółowe */}
        <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block text-[11px]">Ważność</span>
            <span className="text-white font-medium mt-0.5 block">
              {license.expiresAt ? new Date(license.expiresAt).toLocaleDateString("pl-PL") : "Dożywotnia (Lifetime)"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Typ licencji</span>
            <span className="text-white font-medium mt-0.5 block">Plugin / Bot / Server</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Data wygenerowania</span>
            <span className="text-white font-medium mt-0.5 block">
              {new Date(license.createdAt).toLocaleDateString("pl-PL")}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Ostatnie połączenie</span>
            <span className="text-emerald-400 font-medium mt-0.5 block">
              {license.lastConnectedAt
                ? new Date(license.lastConnectedAt).toLocaleString("pl-PL")
                : "Oczekuje na start"}
            </span>
          </div>
        </div>

        {/* Telemetria połączonego serwera */}
        {license.serverIp && (
          <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs bg-zinc-900/30 p-3.5 rounded-xl border border-zinc-900">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-400">Podłączony serwer:</span>
              <code className="text-white font-mono font-semibold">
                {license.serverIp}
                {license.serverPort ? `:${license.serverPort}` : ""}
              </code>
            </div>
            {license.hwid && (
              <span className="text-zinc-500 font-mono text-[11px]">HWID: {license.hwid}</span>
            )}
          </div>
        )}
      </div>

      {/* Dedykowany endpoint dla pluginów MC / botów */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Endpoint dla Pluginów MC & Botów</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider font-semibold">
                Live API
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Twój plugin Minecraft lub bot Discord może weryfikować klucz i łączyć się przez dedykowany endpoint REST API.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveSnippet("minecraft")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeSnippet === "minecraft"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Plugin MC (Java)
            </button>
            <button
              onClick={() => setActiveSnippet("discord")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeSnippet === "discord"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Bot Discord (Node.js)
            </button>
            <button
              onClick={() => setActiveSnippet("curl")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeSnippet === "curl"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              cURL
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>POST /api/license/verify</span>
            <span>CORS: Enabled (*)</span>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-zinc-900 font-mono text-xs text-zinc-300 overflow-x-auto">
            <pre>
              {activeSnippet === "minecraft" && mcJavaSnippet}
              {activeSnippet === "discord" && discordBotSnippet}
              {activeSnippet === "curl" && curlSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
