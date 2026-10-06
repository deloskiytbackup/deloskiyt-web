"use client";

import { useState } from "react";
import Link from "next/link";

export default function PomocPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discordTag: "",
    type: "pomoc",
    orderNumber: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<{
    success: boolean;
    ticketCode?: string;
    message?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setTicketResult({
          success: true,
          ticketCode: data.ticketCode,
          message: data.message,
        });
        setFormData({
          name: "",
          email: "",
          discordTag: "",
          type: "pomoc",
          orderNumber: "",
          subject: "",
          message: "",
        });
      } else {
        setErrorMessage(data.error || "Wystąpił błąd podczas wysyłania zgłoszenia.");
      }
    } catch {
      setErrorMessage("Błąd połączenia z serwerem. Sprawdź łącze internetowe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const types = [
    { id: "pomoc", label: "🛠️ Pomoc techniczna", desc: "Problemy z botem, konfiguracją lub kodem" },
    { id: "skarga", label: "⚖️ Skarga / Reklamacja", desc: "Zgłoszenie wady produktu, reklamacja płatności" },
    { id: "zapytanie", label: "💡 Zapytanie / Współpraca", desc: "Projekt indywidualny, oferta, kontakt" },
    { id: "licencja", label: "🔑 Problem z licencją", desc: "Błąd autoryzacji HWID/IP lub klucza" },
    { id: "inne", label: "❓ Inne", desc: "Pozostałe pytania i uwagi" },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20 pb-20">
      {/* Pasek nawigacyjny */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Strona główna</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/polityka-platnosci"
              className="text-xs text-zinc-400 hover:text-white transition-colors font-medium"
            >
              Polityka Płatności
            </Link>
            <Link
              href="/regulamin"
              className="text-xs text-zinc-400 hover:text-white transition-colors font-medium"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Nagłówek sekcji */}
        <div className="space-y-4 text-center sm:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Wsparcie & Biuro Obsługi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Centrum Pomocy & Zgłoszeń
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Potrzebujesz pomocy z produktem, masz pytanie ofertowe lub chcesz złożyć oficjalną skargę lub reklamację?
            Nasz zespół odpowiada na każde zgłoszenie.
          </p>
        </div>

        {/* Karty szybkiego kontaktu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 sm:mt-10">
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <span>💬 Szybkie wsparcie na Discordzie</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">Tickety Live 24/7</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Jeśli zależy Ci na natychmiastowej odpowiedzi programisty lub moderatora, otwórz ticket na naszym serwerze Discord.
              </p>
            </div>
            <a
              href="https://discord.gg/deloskiyt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-colors"
            >
              <span>Dołącz do Discorda</span>
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span>📩 Oficjalna droga e-mailowa</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">Formularz Zgłoszeniowy</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Każde zgłoszenie wysłane formularzem poniżej otrzymuje unikalny kod zgłoszenia w bazie i trafia bezpośrednio do właściciela.
              </p>
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              Średni czas odpowiedzi: do 24 godzin roboczych
            </div>
          </div>
        </div>

        {/* Ekran Sukcesu po wysłaniu */}
        {ticketResult && ticketResult.success && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-emerald-500/30 space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Zgłoszenie zostało wysłane!</h3>
                <p className="text-xs text-zinc-400">Dziękujemy za kontakt. Zapisaliśmy Twoje zgłoszenie w systemie.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">Twój kod zgłoszenia</span>
                <span className="text-lg font-mono font-black text-emerald-400 tracking-wider">{ticketResult.ticketCode}</span>
              </div>
              <span className="text-xs text-zinc-400">
                Zachowaj ten kod w razie potrzeby kontaktu na Discordzie.
              </span>
            </div>

            <button
              onClick={() => setTicketResult(null)}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Wyślij kolejne zgłoszenie
            </button>
          </div>
        )}

        {/* Formularz Zgłoszeniowy */}
        {(!ticketResult || !ticketResult.success) && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-850 space-y-6"
          >
            <div className="border-b border-zinc-900 pb-4">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Formularz Zgłoszenia / Skargi / Zapytania
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Wypełnij poniższe pola. Odpowiedź otrzymasz na podany adres e-mail lub na Discordzie.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Wybór typu zgłoszenia */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-2">
                Kategoria zgłoszenia *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {types.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.type === t.id
                        ? "bg-zinc-900 border-zinc-600 shadow-sm"
                        : "bg-zinc-950/60 border-zinc-900 hover:border-zinc-800"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={t.id}
                      checked={formData.type === t.id}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{t.label}</span>
                      <span className="text-[11px] text-zinc-500 block leading-tight mt-0.5">{t.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Pola danych kontaktowych */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Twoje imię / Nick *
                </label>
                <input
                  type="text"
                  required
                  placeholder="np. Marcel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Adres e-mail do kontaktu *
                </label>
                <input
                  type="email"
                  required
                  placeholder="twoj@email.pl"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Discord Tag / ID (opcjonalnie)
                </label>
                <input
                  type="text"
                  placeholder="np. deloskiyt lub deloskiyt#0001"
                  value={formData.discordTag}
                  onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Numer zamówienia / ID licencji (opcjonalnie)
                </label>
                <input
                  type="text"
                  placeholder="np. ZAM-1234 lub DEL-XXXX"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            {/* Temat i treść */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Temat wiadomości *
              </label>
              <input
                type="text"
                required
                placeholder="np. Błąd autoryzacji bota Discord po zmianie IP / Pytanie o wycenę"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Szczegółowy opis sprawy / Skargi / Zapytania *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Opisz dokładnie swój problem lub zapytanie. Im więcej szczegółów (kroki do odtworzenia błędu, komunikaty), tym szybciej rozwiążemy Twoją sprawę..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Wysyłanie zgłoszenia..." : "Wyślij zgłoszenie do deloskiyt"}
              </button>
              <p className="text-[11px] text-zinc-500 text-center mt-3">
                Wysyłając zgłoszenie, akceptujesz nasz{" "}
                <Link href="/regulamin" className="text-zinc-400 underline underline-offset-2">
                  Regulamin
                </Link>{" "}
                oraz{" "}
                <Link href="/polityka-platnosci" className="text-zinc-400 underline underline-offset-2">
                  Politykę Płatności
                </Link>.
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
