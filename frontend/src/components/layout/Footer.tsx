import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { tr } from "@/lib/dictionary";
import { hotelSettings } from "@/lib/mock-data";

const quickLinks = [
  { href: "/odalar", label: tr.nav.rooms },
  { href: "/rezervasyon", label: tr.nav.onlineBooking },
  { href: "/galeri", label: "Galeri" },
  { href: "/bilgi", label: tr.nav.info },
];

const legalLinks = [
  { href: "/kvkk", label: tr.legal.kvkkTitle },
  { href: "/kosullar", label: tr.legal.kosullarTitle },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <span className="font-serif text-xl tracking-[0.08em] text-ink">
            {tr.brand.name}
          </span>
          <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-label">
            {hotelSettings.location} kıyısında, denize sıfır konumuyla lüks
            konaklama.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] tracking-[0.14em] text-ink">
            {tr.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-label transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] tracking-[0.14em] text-ink">
            {tr.footer.contact}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-label">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
              {hotelSettings.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" strokeWidth={1.5} />
              {hotelSettings.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" strokeWidth={1.5} />
              {hotelSettings.email}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] tracking-[0.14em] text-ink">Yasal</h3>
          <ul className="mt-4 space-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-label transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-6 py-6 text-center text-xs tracking-[0.08em] text-label lg:px-10">
        {tr.footer.rights(new Date().getFullYear())}
      </div>
    </footer>
  );
}
