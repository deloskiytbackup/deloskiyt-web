"use client";

import { useEffect, useState } from "react";

export interface LanyardSpotify {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
  discord_user?: {
    id: string;
    username: string;
    avatar: string;
    global_name?: string;
  };
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isMonitored, setIsMonitored] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    let heartbeatInterval: NodeJS.Timeout;
    let ws: WebSocket;

    // Initial fetch via REST
    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
          setIsMonitored(true);
        } else if (res.error?.code === "user_not_monitored") {
          setIsMonitored(false);
        }
      })
      .catch(() => {});

    // WebSocket connection for real-time presence
    try {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { op, d, t } = message;

          if (op === 1) {
            // Hello opcode
            heartbeatInterval = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, d.heartbeat_interval);

            // Subscribe to user
            ws.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: userId },
              })
            );
          } else if (op === 0 && (t === "INIT_STATE" || t === "PRESENCE_UPDATE")) {
            setData(d);
            setIsMonitored(true);
          }
        } catch {
          // ignore parsing error
        }
      };

      ws.onerror = () => {
        // ws error fallback
      };
    } catch {
      // ignore
    }

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (ws && ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, [userId]);

  return { data, isMonitored };
}
