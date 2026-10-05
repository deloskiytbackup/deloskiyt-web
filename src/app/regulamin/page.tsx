import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin Świadczenia Usług",
  description: "Oficjalny regulamin realizacji zleceń, projektów i współpracy deloskiyt.",
};

export default function RegulaminPage() {
  const sections = [
    {
      id: "postanowienia-ogolne",
      number: "§ 1",
      title: "Postanowienia Ogólne i Wiążący Charakter Umowy",
      badge: "Podstawa prawna",
      content: [
        "Niniejszy Regulamin określa zasady realizacji zleceń graficznych, montażu wideo, konfiguracji systemów Discord oraz tworzenia projektów internetowych realizowanych przez markę deloskiyt (zwaną dalej „Wykonawcą”).",
        "Złożenie zamówienia za pośrednictwem serwisu deloskiyt-web, wiadomości prywatnej (Discord, e-mail, social media) lub dokonanie wpłaty zadatku jest równoznaczne z zawarciem prawnie wiążącej umowy oraz bezwarunkową akceptacją wszystkich postanowień niniejszego Regulaminu.",
        "Nieznajomość regulaminu nie zwalnia Zamawiającego z jego bezwzględnego przestrzegania.",
      ],
    },
    {
      id: "brief-i-wytyczne",
      number: "§ 2",
      title: "Brief Projektowy i Zmiany Założeń",
      badge: "Zakres prac",
      content: [
        "Przed rozpoczęciem jakichkolwiek prac Zamawiający ma bezwzględny obowiązek dostarczyć pełną, czytelną i spójną listę wytycznych (tzw. brief) określającą wizję, format, oczekiwany styl i kluczowe elementy projektu.",
        "Kwestie niewyszczególnione w briefie przed wpłatą zadatku pozostają wyłącznie w gestii artystycznej i technicznej Wykonawcy i nie mogą być podstawą do bezpłatnych reklamacji ani odmowy odbioru dzieła.",
        "Jakakolwiek zmiana koncepcji, stylu lub kluczowych materiałów w trakcie lub po wykonaniu prac traktowana jest jako nowe zlecenie i podlega odrębnej wycenie według stawki godzinowej.",
      ],
    },
    {
      id: "platnosci-i-zadatek",
      number: "§ 3",
      title: "Płatności, Bezzwrotny Zadatek i Klauzula Anty-Chargeback",
      badge: "Finanse i Ochrona",
      highlight: true,
      content: [
        "Do rozpoczęcia prac wymagana jest bezzwrotna przedpłata (zadatek) w wysokości minimum 50% ustalonej kwoty (lub 100% przy mniejszych zleceniach).",
        "Zadatek ma charakter bezzwrotny i stanowi prawną rekompensatę za zarezerwowany czas, odmowę przyjęcia innych zleceń oraz dotychczas poniesiony nakład pracy, niezależnie od ewentualnej rezygnacji Zamawiającego.",
        "Wszelkie bezpodstawne spory płatnicze (w tym procedury Chargeback w bankach, PayPal lub innych procesorach) traktowane są jako rażące naruszenie umowy. Skutkują natychmiastowym i bezterminowym cofnięciem wszelkich licencji, wpisaniem Zamawiającego na publiczną listę nieuczciwych kontrahentów oraz skierowaniem sprawy na drogę windykacji i postępowania sądowego.",
        "Wydanie finalnych plików w pełnej rozdzielczości (bez znaków wodnych i blokad) następuje WYŁĄCZNIE po zaksięgowaniu 100% ustalonego wynagrodzenia.",
      ],
    },
    {
      id: "poprawki",
      number: "§ 4",
      title: "Zasady Wprowadzania Poprawek i Akceptacja Dzieła",
      badge: "Ograniczenie poprawek",
      content: [
        "W cenie zlecenia zawarty jest limit maksymalnie dwóch (2) tur konstruktywnych poprawek drobnych (np. korekta głośności, zmiana drobnego ujęcia, poprawa literówki).",
        "Poprawki muszą zostać przesłane w formie jednej, zbiorczej i kompletnej listy uwag w terminie do 48 godzin od momentu udostępnienia wersji podglądowej.",
        "Poprawka NIE obejmuje: zmiany zamysłu, nowego montażu od zera, zmiany podkładu muzycznego po jego wcześniejszym zaakceptowaniu ani dodawania elementów wykraczających poza pierwotny brief.",
        "Brak zgłoszenia uwag w terminie 48 godzin od przekazania wersji roboczej jest równoznaczny z bezwarunkową akceptacją dzieła i koniecznością uregulowania pozostałej kwoty.",
        "Wszelkie dodatkowe tury poprawek po wyczerpaniu limitu wyceniane są indywidualnie (stawka minimalna: 50 PLN za każdą kolejną turę).",
      ],
    },
    {
      id: "materialy-i-ghosting",
      number: "§ 5",
      title: "Materiały Klienta oraz Klauzula Porzucenia (Ghosting)",
      badge: "Terminy i Odpowiedzialność",
      highlight: true,
      content: [
        "Zamawiający oświadcza i gwarantuje, że posiada pełne prawa autorskie i zgody do wszelkich materiałów (nagrań, grafik, logotypów, audio) przekazanych Wykonawcy. Zamawiający przejmuje na siebie pełną i wyłączną odpowiedzialność prawno-finansową za ewentualne roszczenia osób trzecich.",
        "Klauzula Ghostingu: W przypadku braku kontaktu, odpowiedzi na wiadomości lub opóźnienia w dostarczeniu materiałów ze strony Zamawiającego przez okres przekraczający 7 dni kalendarzowych, zlecenie zostaje trwale zamknięte i uznane za zrealizowane z winy Zamawiającego.",
        "W przypadku zamknięcia zlecenia z powodu ghostingu, wszelkie wpłacone środki przepadają bez prawa do zwrotu, a rezerwacja terminu wygasa.",
        "Wznowienie porzuconego projektu po wygaśnięciu terminu wymaga ponownej zgody Wykonawcy oraz uiszczenia bezzwrotnej opłaty reaktywacyjnej w wysokości 30% wartości zlecenia.",
      ],
    },
    {
      id: "prawa-autorskie",
      number: "§ 6",
      title: "Prawa Autorskie, Znaki Wodne i Portfolio",
      badge: "Prawa własności",
      content: [
        "Wszelkie materiały podglądowe, próbki i wersje robocze pozostają wyłączną własnością intelektualną Wykonawcy i są chronione znakiem wodnym. Jakiekolwiek ich pobieranie, wycinanie znaku wodnego, publikacja lub udostępnianie osobom trzecim bez opłacenia całości zlecenia stanowi przestępstwo z Ustawy o prawie autorskim i prawach pokrewnych.",
        "Przeniesienie praw do korzystania z gotowego dzieła (licencja na ustalonych polach eksploatacji) następuje wyłącznie w momencie zaksięgowania 100% ceny końcowej.",
        "Pliki projektowe i źródłowe (pliki robocze Adobe Premiere, After Effects, Photoshop, surowy kod źródłowy) nie wchodzą w skład standardowego zamówienia i stanowią warsztat pracy Wykonawcy. Ich przekazanie wymaga osobnego wykupu praw.",
        "Wykonawca zastrzega sobie bezterminowe i niezbywalne prawo do wykorzystania fragmentów zrealizowanego dzieła w swoim portfolio, social mediach oraz materiałach promujących twórczość.",
      ],
    },
    {
      id: "kultura-i-szantaz",
      number: "§ 7",
      title: "Kultura Współpracy, Zakaz Szantażu i Zerwanie Umowy",
      badge: "Standardy i Bezpieczeństwo",
      highlight: true,
      content: [
        "Współpraca opiera się na wzajemnym profesjonalizmie i szacunku. Wykonawca nie toleruje wulgaryzmów, gróźb, nękania, nienawiści, stalkingu ani agresji psychicznej.",
        "Bezwzględny zakaz szantażu: Próby wymuszenia darmowych poprawek, dodatkowych usług lub zwrotu środków pod groźbą wystawienia fałszywych opinii, zrobienia nagonki w sieci, mass-reportów czy zgłoszeń serwera skutkują natychmiastowym zerwaniem współpracy i skierowaniem sprawy do organów ścigania.",
        "W przypadku naruszenia godności osobistej Wykonawcy lub wystąpienia zachowań toksycznych, Wykonawca ma prawo natychmiastowo zerwać umowę w trybie natychmiastowym z winy Zamawiającego, zachowując 100% wpłaconych środków.",
      ],
    },
    {
      id: "wylaczenie-odpowiedzialnosci",
      number: "§ 8",
      title: "Wyłączenie Odpowiedzialności Wynikowej",
      badge: "Odpowiedzialność",
      content: [
        "Wykonawca gwarantuje najwyższą jakość techniczną i artystyczną wykonanej pracy, jednak nie ponosi odpowiedzialności za czynniki zewnętrzne i losowe, w tym:",
        "– Wyniki oglądalności, algorytmy platform zewnętrznych (YouTube, TikTok, Instagram, Twitch), liczbę wyświetleń, kliknięć czy subskrypcji.",
        "– Blokady kont, bany serwerów, ograniczenia wiekowe lub demonetyzację materiałów nałożone przez platformy trzecie (np. Discord, Google, YouTube).",
        "– Awarie infrastruktury hostingowej, domen, zewnętrznych API lub baz danych niezależnych bezpośrednio od Wykonawcy.",
      ],
    },
    {
      id: "postanowienia-koncowe",
      number: "§ 9",
      title: "Postanowienia Końcowe i Właściwość Prawna",
      badge: "Jurysdykcja",
      content: [
        "W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają odpowiednie przepisy Kodeksu Cywilnego oraz Ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych.",
        "Wszelkie spory będą w pierwszej kolejności rozwiązywane na drodze polubownej. W przypadku braku porozumienia, sądem właściwym dla rozstrzygania sporów jest sąd powszechny właściwy dla miejsca działalności Wykonawcy.",
        "Wykonawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie. Zlecenia złożone przed datą modyfikacji podlegają wersji obowiązującej w chwili wpłaty zadatku.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 py-12 sm:py-20 max-w-4xl mx-auto w-full">
      {/* Link powrotny */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500 hover:text-white transition-colors mb-10 group"
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

      {/* Nagłówek Regulaminu */}
      <header className="space-y-4 mb-12 pb-8 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono">
            Dokument Wiążący Prawnie
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Regulamin Świadczenia Usług i Realizacji Zleceń
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Zasady współpracy, ochrony prawnej twórcy oraz realizacji zleceń przez markę{" "}
          <strong className="text-white">deloskiyt</strong>. Wpłata zadatku lub zlecenie prac
          jest tożsame z pełną akceptacją poniższych warunków.
        </p>
        <div className="text-xs text-zinc-500 font-mono pt-2">
          Wersja dokumentu: 2.4 • Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
        </div>
      </header>

      {/* Spis Treści / Skróty */}
      <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 mb-12">
        <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
          Spis Paragrafów Regulaminu:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="hover:text-white transition-colors truncate flex items-center gap-2"
            >
              <span className="font-mono text-zinc-500 font-bold">{s.number}</span>
              <span className="truncate">{s.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Treść Paragrafów */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`p-6 sm:p-8 rounded-2xl transition-all ${
              section.highlight
                ? "bg-zinc-950 border border-zinc-700/80 shadow-[0_0_20px_rgba(255,255,255,0.03)]"
                : "bg-zinc-950/70 border border-zinc-800/70"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-white">
                  {section.number}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {section.title}
                </h3>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                {section.badge}
              </span>
            </div>

            <div className="space-y-3 text-sm text-zinc-300/90 leading-relaxed font-normal">
              {section.content.map((paragraph, idx) => (
                <p key={idx} className="text-justify sm:text-left">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Ostrzeżenie prawne na dole */}
      <div className="mt-12 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-2">
        <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
          Klauzula Ostateczna
        </h4>
        <p>
          Rozpoczęcie współpracy lub wpłata jakichkolwiek środków oznacza zawarcie wiążącej umowy cywilnoprawnej w oparciu o powyższy regulamin. Wykonawca nie wyraża zgody na jakiekolwiek odstępstwa od regulaminu, chyba że zostały one uzgodnione w formie pisemnej pod rygorem nieważności przed rozpoczęciem zlecenia.
        </p>
      </div>

      {/* Stopka */}
      <footer className="mt-14 pt-8 border-t border-zinc-900 text-xs text-zinc-600 flex justify-between items-center">
        <span>© {new Date().getFullYear()} deloskiyt. Wszelkie prawa zastrzeżone.</span>
        <Link href="/" className="hover:text-white transition-colors">
          deloskiyt-web
        </Link>
      </footer>
    </main>
  );
}
