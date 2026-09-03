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
  const hideChrome = CHROME_HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer settings={settings} />}
    </>
  );
}
