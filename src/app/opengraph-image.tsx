import { ImageResponse } from "next/og";

export const alt = "deloskiyt - Oficjalna strona";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 50% 45%, #18181b 0%, #000000 80%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#09090b",
            border: "2px solid #27272a",
            marginBottom: 24,
            fontSize: 60,
            fontWeight: 800,
          }}
        >
          D
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            marginBottom: 16,
          }}
        >
          deloskiyt
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a1a1aa",
            fontWeight: 500,
          }}
        >
          YouTube • Spotify • Discord • Portfolio
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
