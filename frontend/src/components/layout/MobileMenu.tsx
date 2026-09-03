"use client";

import Link from "next/link";
import { tr } from "@/lib/dictionary";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";

const links = [
  { href: "/", label: "Ana sayfa" },
  { href: "/galeri", label: "Galeri" },
  { href: "/bilgi", label: "Bilgi" },
  { href: "/iletisim", label: "İletişim" },
];

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const { user, logout } = useAuth();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader className="border-b border-line pb-4">
          <SheetTitle className="font-serif text-center text-lg tracking-[0.08em] text-ink">
            {tr.brand.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col px-6">
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
        </nav>
      </SheetContent>
    </Sheet>
  );
}
