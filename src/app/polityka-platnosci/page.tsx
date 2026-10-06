import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Płatności i Zwrotów | deloskiyt",
  description:
    "Zasady realizacji płatności, bezpieczeństwo transakcji Stripe, dostawa treści cyfrowych oraz procedury reklamacji w serwisie deloskiyt.",
};

export default function PolitykaPlatnosciPage() {
  const sections = [
    {
      id: "metody-platnosci",
      number: "§ 1",
      title: "Akceptowane Metody Płatności",
      badge: "Formy płatności",
      content: [
        "Oficjalnym i rekomendowanym procesorem płatności w serwisie deloskiyt jest globalny operator Stripe Payments Europe Ltd.",
        "Za pośrednictwem bramki Stripe obsługiwane są płatności: karty płatnicze (Visa, Mastercard, American Express), szybkie przelewy internetowe (Przelewy24 / PayU) oraz BLIK.",
        "W przypadku zamówień indywidualnych realizowanych za pośrednictwem serwera Discord lub panelu klienta akceptowane są również: bezpośredni przelew bankowy, PayPal (Friends & Family), PaySafeCard (PSC) oraz kryptowaluty (LTC, USDT).",
        "Wszystkie ceny w sklepie podawane są w polskich złotych (PLN) i stanowią ostateczną kwotę do zapłaty.",
      ],
    },
    {
      id: "bezpieczenstwo-transakcji",
      number: "§ 2",
      title: "Bezpieczeństwo Transakcji i Szyfrowanie",
      badge: "Ochrona danych",
      content: [
        "Wszystkie połączenia w serwisie są szyfrowane za pomocą 256-bitowego protokołu SSL/TLS, gwarantującego pełne bezpieczeństwo przesyłanych danych.",
        "Dane kart płatniczych wprowadzane są bezpośrednio na zabezpieczonej infrastrukturze Stripe posiadającej najwyższy certyfikat bezpieczeństwa PCI-DSS Level 1. Serwis deloskiyt NIGDY nie ma dostępu do pełnych numerów kart ani kodów CVV/CVC Klienta.",
        "Każda transakcja podlega automatycznemu monitoringowi antyfraudowemu 3D Secure (3DS2) wymaganemu przez europejską dyrektywę PSD2.",
      ],
    },
    {
      id: "dostawa-tresci-cyfrowych",
      number: "§ 3",
      title: "Realizacja Zamówienia i Dostawa Treści Cyfrowych",
      badge: "Dostawa 24/7",
      content: [
        "Wszystkie produkty oferowane w sklepie deloskiyt (boty Discord, pluginy Minecraft, szablony, oprogramowanie) mają charakter treści cyfrowych.",
        "Po pomyślnym zaksięgowaniu płatności przez operatora Stripe, zamówienie jest realizowane w czasie rzeczywistym:",
        "— Unikalny klucz licencyjny oraz pliki instalacyjne zostają natychmiast przypisane do konta w Panelu Klienta.",
        "— Klient otrzymuje potwierdzenie zakupu wraz z instrukcją uruchomienia.",
        "W przypadku awarii technicznej operatora zewnętrznego realizacja zamówienia może wydłużyć się do maksymalnie 24 godzin roboczych.",
      ],
    },
    {
      id: "prawo-do-odstapienia",
      number: "§ 4",
      title: "Prawo do Odstąpienia od Umowy i Zwroty",
      badge: "Przepisy konsumenckie",
      highlight: true,
      content: [
        "Zgodnie z art. 38 ust. 1 pkt 13 ustawy z dnia 30 maja 2014 r. o prawach konsumenta, prawo do odstąpienia od umowy zawartej na odległość NIE przysługuje konsumentowi w odniesieniu do umów o dostarczanie treści cyfrowych niedostarczanych na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy.",
        "Dokonując zakupu oprogramowania i pobierając pliki lub generując klucz licencyjny, Klient wyraża zgodę na natychmiastowe rozpoczęcie świadczenia usługi i przyjmuje do wiadomości utratę prawa do odstąpienia od umowy.",
        "W przypadku indywidualnych zamówień na zamówienie (custom development, konfiguracja serwera) wpłacony zadatek ma charakter bezzwrotny i stanowi rekompensatę za zarezerwowany czas i nakład pracy programisty.",
      ],
    },
    {
      id: "reklamacje-i-skargi",
      number: "§ 5",
      title: "Procedura Reklamacyjna i Skargi",
      badge: "Wsparcie i Gwarancja",
      content: [
        "Klient ma pełne prawo do złożenia reklamacji w przypadku, gdy zakupiony produkt posiada wady uniemożliwiające jego poprawne działanie, niezgodne z opisem w ofercie.",
        "Reklamacje oraz skargi można składać oficjalnie za pośrednictwem formularza na podstronie Centrum Pomocy (/pomoc) lub otwierając ticket na serwerze Discord.",
        "Zgłoszenie reklamacyjne powinno zawierać: numer zamówienia lub identyfikator transakcji Stripe, adres e-mail przypisany do konta oraz szczegółowy opis usterki wraz ze zrzutami ekranu lub logami błędu.",
        "Sprzedawca zobowiązuje się do rozpatrzenia każdej reklamacji w terminie do 14 dni kalendarzowych od momentu jej otrzymania. W przypadku uznania reklamacji wadliwy produkt jest niezwłocznie naprawiany lub następuje zwrot środków.",
      ],
    },
    {
      id: "anty-chargeback",
      number: "§ 6",
      title: "Klauzula Anty-Chargeback i Nadużycia",
      badge: "Ochrona prawna",
      content: [
        "Wszelkie bezpodstawne zgłoszenia roszczeń finansowych (w tym chargeback w banku, spory w systemie PayPal) po odebraniu działających plików i kluczy licencyjnych traktowane są jako próba wyłudzenia.",
        "Wszczęcie nieuzasadnionego sporu skutkuje natychmiastowym i permanentnym zablokowaniem klucza licencyjnego, cofnięciem dostępu do panelu oraz skierowaniem sprawy do windykacji polubownej lub sądowej.",
        "Przed podjęciem jakichkolwiek sporów bankowych Klient jest zobowiązany do kontaktu z obsługą techniczną na podstronie /pomoc w celu polubownego rozwiązania sytuacji.",
      ],
    },
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
              href="/pomoc"
              className="text-xs text-zinc-400 hover:text-white transition-colors font-medium"
            >
              Centrum Pomocy & Skargi
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

      {/* Nagłówek Dokumentu */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dokument Prawny i Finansowy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Polityka Płatności i Zwrotów
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Zasady rozliczania transakcji w sklepie deloskiyt, procedury bezpieczeństwa bramek Stripe, dostarczanie oprogramowania cyfrowego oraz przejrzyste warunki reklamacji.
          </p>

          <p className="text-xs text-zinc-500 font-mono">
            Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")} | Wersja: 1.2
          </p>
        </div>

        {/* Spis treści / Nawigacja szybka */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/60 p-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="text-emerald-400 font-mono font-bold">{s.number}</span>
              <span className="truncate">{s.title.split(" - ")[0]}</span>
            </a>
          ))}
        </div>

        {/* Treść Paragrafów */}
        <div className="mt-12 space-y-8">
          {sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                sec.highlight
                  ? "bg-zinc-950/90 border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                  : "bg-zinc-950/60 border-zinc-900"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400 font-mono font-bold text-xs">
                    {sec.number}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {sec.title}
                  </h2>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
                  {sec.badge}
                </span>
              </div>

              <div className="space-y-3">
                {sec.content.map((paragraph, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Baner Pomocy i Reklamacji na Dole */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Masz pytania dotyczące płatności lub chcesz zgłosić reklamację?
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Skorzystaj z oficjalnego formularza kontaktowego lub otwórz ticket techniczny. Nasz zespół odpowiada najszybciej jak to możliwe.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/pomoc"
              className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
            >
              Przejdź do /pomoc
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
