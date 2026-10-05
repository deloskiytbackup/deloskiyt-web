export interface SocialLink {
  id: string;
  name: string;
  url: string;
  hoverColor: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@deloskiyt",
    hoverColor: "hover:text-red-500",
  },
  {
    id: "spotify",
    name: "Spotify",
    url: "https://open.spotify.com",
    hoverColor: "hover:text-[#1DB954]",
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.gg",
    hoverColor: "hover:text-[#5865F2]",
  },
];
