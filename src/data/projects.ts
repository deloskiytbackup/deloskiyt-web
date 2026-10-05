export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    title: "Kanał YouTube",
    category: "Wideo & Twórczość",
    description: "Tworzenie materiałów wideo, transmisji oraz stały rozwój społeczności.",
    tags: ["YouTube", "Montaż", "Gaming"],
    link: "https://youtube.com/@deloskiyt",
  },
  {
    title: "Społeczność Discord",
    category: "Community & Eventy",
    description: "Prowadzenie własnego serwera Discord, moderacja oraz organizacja wydarzeń dla widzów.",
    tags: ["Discord", "Społeczność", "Boty"],
    link: "https://discord.gg",
  },
  {
    title: "Kolekcje Muzyczne",
    category: "Muzyka & Playlists",
    description: "Selekcja playlist i ulubionych utworów dostępnych na profilu Spotify.",
    tags: ["Spotify", "Playlisty", "Audio"],
    link: "https://open.spotify.com",
  },
  {
    title: "Projekty Webowe",
    category: "Development",
    description: "Nowoczesne aplikacje internetowe i projekty cyfrowe tworzone w Next.js & Tailwind CSS.",
    tags: ["Next.js", "React", "Tailwind"],
    link: "https://github.com/deloskiytbackup/deloskiyt-web",
  },
];
