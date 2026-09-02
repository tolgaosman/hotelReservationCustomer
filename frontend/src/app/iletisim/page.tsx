import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { tr } from "@/lib/dictionary";
import { heroSlides, hotelSettings } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: `${tr.contact.heading} — ${tr.brand.name}`,
};

export default function ContactPage() {
  return (
    <main>
      <PageHero title={tr.contact.heading} subtitle={tr.contact.subheading} image={heroSlides[4]} />

      <section className="mx-auto max-w-[1100px] px-6 py-20 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          <ContactForm />

          <div>
            <dl className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
                <div>
                  <dt className="text-[11px] tracking-[0.14em] text-label">
                    {tr.contact.address}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{hotelSettings.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
                <div>
                  <dt className="text-[11px] tracking-[0.14em] text-label">
                    {tr.contact.phone}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{hotelSettings.phone}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
                <div>
                  <dt className="text-[11px] tracking-[0.14em] text-label">
                    {tr.contact.email}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{hotelSettings.email}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 flex aspect-[4/3] items-center justify-center bg-canvas text-xs tracking-[0.14em] text-label">
              {hotelSettings.location}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
