"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react"
import type { Product } from "@/lib/products"

type WishlistState = { items: Product[] }

type WishlistAction =
  | { type: "hydrate"; items: Product[] }
  | { type: "toggle"; product: Product }
  | { type: "remove"; id: number }
  | { type: "clear" }

function reducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items }
    case "toggle": {
      const exists = state.items.some((i) => i.id === action.product.id)
      if (exists) {
        return { items: state.items.filter((i) => i.id !== action.product.id) }
      }
      return { items: [...state.items, action.product] }
    }
    case "remove":
      return { items: state.items.filter((i) => i.id !== action.id) }
    case "clear":
      return { items: [] }
    default:
      return state
  }
}

type WishlistContextValue = {
  items: Product[]
  count: number
  /** True when the given product id is saved. */
  has: (id: number) => boolean
  /** Save the product if absent, remove it if present. */
  toggle: (product: Product) => void
  removeItem: (id: number) => void
  clear: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = "velvra-wishlist"

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const hydrated = useRef(false)

  // Load persisted wishlist once on mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Product[]
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed })
      }
    } catch {
      // ignore malformed storage
    }
    hydrated.current = true
  }, [])

  // Persist on every change (after initial hydration).
  useEffect(() => {
    if (!hydrated.current) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // storage may be unavailable (private mode) — fail silently
    }
  }, [state.items])

  const value = useMemo<WishlistContextValue>(() => {
    const ids = new Set(state.items.map((i) => i.id))
    return {
      items: state.items,
      count: state.items.length,
      has: (id) => ids.has(id),
      toggle: (product) => dispatch({ type: "toggle", product }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    }
  }, [state.items])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider")
  return ctx
}
