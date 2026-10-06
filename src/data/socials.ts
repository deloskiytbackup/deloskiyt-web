export interface SocialLink {
  id: string;
  name: string;
  url: string;
  hoverColor: string;
}

export const DISCORD_USER_ID = "990607268879929354";

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
    url: "https://open.spotify.com/user/deloskiyt",
    hoverColor: "hover:text-[#1DB954]",
  },
  {
    id: "discord",
    name: "Discord",
    url: `https://discord.com/users/${DISCORD_USER_ID}`,
    hoverColor: "hover:text-[#5865F2]",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/deloskiytbackup",
    hoverColor: "hover:text-white",
  },
];
