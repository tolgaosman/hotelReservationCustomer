import type { Metadata } from "next";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { getDictionary } from "@/lib/dictionary";
import { heroSlides } from "@/lib/hero-slides";
import { getSettings } from "@/lib/api";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {
  title: `${tr.contact.heading} — ${tr.brand.name}`,
};
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const tr = await getDictionary(resolvedParams.lang as any);
  const settings = await getSettings();

  const details = [
    { icon: MapPin, label: tr.contact.address, value: settings.address },
    { icon: Phone, label: tr.contact.phone, value: settings.phone },
    { icon: Mail, label: tr.contact.email, value: settings.email },
  ];

  return (
    <main className="bg-canvas/30 pb-32">
      <PageHero title={tr.contact.heading} subtitle={tr.contact.subheading} image={heroSlides[4]} />

      <section className="mx-auto max-w-[1100px] px-6 lg:px-10 -mt-16 relative z-10">
        <div className="grid md:grid-cols-5 gap-8 items-stretch">

          {/* Form Card */}
          <div className="md:col-span-3 bg-surface rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-line/40 p-8 md:p-10 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8 pb-5 border-b border-line/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas">
                <MessageSquare className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-2xl text-ink tracking-wide">
                {tr.contact.heading}
              </h2>
            </div>
            <ContactForm />
          </div>

          {/* Details Card */}
          <div className="md:col-span-2 bg-surface rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-line/40 p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
            <div className="absolute inset-0 pattern-diamond opacity-5 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8 pb-5 border-b border-line/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas">
                  <MapPin className="size-5 text-brand" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-2xl text-ink tracking-wide">
                  Konum
                </h2>
              </div>

              <dl className="space-y-6">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10">
                      <Icon className="size-3.5 text-brand" strokeWidth={2} />
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold tracking-[0.14em] text-label uppercase">
                        {label}
                      </dt>
                      <dd className="mt-1 text-[14px] leading-relaxed text-ink/80">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-1 min-h-[160px] items-center justify-center rounded-xl bg-canvas text-center text-[11px] tracking-[0.14em] text-label uppercase">
                {settings.location}
              </div>
            </div>
          </div>

        </div>

        {/* Decorative Full-Width Banner */}
        <div className="relative h-[350px] w-full rounded-2xl overflow-hidden group shadow-xl mt-12">
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-700 z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSlides[2]}
            alt="Oasis Resort - Sizi Bekliyoruz"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-6">
            <h3 className="text-white font-script text-5xl md:text-7xl opacity-95 drop-shadow-lg mb-4">
              Sizi Ağırlamak İçin Sabırsızlanıyoruz
            </h3>
            <p className="text-white/80 tracking-[0.2em] text-xs uppercase font-medium drop-shadow-md">
              Kıbrıs&apos;ın İncisi Oasis Resort
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}
