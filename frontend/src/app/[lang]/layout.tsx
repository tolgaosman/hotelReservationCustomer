import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Great_Vibes } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getSettings } from "@/lib/api";
import { getDictionary } from "@/lib/dictionary";
import { DictionaryProvider } from "@/lib/DictionaryContext";

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

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;

  const settings = await getSettings();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${montserrat.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className={`${playfair.variable} ${greatVibes.variable} bg-canvas font-sans text-ink antialiased selection:bg-brand selection:text-white`}>
        <AuthProvider>
          <DictionaryProvider lang={lang}>
            <SiteChrome settings={settings}>{children}</SiteChrome>
          </DictionaryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
