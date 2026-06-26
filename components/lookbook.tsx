"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

import { Reveal } from "@/components/motion-primitives"
import { SectionBackdrop } from "@/components/editorial-backdrop"
import { scrollToSection } from "@/lib/scroll"

export function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null)

  // Gentle scroll parallax: the two image columns drift at slightly different
  // rates as the section passes through the viewport. Motion-value driven, so no
  // re-renders.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const colA = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), {
    stiffness: 80,
    damping: 30,
  })
  const colB = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 40]), {
    stiffness: 80,
    damping: 30,
  })

  return (
    <section ref={sectionRef} id="lookbook" className="relative overflow-hidden py-16 md:py-24">
      <SectionBackdrop tone="center" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-6">Autumn Essentials</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                Embrace the changing season with our thoughtfully curated collection of timeless pieces. From luxurious
                knits to structured outerwear, each item is designed to elevate your everyday wardrobe with effortless
                sophistication.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
                Crafted from premium materials and finished with meticulous attention to detail, our Autumn/Winter
                collection celebrates the beauty of understated elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("#new")}
                  className="inline-flex items-center justify-center text-sm font-medium hover:text-muted-foreground transition-colors cursor-pointer"
                >
                  Explore the Collection →
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <motion.div className="space-y-4" style={{ y: colA }}>
                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                  <Image src="/woman-in-beige-sweater-autumn-styling.jpg" alt="Autumn styling" fill sizes="(min-width: 1024px) 25vw, 50vw" quality={90} className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04] transform-gpu" />
                </div>
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <Image src="/serene-woman-cashmere-wool-autumn-winter-natural-light.jpg" alt="Cashmere layering" fill sizes="(min-width: 1024px) 25vw, 50vw" quality={90} className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04] transform-gpu" />
                </div>
              </motion.div>
              <motion.div className="space-y-4 pt-8" style={{ y: colB }}>
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <Image src="/wool-coat-detail-autumn-colors.jpg" alt="Coat detail" fill sizes="(min-width: 1024px) 25vw, 50vw" quality={90} className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04] transform-gpu" />
                </div>
                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                  <Image src="/elegant-woman-autumn-fashion-neutral-beige-tones.jpg" alt="Neutral autumn tailoring" fill sizes="(min-width: 1024px) 25vw, 50vw" quality={90} className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04] transform-gpu" />
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
