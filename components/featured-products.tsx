"use client";

import Image from "next/image";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { SectionBackdrop } from "@/components/editorial-backdrop";
import { useCart } from "@/lib/cart-context";
import { products, formatPrice, type Product } from "@/lib/products";

export function FeaturedProducts() {
  const { addItem, openSearch } = useCart();

  const handleAdd = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to your bag`, {
      description: `${product.color} · ${formatPrice(product.price)}`,
    });
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

        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <RevealItem key={product.id} whileHover={{ y: -8 }} className="h-full">
              <Card className="group flex h-full flex-col gap-0 overflow-hidden border-0 py-0 shadow-none bg-background transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    quality={90}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer transform-gpu"
                    onClick={() => handleAdd(product)}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-serif text-lg md:text-xl font-light mb-1 transition-colors duration-200 group-hover:text-secondary">
                    {product.name}
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
            </RevealItem>
          ))}
        </RevealGroup>

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
