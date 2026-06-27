"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LATTICE } from "@/components/hero-backdrop";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice } from "@/lib/products";

export default function WishlistPage() {
  const { items, removeItem, clear } = useWishlist();
  const { addItem, openCart } = useCart();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(55%_55%_at_50%_30%,black,transparent_75%)]"
        style={{ backgroundImage: LATTICE, backgroundSize: "56px 56px" }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 rounded-sm text-sm font-sans text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </Link>

        {items.length === 0 ? (
          <div className="flex flex-col items-center text-center">
            <div className="font-script text-5xl leading-none text-foreground">Velvra</div>
            <div className="mx-auto mt-2 mb-10 h-px w-24 bg-foreground/30" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
              <Heart className="h-7 w-7 text-secondary" strokeWidth={1.5} />
            </div>

            <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-foreground">
              Your wishlist
            </h1>
            <p className="mx-auto mt-3 max-w-sm font-serif text-lg text-muted-foreground">
              You haven’t saved any pieces yet. Tap the heart on a product to keep it
              here for later.
            </p>

            <Button
              asChild
              className="mt-8 rounded-md bg-secondary px-9 py-6 font-serif text-sm font-medium uppercase tracking-[0.18em] text-secondary-foreground transition-colors hover:bg-[oklch(0.47_0.05_65)]"
            >
              <Link href="/#new">Explore the collection</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-medium tracking-tight text-foreground">
                  Your wishlist
                </h1>
                <p className="mt-2 font-serif text-lg text-muted-foreground">
                  {items.length} saved {items.length === 1 ? "piece" : "pieces"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => clear()}
                className="cursor-pointer text-sm font-sans text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Clear all
              </button>
            </div>

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence initial={false}>
                {items.map((product) => (
                  <motion.li
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 38 }}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        quality={90}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(product.id);
                          toast.success(`${product.name} removed from wishlist`);
                        }}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground/80 backdrop-blur-sm transition-[color,transform] duration-150 ease-out hover:text-destructive active:scale-90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-lg font-light">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.color}</p>
                      <div className="mt-auto pt-3">
                        <span className="mb-3 block text-base font-medium">
                          {formatPrice(product.price)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            addItem(product);
                            toast.success(`${product.name} added to your bag`);
                            openCart();
                          }}
                          className="w-full cursor-pointer border-secondary bg-transparent text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
                        >
                          Add to Bag
                        </Button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
