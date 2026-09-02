import Image from "next/image";

export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-[42vh] min-h-[300px] w-full items-center justify-center overflow-hidden text-center text-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative px-6">
        <h1 className="font-serif text-[clamp(2.25rem,5vw,3.5rem)]">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-[11px] tracking-[0.2em] text-white/85">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
