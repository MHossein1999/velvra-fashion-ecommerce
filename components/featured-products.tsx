"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/motion-primitives";
import { SectionBackdrop } from "@/components/editorial-backdrop";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";
import { products, formatPrice, type Product } from "@/lib/products";

export function FeaturedProducts() {
  const { addItem, openSearch } = useCart();
  const { has, toggle } = useWishlist();

  const handleAdd = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to your bag`, {
      description: `${product.color} · ${formatPrice(product.price)}`,
    });
  };

  const handleWishlist = (product: Product) => {
    const saved = has(product.id);
    toggle(product);
    toast.success(
      saved ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`,
    );
  };

  return (
    <section id="new" className="relative overflow-hidden py-16 md:py-24 bg-muted">
      <SectionBackdrop tone="split" />
      <div className="container relative z-10 mx-auto px-4">
        <Reveal className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Carefully selected pieces that embody the essence of autumn elegance
          </p>
        </Reveal>

        <Reveal>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            {/* Soft edge fades so cards "emerge" from the margins rather than
                getting hard-clipped — the editorial peeking-carousel look. */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-muted to-transparent md:w-12" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-muted to-transparent md:w-12" />

            <CarouselContent className="-ml-4 md:-ml-6">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 pl-4 sm:basis-1/3 md:pl-6 lg:basis-1/4"
                >
                  <Card className="group flex h-full flex-col gap-0 overflow-hidden border-0 py-0 shadow-none bg-background transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-lg">
                      <Link
                        href={`/product/${product.id}`}
                        aria-label={`View ${product.name}`}
                        className="absolute inset-0 z-[1] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                          quality={90}
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleWishlist(product)}
                        aria-label={
                          has(product.id)
                            ? `Remove ${product.name} from wishlist`
                            : `Save ${product.name} to wishlist`
                        }
                        aria-pressed={has(product.id)}
                        className="absolute right-3 top-3 z-[2] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground/80 backdrop-blur-sm transition-[color,transform] duration-150 ease-out hover:text-secondary active:scale-90"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4 transition-colors",
                            has(product.id) && "fill-secondary text-secondary",
                          )}
                        />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-lg md:text-xl font-light mb-1 transition-colors duration-200 group-hover:text-secondary">
                        <Link
                          href={`/product/${product.id}`}
                          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:text-secondary"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.color}
                      </p>
                      <div className="mt-auto pt-3">
                        <span className="block text-base font-medium mb-3">
                          {formatPrice(product.price)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAdd(product)}
                          className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent transition-[color,background-color,box-shadow] duration-300 hover:shadow-md cursor-pointer"
                        >
                          Add to Bag
                        </Button>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Refined circular arrows, hidden on touch (swipe/drag instead). */}
            <CarouselPrevious className="z-20 hidden size-11 border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-secondary hover:bg-secondary hover:text-secondary-foreground cursor-pointer left-0 sm:flex md:-left-5" />
            <CarouselNext className="z-20 hidden size-11 border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-secondary hover:bg-secondary hover:text-secondary-foreground cursor-pointer right-0 sm:flex md:-right-5" />
          </Carousel>
        </Reveal>

        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={openSearch}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-[transform,background-color,box-shadow] duration-300 ease-out hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
