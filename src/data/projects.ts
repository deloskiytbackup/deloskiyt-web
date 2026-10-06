export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  stats?: ProjectStat[];
  tags: string[];
  link: string;
  linkLabel: string;
}

export const projects: Project[] = [
  {
    id: "youtube",
    title: "Kanał YouTube",
    category: "Wideo & Twórczość",
    description: "Tworzenie materiałów wideo, transmisji oraz stały rozwój społeczności.",
    fullDescription:
      "Główny kanał YouTube prowadzony przez deloskiyt, skupiający się na wysokiej jakości materiałach wideo, gamingowych seriach, autorskich projektach oraz dynamicznym montażu. Regularne materiały, serie tematyczne oraz bezpośredni kontakt z widzami tworzą unikalną atmosferę dla zaangażowanej widowni.",
    highlights: [
      "Profesjonalny montaż i nowoczesna oprawa audiowizualna",
      "Regularne publikacje oraz interaktywne transmisje na żywo",
      "Współpraca z polskimi twórcami i społecznościami gamingowymi",
      "Stały kontakt z widzami i budowanie zaangażowanej publiczności",
    ],
    stats: [
      { label: "Platforma", value: "YouTube" },
      { label: "Twórca", value: "deloskiyt" },
      { label: "Format", value: "1080p60 / 4K" },
      { label: "Status", value: "Aktywny" },
    ],
    tags: ["YouTube", "Montaż", "Gaming", "Content Creator"],
    link: "https://youtube.com/@deloskiyt",
    linkLabel: "Odwiedź kanał YouTube",
  },
  {
    id: "discord",
    title: "Społeczność Discord",
    category: "Community & Eventy",
    description: "Prowadzenie własnego serwera Discord, moderacja oraz organizacja wydarzeń dla widzów.",
    fullDescription:
      "Oficjalny serwer Discord deloskiyt stanowiący centrum całej społeczności. Serwer wyposażony jest w autorskiego bota Discord zintegrowanego z bazą Neon PostgreSQL, automatyczny system weryfikacji licencji klientów, system ticketów pomocy technicznej oraz strefę dla graczy i twórców.",
    highlights: [
      "Dedykowany bot deloskiyt zintegrowany z bazą Neon PostgreSQL",
      "Automatyczny system licencjonowania i natychmiastowych ticketów wsparcia",
      "Regularne turnieje, eventy społecznościowe oraz giveawaye",
      "Bezpieczna przestrzeń z aktywną moderacją i rozbudowaną strukturą ról",
    ],
    stats: [
      { label: "Silnik Bota", value: "Discord.js v14" },
      { label: "Baza danych", value: "Neon PostgreSQL" },
      { label: "Dostępność", value: "24/7 Uptime" },
      { label: "Wsparcie", value: "Tickety Live" },
    ],
    tags: ["Discord", "Społeczność", "Boty", "Eventy"],
    link: "https://discord.gg/deloskiyt",
    linkLabel: "Dołącz do serwera Discord",
  },
  {
    id: "muzyka",
    title: "Kolekcje Muzyczne",
    category: "Muzyka & Playlists",
    description: "Selekcja playlist i ulubionych utworów dostępnych na profilu Spotify.",
    fullDescription:
      "Starannie wyselekcjonowane playlisty i autorskie zestawienia muzyczne tworzone przez deloskiyt na platformie Spotify. Utwory dobrane idealnie do pracy, gamingu, kodowania oraz wieczornego chilloutu, stale aktualizowane o najnowsze odkrycia muzyczne.",
    highlights: [
      "Różnorodne klimaty: Phonk, Hip-Hop, Lo-Fi, Synthwave i Gaming Beats",
      "Cykliczne odświeżanie zestawień i dodawanie nowości",
      "Dźwięki wyselekcjonowane pod montaż filmów i streamy",
      "Publicznie dostępne playlisty dla każdego słuchacza",
    ],
    stats: [
      { label: "Platforma", value: "Spotify" },
      { label: "Kuratela", value: "deloskiyt" },
      { label: "Jakość", value: "Lossless / 320 kbps" },
      { label: "Klimat", value: "Chill & Focus" },
    ],
    tags: ["Spotify", "Playlisty", "Audio", "Muzyka"],
    link: "https://open.spotify.com/user/deloskiyt",
    linkLabel: "Otwórz profil Spotify",
  },
  {
    id: "projekty-webowe",
    title: "Projekty Webowe",
    category: "Development",
    description: "Nowoczesne aplikacje internetowe i projekty cyfrowe tworzone w Next.js & Tailwind CSS.",
    fullDescription:
      "Portfolio nowoczesnych aplikacji internetowych, paneli klienta i serwisów cyfrowych tworzonych w oparciu o najnowszy stos technologiczny: Next.js 16 (App Router z Turbopackiem), React 19, TypeScript, Tailwind CSS v4, Prisma ORM oraz bezserwerowe bazy danych Neon PostgreSQL.",
    highlights: [
      "Architektura SSR i Server Components zoptymalizowana pod szybkość",
      "Płynne, fizyczne animacje interfejsu (Framer Motion)",
      "Bezpieczny system autoryzacji sesyjnej, zamówień i licencji",
      "Integracje z bramkami płatności Stripe oraz API Discorda",
    ],
    stats: [
      { label: "Framework", value: "Next.js 16 + React 19" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Baza danych", value: "Neon PostgreSQL" },
      { label: "Hosting", value: "Vercel Edge" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/deloskiytbackup/deloskiyt-web",
    linkLabel: "Zobacz kod na GitHub",
  },
];

export function getProjectById(id: string): Project | undefined {
  const clean = String(id).trim().toLowerCase();
  return projects.find((p) => p.id.toLowerCase() === clean);
}
