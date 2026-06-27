"use client"

import type { ReactNode } from "react"

import { CartDrawer } from "@/components/cart-drawer"
import { SearchOverlay } from "@/components/search-overlay"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider, useCart } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"

/**
 * Global overlays that live above every page and read their open state from the
 * cart store. Kept in a child component so they can call `useCart()` from inside
 * the provider.
 */
function GlobalOverlays() {
  const { isSearchOpen, closeSearch } = useCart()
  return (
    <>
      <CartDrawer />
      <SearchOverlay open={isSearchOpen} onClose={closeSearch} />
    </>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <GlobalOverlays />
        <Toaster position="bottom-right" />
      </WishlistProvider>
    </CartProvider>
  )
}
