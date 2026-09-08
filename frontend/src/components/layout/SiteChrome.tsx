"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import type { HotelSettings } from "@/lib/types";

/** Bu path'lerde (ve altlarında) header/footer gösterilmez — auth ekranları. */
const CHROME_HIDDEN_PREFIXES = ["/login", "/register", "/auth"];

export function SiteChrome({
  settings,
  children,
}: {
  settings: HotelSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathWithoutLang = pathname.replace(/^\/[a-zA-Z]{2}(?:\/|$)/, "/");
  const normalizedPath = pathWithoutLang === "/" ? "/" : pathWithoutLang.replace(/\/$/, "");

  const hideChrome = CHROME_HIDDEN_PREFIXES.some(
    (prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );

  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer settings={settings} />}
    </>
  );
}
