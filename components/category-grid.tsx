"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives"
import { SectionBackdrop } from "@/components/editorial-backdrop"
import { scrollToSection } from "@/lib/scroll"

const categories = [
  {
    name: "Outerwear",
    image: "/elegant-wool-coat-on-hanger-autumn-colors.jpg",
    href: "#new",
  },
  {
    name: "Knitwear",
    image: "/cashmere-sweater-folded-neutral-tones.jpg",
    href: "#new",
  },
  {
    name: "Dresses",
    image: "/cream-silk-midi-dress-elegant-product-shot.jpg",
    href: "#new",
  },
  {
    name: "Accessories",
    image: "/leather-handbag-and-scarf-autumn-styling.jpg",
    href: "#new",
  },
]

export function CategoryGrid() {
  return (
    <section id="collections" className="relative overflow-hidden py-16 md:py-24">
      <SectionBackdrop tone="top" />
      <div className="container relative z-10 mx-auto px-4">
        <Reveal as="h2" className="font-serif text-3xl md:text-5xl font-light text-center mb-12 md:mb-16">
          Shop by Category
        </Reveal>
        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <RevealItem key={category.name} whileHover={{ y: -6 }}>
              <button
                type="button"
                onClick={() => scrollToSection(category.href)}
                className="block w-full text-left cursor-pointer"
              >
                <Card className="group gap-0 overflow-hidden border-0 py-0 shadow-none bg-transparent">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      quality={90}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                    />
                  </div>
                  <div className="px-4 pt-3">
                    <h3 className="font-serif text-lg md:text-xl font-normal text-center text-foreground group-hover:text-secondary transition-colors duration-300 ease-out">
                      {category.name}
                    </h3>
                  </div>
                </Card>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
