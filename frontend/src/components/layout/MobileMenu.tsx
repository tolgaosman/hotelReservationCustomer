"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDictionary } from "@/lib/DictionaryContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import { languages, setLocaleCookie } from "./LanguageSwitcher";



interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const tr = useDictionary();
  const { user, logout } = useAuth();
  const router = useRouter();

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/odalar", label: tr.nav.rooms },
    { href: "/restoran", label: tr.nav.restaurant },
    { href: "/galeri", label: tr.nav.gallery },
    { href: "/bilgi", label: tr.nav.info },
    { href: "/iletisim", label: tr.nav.contact },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto data-[side=right]:w-full data-[side=right]:sm:w-3/4 sm:max-w-sm">
        <SheetHeader className="border-b border-line pb-4">
          <SheetTitle className="font-serif text-center text-lg tracking-[0.08em] text-ink">
            {tr.brand.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col px-6 pb-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className="border-b border-line py-4 text-center text-[15px] tracking-normal text-ink"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/profil"
                onClick={() => onOpenChange(false)}
                className="border-b border-line py-4 text-center text-[15px] tracking-normal text-ink"
              >
                {tr.auth.myAccount}
              </Link>
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  logout();
                }}
                className="border-b border-line py-4 text-center text-[15px] tracking-normal text-ink"
              >
                {tr.auth.logout}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => onOpenChange(false)}
                className="border-b border-line py-4 text-center text-[15px] tracking-normal text-ink"
              >
                {tr.auth.loginButton}
              </Link>
              <Link
                href="/register"
                onClick={() => onOpenChange(false)}
                className="border-b border-line py-4 text-center text-[15px] tracking-normal text-ink"
              >
                {tr.auth.registerCta}
              </Link>
            </>
          )}
          <Link
            href="/rezervasyon"
            onClick={() => onOpenChange(false)}
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-8 h-11 w-full rounded-none bg-brand text-[11px] tracking-[0.14em] hover:bg-brand-hover",
            )}
          >
            {tr.nav.bookNow}
          </Link>
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            role="group"
            aria-label={tr.nav.langAria}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLocaleCookie(lang.code);
                  onOpenChange(false);
                  router.refresh();
                }}
                aria-current={tr.nav.lang === lang.short ? "true" : undefined}
                className={cn(
                  "h-10 min-w-12 border px-3 text-[11px] tracking-[0.14em] transition-colors",
                  tr.nav.lang === lang.short
                    ? "border-brand bg-brand text-white"
                    : "border-line text-ink hover:bg-ink/5",
                )}
              >
                {lang.short}
              </button>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
