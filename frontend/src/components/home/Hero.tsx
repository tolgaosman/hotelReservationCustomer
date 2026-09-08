"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import { heroSlides } from "@/lib/hero-slides";

export function Hero() {
  const tr = useDictionary();
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden lg:min-h-screen">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[index]}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/55" />

      <div className="relative flex h-full min-h-[92vh] flex-col items-center justify-center px-6 text-center text-white lg:min-h-screen">
        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight"
        >
          {tr.hero.titleTop}
        </motion.h1>
        <motion.p
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="-mt-1 font-script text-[clamp(2.5rem,7vw,5.5rem)] text-white/95 sm:-mt-3"
        >
          {tr.hero.titleScript}
        </motion.p>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 text-[11px] tracking-[0.3em] text-white/80"
        >
          {tr.hero.explore}
        </motion.span>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex items-center justify-between px-6 text-white sm:bottom-10 lg:px-10">
        <p className="max-w-[200px] text-[10px] tracking-[0.14em] text-white/85 sm:max-w-none">
          {tr.hero.tagline}
        </p>
        <div className="flex items-center gap-3 text-[11px] tracking-[0.14em]">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Önceki"
            className="transition-opacity hover:opacity-70"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>
          <span>
            {index + 1}/{heroSlides.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Sonraki"
            className="transition-opacity hover:opacity-70"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
