"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The photo + scrim stack. Four fixed layers under the content grid:
 * - bg-ink/10 warms every photo toward the brand's brown-black so five
 *   different Unsplash color temperatures read as one hotel.
 * - the bottom gradient guarantees white text clears 4.5:1 even on the
 *   brightest (sunset) room photo.
 * - the two side gutters aren't for text, they're for the glass cards:
 *   a bg-white/92 card floating on a bright bedsheet has almost no edge.
 */
export function StageBackdrop({
  images,
  active,
  title,
}: {
  images: string[];
  active: number;
  title: string;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      {images.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: i === active ? 1 : 0 }}
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={src}
            alt={`${title} - ${i + 1}`}
            fill
            priority={true}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 z-10 bg-ink/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      <div className="absolute inset-y-0 right-0 z-10 w-[46%] bg-gradient-to-l from-black/45 to-transparent" />
      <div className="absolute inset-y-0 left-0 z-10 w-[36%] bg-gradient-to-r from-black/40 to-transparent" />
    </>
  );
}
