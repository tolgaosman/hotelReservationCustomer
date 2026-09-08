"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe, Menu as MenuIcon, User as UserIcon } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "@/lib/AuthContext";
import { LanguageSwitcher } from "./LanguageSwitcher";



export function Navbar() {
  const tr = useDictionary();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const leftLinks = [
    { href: "/odalar", label: tr.nav.rooms },
    { href: "/restoran", label: tr.nav.restaurant },
    { href: "/galeri", label: tr.nav.gallery },
  ];

  const rightLinks = [
    { href: "/iletisim", label: tr.nav.contact },
    { href: "/bilgi", label: tr.nav.info },
  ];

  const linkClass = (href: string) =>
    cn(
      "text-[11px] uppercase tracking-[0.14em] text-ink/75 transition-colors hover:text-ink",
      pathname === href && "text-ink",
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-surface">
      <div className="relative mx-auto flex h-[var(--nav-h)] w-full items-center justify-between px-6 lg:px-10">
        <div className="hidden items-center gap-8 lg:flex">
          <LanguageSwitcher />
          <nav className="flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Logo />
        </div>

        <div className="flex items-center gap-5 lg:gap-6">
          <nav className="hidden items-center gap-8 lg:flex">
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/rezervasyon"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-9 rounded-none bg-brand px-5 text-[11px] uppercase tracking-[0.14em] text-surface hover:bg-brand-hover",
              )}
            >
              {tr.nav.bookNow}
            </Link>
            {user ? (
              <Popover>
                <PopoverTrigger
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "relative h-9 gap-1.5 rounded-none border-ink/20 px-5 text-[11px] uppercase tracking-[0.14em] text-ink hover:bg-ink/5",
                  )}
                >
                  <UserIcon className="size-3.5" strokeWidth={1.5} />
                  {user.fullName.split(" ")[0]}
                  <ChevronDown className="size-3.5" strokeWidth={1.5} />
                  {!user.identityNumber?.trim() && (
                    <span className="absolute right-2 top-2 size-1.5 rounded-full bg-amber-500" />
                  )}
                </PopoverTrigger>
                <PopoverContent align="end" className="w-52 gap-0 rounded-none p-0">
                  <Link
                    href="/profil"
                    className="block px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/5"
                  >
                    {tr.auth.myAccount}
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="block w-full border-t border-line px-4 py-3 text-left text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/5"
                  >
                    {tr.auth.logout}
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-9 rounded-none border-ink/20 px-5 text-[11px] uppercase tracking-[0.14em] text-ink hover:bg-ink/5",
                  )}
                >
                  {tr.auth.loginButton}
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-9 rounded-none border-ink/20 px-5 text-[11px] uppercase tracking-[0.14em] text-ink hover:bg-ink/5",
                  )}
                >
                  {tr.auth.registerCta}
                </Link>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink lg:hidden"
            aria-label="Menüyü aç"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-line">
              <MenuIcon className="size-3.5" strokeWidth={1.5} />
            </span>
            <span className="hidden sm:inline">Menü</span>
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
