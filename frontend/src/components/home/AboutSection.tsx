import Image from "next/image";
import { tr } from "@/lib/dictionary";
import { rooms } from "@/lib/mock-data";

export function AboutSection() {
  return (
    <section className="pattern-diamond py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="text-center">
          <span className="font-script text-4xl text-brand sm:text-5xl">
            {tr.about.heading}
          </span>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface shadow-sm">
            <Image
              src={rooms[3].images[0]}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="bg-surface p-8 shadow-sm sm:p-12 lg:-ml-20 lg:mt-16">
            <p className="text-base leading-relaxed text-ink/80">
              {tr.about.body}
            </p>
            <button
              type="button"
              className="mt-8 text-[11px] tracking-[0.14em] text-brand underline underline-offset-4 transition-colors hover:text-brand-hover"
            >
              {tr.about.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
