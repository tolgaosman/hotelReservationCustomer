import Link from "next/link";
import { tr } from "@/lib/dictionary";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-col items-center leading-none text-ink"
    >
      <span className="font-serif text-xl tracking-[0.08em]">
        {tr.brand.name}
      </span>
      <span className="mt-1.5 flex items-center gap-2 text-[9px] tracking-[0.35em] text-label">
        <span className="h-px w-4 bg-line" />
        {tr.brand.tagline}
        <span className="h-px w-4 bg-line" />
      </span>
    </Link>
  );
}
