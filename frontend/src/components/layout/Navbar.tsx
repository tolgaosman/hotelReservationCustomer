"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu as MenuIcon } from "lucide-react";
import { tr } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const leftLinks = [
  { href: "/rezervasyon", label: tr.nav.onlineBooking },
  { href: "/odalar", label: tr.nav.rooms },
];

const rightLinks = [
  { href: "/iletisim", label: tr.nav.contact },
  { href: "/bilgi", label: tr.nav.info },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    cn(
      "text-[11px] tracking-[0.14em] text-ink/75 transition-colors hover:text-ink",
      pathname === href && "text-ink",
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-surface">
      <div className="mx-auto flex h-[var(--nav-h)] max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <div className="hidden items-center gap-8 lg:flex">
          <button
            type="button"
            className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink"
            aria-label="Dil seçimi"
          >
            <Globe className="size-4" strokeWidth={1.5} />
            {tr.nav.lang}
          </button>
          <nav className="flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Logo />

        <div className="flex items-center gap-5 lg:gap-6">
          <nav className="hidden items-center gap-8 lg:flex">
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink"
            aria-label="Menüyü aç"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-line">
              <MenuIcon className="size-3.5" strokeWidth={1.5} />
            </span>
            <span className="hidden sm:inline">MENÜ</span>
          </button>
          <Link
            href="/rezervasyon"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden h-9 rounded-none border-ink px-5 text-[11px] tracking-[0.14em] hover:bg-ink hover:text-surface sm:inline-flex",
            )}
          >
            {tr.nav.bookNow}
          </Link>
        </div>
      </div>
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
