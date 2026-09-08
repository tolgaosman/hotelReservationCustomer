"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function RestaurantGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = () => setActive(null);
  const go = (dir: 1 | -1) =>
    setActive((i) => (i === null ? null : (i + dir + images.length) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="relative aspect-square overflow-hidden rounded-xl shadow-sm bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Image
              src={image}
              alt={`Restaurant Interior ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Önceki"
              className="absolute left-4 text-white/70 transition-colors hover:text-white sm:left-8"
            >
              <ChevronLeft className="size-8" strokeWidth={1.5} />
            </button>
            <div
              className="relative aspect-video w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt=""
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Sonraki"
              className="absolute right-4 text-white/70 transition-colors hover:text-white sm:right-8"
            >
              <ChevronRight className="size-8" strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
