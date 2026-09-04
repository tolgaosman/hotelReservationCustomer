import type { Metadata } from "next";
import { Check, Clock, PawPrint, CigaretteOff, CalendarClock, CalendarX, Info, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { AmenityList } from "@/components/rooms/AmenityList";
import { tr } from "@/lib/dictionary";
import { heroSlides } from "@/lib/hero-slides";
import { getRooms, getSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: `${tr.info.heading} — ${tr.brand.name}`,
};

export default async function InfoPage() {
  const [rooms, settings] = await Promise.all([getRooms(), getSettings()]);
  const allAmenities = Array.from(new Set(rooms.flatMap((room) => room.amenities)));

  return (
    <main className="bg-canvas/30 pb-32">
      <PageHero title={tr.info.heading} image={heroSlides[3]} />

      <section className="mx-auto max-w-[1100px] px-6 lg:px-10 -mt-16 relative z-10">
        
        {/* Check-in / Check-out Card */}
        <div className="bg-surface rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-line/40 p-8 md:p-12 mb-12 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 pattern-diamond opacity-5 pointer-events-none" />
          
          <div className="relative z-10 grid gap-10 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line/30">
            <div className="flex flex-col items-center text-center md:items-start md:text-left md:pr-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Clock className="size-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-xs font-semibold tracking-[0.25em] text-label uppercase">
                {tr.info.checkIn}
              </h3>
              <p className="font-serif text-5xl text-ink">
                {settings.checkInTime}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-ink/60">
                Odanız bu saatten itibaren kullanımınıza hazır olacaktır. Erken giriş talepleriniz için lütfen resepsiyonla iletişime geçin.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center md:items-start md:text-left pt-10 md:pt-0 md:pl-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Clock className="size-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-xs font-semibold tracking-[0.25em] text-label uppercase">
                {tr.info.checkOut}
              </h3>
              <p className="font-serif text-5xl text-ink">
                {settings.checkOutTime}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-ink/60">
                Odanızı bu saate kadar boşaltmanızı rica ederiz. Geç çıkış talepleriniz müsaitlik durumuna göre değerlendirilir.
              </p>
            </div>
          </div>
        </div>

        {/* Info Cards (Symmetrical Grid) */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-stretch">
          
          {/* Policies Card */}
          <div className="bg-surface rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-line/40 p-8 md:p-10 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8 pb-5 border-b border-line/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas">
                <ShieldCheck className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-2xl text-ink tracking-wide">
                {tr.info.policies}
              </h2>
            </div>
            
            <ul className="space-y-6 flex-1">
              {tr.info.policiesList.map((policy, idx) => {
                const Icon = [PawPrint, CigaretteOff, CalendarClock, CalendarX][idx] || Check;
                return (
                  <li key={policy} className="flex items-start gap-4 text-[14px] leading-relaxed text-ink/80">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10">
                      <Icon className="size-3.5 text-brand" strokeWidth={2} />
                    </div>
                    <span>{policy}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Facilities Card */}
          <div className="bg-surface rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-line/40 p-8 md:p-10 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8 pb-5 border-b border-line/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas">
                <Info className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-2xl text-ink tracking-wide">
                {tr.info.facilities}
              </h2>
            </div>
            
            <div className="flex-1">
              <AmenityList amenities={allAmenities} variant="table" />
            </div>
          </div>

        </div>

        {/* Decorative Full-Width Banner */}
        <div className="relative h-[350px] w-full rounded-2xl overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-700 z-10" />
          <img 
            src={heroSlides[1]} 
            alt="Oasis Resort - Unutulmaz Anlar" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-6">
            <h3 className="text-white font-script text-5xl md:text-7xl opacity-95 drop-shadow-lg mb-4">
              Unutulmaz Anlar...
            </h3>
            <p className="text-white/80 tracking-[0.2em] text-xs uppercase font-medium drop-shadow-md">
              Kıbrıs'ın İncisi Oasis Resort
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}

