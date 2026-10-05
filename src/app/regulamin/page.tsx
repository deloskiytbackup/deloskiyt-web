import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin usług i działalności deloskiyt.",
};

export default function RegulaminPage() {
  const sections = [
    {
      title: "1. Postanowienia Ogólne",
      content:
        "Niniejszy regulamin określa zasady korzystania ze strony internetowej deloskiyt oraz zasady realizacji zleceń, projektów i współprac oferowanych za pośrednictwem serwisu i powiązanych kanałów (Discord, YouTube, e-mail).",
    },
    {
      title: "2. Zlecenia i Realizacja Usług",
      content:
        "Wszelkie zlecenia (montaż materiałów wideo, tworzenie stron www, konfiguracja serwerów Discord) wyceniane są indywidualnie przed rozpoczęciem prac. Klient zobowiązany jest do dostarczenia wszelkich niezbędnych materiałów w ustalonym terminie.",
    },
    {
      title: "3. Płatności i Rozliczenia",
      content:
        "Płatności dokonywane są na zasadach ustalonych w trakcie wyceny (np. zaliczka przed rozpoczęciem zlecenia oraz płatność końcowa po akceptacji prac). Akceptowane metody płatności ustalane są indywidualnie z zamawiającym.",
    },
    {
      title: "4. Prawa Autorskie i Poprawki",
      content:
        "Po uregulowaniu pełnej płatności Klient otrzymuje prawo do korzystania z gotowego dzieła na ustalonych polach eksploatacji. Do każdego zlecenia przysługują ustalone serie poprawek w cenie projektu.",
    },
    {
      title: "5. Kontakt i Zgłoszenia",
      content:
        "Wszelkie pytania, zgłoszenia i wątpliwości dotyczące regulaminu można kierować bezpośrednio przez serwer Discord lub oficjalne kanały społecznościowe.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 py-16 sm:py-24 max-w-4xl mx-auto w-full">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500 hover:text-white transition-colors mb-12 group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Powrót na stronę główną</span>
      </Link>

      <div className="space-y-4 mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Regulamin
        </h1>
        <p className="text-sm text-zinc-400">
          Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {section.title}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-zinc-900 text-xs text-zinc-600 flex justify-between">
        <span>© {new Date().getFullYear()} deloskiyt</span>
        <Link href="/" className="hover:text-white transition-colors">
          deloskiyt-web
        </Link>
      </footer>
    </main>
  );
}
