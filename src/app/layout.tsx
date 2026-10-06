import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deloskiyt-web.vercel.app"),
  title: {
    default: "deloskiyt",
    template: "%s | deloskiyt",
  },
  description: "Oficjalna strona deloskiyt - YouTube, Spotify, Discord oraz portfolio.",
  keywords: ["deloskiyt", "youtube", "spotify", "discord", "portfolio", "twórca"],
  authors: [{ name: "deloskiyt" }],
  creator: "deloskiyt",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://deloskiyt-web.vercel.app",
    title: "deloskiyt",
    description: "Oficjalna strona deloskiyt - YouTube, Spotify, Discord oraz portfolio.",
    siteName: "deloskiyt",
  },
  twitter: {
    card: "summary_large_image",
    title: "deloskiyt",
    description: "Oficjalna strona deloskiyt - YouTube, Spotify, Discord oraz portfolio.",
  },
};

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
