"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, Check, Heart, Minus, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { cn } from "@/lib/utils"
import { formatPrice, galleryFor, sizesFor, type Product } from "@/lib/products"

export function ProductDetail({ product }: { product: Product }) {
  const reduce = useReducedMotion()
  const gallery = galleryFor(product)
  const sizes = sizesFor(product)
  // A single-size product (e.g. a bag) needs no choice — preselect it so the
  // button is immediately actionable.
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? sizes[0] : null)
  const [quantity, setQuantity] = useState(1)
  const [active, setActive] = useState(0)

  const { addItem, openCart } = useCart()
  const { has, toggle } = useWishlist()
  const saved = has(product.id)

  const radioRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleAdd = () => {
    if (!size) return
    addItem(product, { size, quantity })
    toast.success(`${product.name} added to your bag`, {
      description: `${product.color} · Size ${size} · ${formatPrice(product.price)}`,
    })
    openCart()
  }

  const handleWishlist = () => {
    toggle(product)
    toast.success(saved ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`)
  }

  // Roving-focus arrow navigation for the size radiogroup.
  const onSizeKey = (e: React.KeyboardEvent, index: number) => {
    const last = sizes.length - 1
    let next = index
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = last
    else return
    e.preventDefault()
    setSize(sizes[next])
    radioRefs.current[next]?.focus()
  }

  const swapDuration = reduce ? 0 : 0.4

  return (
    <main className="relative min-h-screen bg-background px-4 pb-20 pt-8 md:pt-12">
      <div className="mx-auto w-full max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
          <Link
            href="/#new"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-sans text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to collection
          </Link>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery — thumbnail strip + crossfading main image */}
          <div className="flex flex-col gap-4 sm:flex-row-reverse sm:gap-5">
            <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-lg bg-muted">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: swapDuration, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={gallery[active] || "/placeholder.svg"}
                    alt={`${product.name} — view ${active + 1}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    quality={90}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                aria-pressed={saved}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground/80 backdrop-blur-sm transition-[color,transform] duration-150 ease-out hover:text-secondary active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Heart className={cn("h-4 w-4 transition-colors", saved && "fill-secondary text-secondary")} />
              </button>
            </div>

            {gallery.length > 1 && (
              <div
                className="flex shrink-0 gap-3 overflow-x-auto sm:flex-col sm:overflow-visible"
                role="group"
                aria-label="Product images"
              >
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show view ${i + 1}`}
                    aria-current={active === i}
                    className={cn(
                      "relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-md bg-muted transition-all duration-200 sm:w-20",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active === i
                        ? "ring-2 ring-secondary ring-offset-2 ring-offset-background"
                        : "opacity-70 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt=""
                      fill
                      sizes="80px"
                      quality={70}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {product.color}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-light leading-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-serif text-2xl tabular-nums">{formatPrice(product.price)}</p>

            {product.description && (
              <p className="mt-6 max-w-prose text-pretty leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {/* Size selector */}
            <div className="mt-8">
              <div className="mb-3 flex items-baseline justify-between">
                <span id="size-label" className="font-sans text-sm font-medium">
                  Size
                </span>
                <span aria-live="polite" className="text-sm text-muted-foreground">
                  {size ? `Selected: ${size}` : "Please select a size"}
                </span>
              </div>
              <div role="radiogroup" aria-labelledby="size-label" className="flex flex-wrap gap-2.5">
                {sizes.map((s, i) => {
                  const selected = size === s
                  return (
                    <button
                      key={s}
                      ref={(el) => {
                        radioRefs.current[i] = el
                      }}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      tabIndex={selected || (!size && i === 0) ? 0 : -1}
                      onClick={() => setSize(s)}
                      onKeyDown={(e) => onSizeKey(e, i)}
                      className={cn(
                        "min-w-12 cursor-pointer rounded-md border px-4 py-2.5 text-sm transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        selected
                          ? "border-secondary bg-secondary text-secondary-foreground"
                          : "border-border bg-transparent text-foreground hover:border-secondary hover:text-secondary",
                      )}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity + Add to Bag */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center justify-between gap-1 rounded-full border border-border px-1 sm:justify-start">
                <span className="sr-only" id="qty-label">
                  Quantity
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span aria-labelledby="qty-label" className="w-8 text-center text-sm tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                onClick={handleAdd}
                disabled={!size}
                className="flex-1 cursor-pointer bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {size ? "Add to Bag" : "Select a Size"}
              </Button>
            </div>

            {/* Details list */}
            {product.details && product.details.length > 0 && (
              <ul className="mt-10 flex flex-col gap-2.5 border-t border-border pt-8">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={1.5} />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
