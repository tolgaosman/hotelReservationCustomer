import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getSettings } from "@/lib/api";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Oasis Resort",
  description: "Kıbrıs'ın kalbinde lüks konaklama — Oasis Resort",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="tr" className={`${montserrat.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className={`${playfair.variable} ${greatVibes.variable} bg-canvas font-sans text-ink antialiased selection:bg-brand selection:text-white`}>
        <AuthProvider>
          <SiteChrome settings={settings}>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
