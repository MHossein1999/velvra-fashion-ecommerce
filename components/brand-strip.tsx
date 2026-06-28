"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";

/**
 * "As featured in" partner-brand strip beneath the hero, mirroring the
 * reference layout: a cream bar with a top divider and evenly spaced
 * wordmarks. Each brand is rendered as styled text built from the site's
 * own typography system (display / sans / script) rather than bitmap logos.
 */
const BRANDS = [
  {
    name: "H&M",
    className: "font-sans font-bold italic text-xl md:text-2xl text-[#e3000f]",
  },
  {
    name: "OBEY",
    className:
      "font-display font-black tracking-tight text-xl md:text-2xl text-foreground",
  },
  {
    name: "Shopify",
    className: "font-sans font-semibold text-lg md:text-xl text-[#5a863e]",
  },
  {
    name: "LACOSTE",
    className:
      "font-sans font-semibold tracking-[0.15em] text-base md:text-lg text-foreground",
  },
  {
    name: "Levi's",
    className: "font-display font-bold italic text-lg md:text-xl text-[#c9152b]",
  },
  {
    name: "amazon",
    className: "font-sans font-semibold text-xl md:text-2xl text-foreground",
  },
];

export function BrandStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-13 lg:justify-between">
          {BRANDS.map((brand, i) => (
            <motion.span
              key={brand.name}
              className={`${brand.className} opacity-80 hover:opacity-100 transition-opacity duration-300 select-none`}
              initial={reduce ? { opacity: 0.8 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            >
              {brand.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
