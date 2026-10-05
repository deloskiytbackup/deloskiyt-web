"use client";

import { useLanyard } from "@/hooks/useLanyard";
import { DISCORD_USER_ID } from "@/data/socials";

export function DiscordStatus() {
  const { data, isMonitored } = useLanyard(DISCORD_USER_ID);

  if (!isMonitored || !data) {
    return (
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>deloskiyt</span>
      </div>
    );
  }

  const status = data.discord_status || "offline";
  const spotify = data.listening_to_spotify ? data.spotify : null;

  const statusConfig = {
    online: { label: "Online na Discordzie", color: "bg-emerald-500", glow: "shadow-[0_0_10px_#10b981]" },
    idle: { label: "Zaraz wracam", color: "bg-amber-400", glow: "shadow-[0_0_10px_#fbbf24]" },
    dnd: { label: "Nie przeszkadzać", color: "bg-rose-500", glow: "shadow-[0_0_10px_#f43f5e]" },
    offline: { label: "Offline na Discordzie", color: "bg-zinc-600", glow: "" },
  }[status];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Discord Status */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400">
        <span className={`w-2 h-2 rounded-full ${statusConfig.color} ${statusConfig.glow}`} />
        <span>{statusConfig.label}</span>
      </div>

      {/* Spotify Now Playing */}
      {spotify && (
        <a
          href={`https://open.spotify.com/track/${spotify.song}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-950/90 border border-emerald-500/30 hover:border-emerald-500/60 text-xs text-zinc-300 transition-colors group"
        >
          {/* Animated Equalizer */}
          <div className="flex items-end gap-[2px] h-3">
            <span className="w-[3px] h-full bg-[#1DB954] rounded-full animate-pulse" />
            <span className="w-[3px] h-2 bg-[#1DB954] rounded-full animate-bounce" />
            <span className="w-[3px] h-2.5 bg-[#1DB954] rounded-full animate-pulse" />
          </div>

          <span className="text-zinc-400">Słucha:</span>
          <span className="font-medium text-white group-hover:text-[#1DB954] transition-colors truncate max-w-[180px] sm:max-w-[260px]">
            {spotify.song} – {spotify.artist}
          </span>
        </a>
      )}
    </div>
  );
}
