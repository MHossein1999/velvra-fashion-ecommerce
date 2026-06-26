"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { scrollToSection } from "@/lib/scroll";
import { EASE } from "@/lib/motion";
import { HeroBackdrop } from "@/components/hero-backdrop";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax with ZERO React re-renders: useScroll writes to a
  // motion value, useTransform maps it, useSpring smooths it, and the value is
  // bound straight to `style`. This replaces the old window scroll listener +
  // setState (which re-rendered the whole hero on every scroll frame).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imageY = useSpring(rawY, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      {/* Contained creamy hero panel. The editorial V pattern lives INSIDE this
          rounded panel (overflow-hidden), so it reads as an intentional element
          behind the creamy surface — never a page-wide texture. */}
      <div className="absolute z-0 inset-x-2.5 top-2 bottom-2 sm:inset-x-4 sm:top-3 sm:bottom-3 lg:inset-x-6 lg:top-4 lg:bottom-4 overflow-hidden rounded-[1.25rem] lg:rounded-[2rem] border border-foreground/10 bg-[oklch(0.95_0.02_80)] shadow-[inset_0_1px_0_oklch(1_0_0/0.6),0_30px_70px_-40px_oklch(0.4_0.03_55/0.3)]">
        {/* Editorial luxury backdrop — swappable campaign-set variants. See
            components/hero-backdrop.tsx; select with `?bg=<variant>`. */}
        <HeroBackdrop />

        {/* Signature editorial marks ON the creamy panel — a thin inner frame and
            corner registration ticks, like printer's crop marks. Subtle, luxury,
            and they anchor the composition beneath the header. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-3 rounded-[1rem] border border-foreground/[0.07] lg:inset-5 lg:rounded-[1.5rem]" />
          {/* corner crop ticks */}
          <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-foreground/25 lg:left-7 lg:top-7" />
          <div className="absolute right-4 top-4 h-5 w-5 border-r border-t border-foreground/25 lg:right-7 lg:top-7" />
          <div className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-foreground/25 lg:bottom-7 lg:left-7" />
          <div className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-foreground/25 lg:bottom-7 lg:right-7" />
          {/* top-centre maker's mark, anchoring the header above */}
          <div className="absolute left-1/2 top-5 hidden -translate-x-1/2 items-center gap-2 lg:flex lg:top-8">
            <span className="h-px w-7 bg-foreground/20" />
            <span className="font-display text-sm italic text-foreground/40">
              est. MMXXIV
            </span>
            <span className="h-px w-7 bg-foreground/20" />
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">
        {/* Left side: Text content — nudged up slightly to feel elevated */}
        <motion.div
          className="text-left order-2 lg:order-1 lg:-mt-14 lg:ml-6"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h1 className="font-display font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.75rem] mb-5 md:mb-7 text-foreground leading-[1.05] tracking-tight">
            Elegance
            <br />
            in Every Layer
          </h1>
          <p className="text-lg md:text-xl text-foreground/85 mb-7 md:mb-10 max-w-xl lg:max-w-lg leading-relaxed font-serif">
            Discover our curated selection of cozy sweaters, elegant coats, and
            timeless accessories perfect for the cooler seasons. Embrace warmth
            without compromising style.
          </p>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("#new")}
              className="bg-[oklch(0.47_0.07_60)] hover:bg-[oklch(0.43_0.07_60)] text-secondary-foreground rounded-md px-9 md:px-11 py-5 md:py-6 text-xs md:text-base font-serif font-medium uppercase tracking-[0.18em] shadow-sm group transition-colors duration-300 cursor-pointer"
            >
              Shop Collection
              <ArrowRight className="ml-3 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right side: Fashion image — entrance (outer) + scroll parallax (inner)
            kept on separate elements so the two `y` transforms don't collide.
            No hover animation on the image itself, by design. Nudged up slightly
            to sit higher in the composition. */}
        <motion.div
          className="relative h-[55vh] lg:h-[80vh] order-1 lg:order-2 lg:-mt-6 xl:-mt-10"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        >
          <motion.div className="relative h-full w-full" style={{ y: imageY }}>
            <Image
              src="/hero-woman.webp"
              alt="Woman in an elegant camel suede coat and cream knit turtleneck"
              fill
              sizes="(max-width: 1024px) 80vw, 45vw"
              quality={90}
              className="object-contain object-bottom"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
