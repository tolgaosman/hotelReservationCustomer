import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Parisienne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
});

export const metadata: Metadata = {
  title: "W-40 Hotel",
  description: "Kıbrıs'ın kalbinde lüks konaklama — W-40 Hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${cormorant.variable} ${parisienne.variable}`}
    >
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
