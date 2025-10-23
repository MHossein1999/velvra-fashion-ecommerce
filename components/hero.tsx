"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Limit parallax to 15px maximum shift
      setScrollY(Math.min(scrollPosition * 0.15, 15));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">
        {/* Left side: Text content */}
        <div className="opacity-0 animate-fade-in-up text-left order-2 lg:order-1">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] mb-6 md:mb-8 text-foreground leading-[1.1] tracking-tight">
            Elegance
            <br />
            in Every Layer
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-foreground/80 mb-8 md:mb-12 max-w-2xl lg:max-w-none leading-relaxed font-serif">
            Discover our curated selection of cozy sweaters, elegant coats, and
            timeless accessories perfect for the cooler seasons. Embrace warmth
            without compromising style.
          </p>
          <div className="opacity-0 animate-scale-up animation-delay-300">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 md:px-14 lg:px-16 py-5 md:py-6 lg:py-7 text-base md:text-lg lg:text-xl font-serif font-normal tracking-wide group transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              Shop Collection
              <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Right side: Fashion image with animations */}
        <div
          className="relative h-[60vh] lg:h-[90vh] opacity-0 animate-fade-in-up animation-delay-200 order-1 lg:order-2 group"
          style={{
            transform: `translateY(${scrollY}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="relative w-full h-full transition-transform duration-700 ease-out lg:hover:scale-[1.015] will-change-transform">
            <Image
              src="/fashion-woman-studio-minimal-backdrop-autumn-outfit.jpg"
              alt="Woman in elegant autumn winter fashion"
              fill
              className="object-cover object-[center_20%] md:object-[center_25%] lg:object-center rounded-2xl lg:rounded-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
