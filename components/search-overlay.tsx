"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { useCart } from "@/lib/cart-context"
import { formatPrice, products } from "@/lib/products"

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState("")
  const { addItem, openCart } = useCart()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.color.toLowerCase().includes(q),
    )
  }, [query])

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="container mx-auto flex h-full flex-col px-4 py-6">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm tracking-[0.25em] text-muted-foreground uppercase">
                Search
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mx-auto mt-10 flex w-full max-w-2xl items-center gap-3 border-b border-border pb-4"
            >
              <Search className="h-6 w-6 text-muted-foreground" strokeWidth={1.25} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection…"
                className="w-full bg-transparent font-serif text-2xl md:text-3xl font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
            </motion.div>

            <div className="mx-auto mt-8 w-full max-w-2xl flex-1 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-center text-muted-foreground font-serif text-lg">
                  No pieces match “{query}”.
                </p>
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {results.map((p) => (
                    <li key={p.id} className="flex items-center gap-4 py-4">
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={p.image || "/placeholder.svg"}
                          alt={p.name}
                          fill
                          sizes="56px"
                          quality={70}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-light">{p.name}</h3>
                        <p className="text-xs text-muted-foreground">{p.color}</p>
                      </div>
                      <span className="text-sm tabular-nums">{formatPrice(p.price)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          addItem(p)
                          toast.success(`${p.name} added to your bag`)
                          onClose()
                          openCart()
                        }}
                        className="rounded-full border border-secondary px-4 py-1.5 text-xs text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
                      >
                        Add to Bag
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
