"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react"
import type { Product } from "@/lib/products"

/**
 * A line in the bag. Identified by `lineId` (product id + size) rather than the
 * product id alone, so the same product in two sizes lives on two separate rows.
 * `size` is optional — items added without a size (e.g. from a card) collapse to
 * a single sizeless line.
 */
export type CartItem = Product & { quantity: number; size?: string; lineId: string }

/** Stable line key: a product can appear once per chosen size. */
export const lineIdFor = (id: number, size?: string) => `${id}::${size ?? ""}`

type CartState = { items: CartItem[] }

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; product: Product; size?: string; quantity?: number }
  | { type: "remove"; lineId: string }
  | { type: "setQty"; lineId: string; quantity: number }
  | { type: "clear" }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items }
    case "add": {
      const qty = Math.max(1, action.quantity ?? 1)
      const lineId = lineIdFor(action.product.id, action.size)
      const existing = state.items.find((i) => i.lineId === lineId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.lineId === lineId ? { ...i, quantity: i.quantity + qty } : i,
          ),
        }
      }
      return {
        items: [...state.items, { ...action.product, quantity: qty, size: action.size, lineId }],
      }
    }
    case "remove":
      return { items: state.items.filter((i) => i.lineId !== action.lineId) }
    case "setQty": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.lineId !== action.lineId) }
      }
      return {
        items: state.items.map((i) =>
          i.lineId === action.lineId ? { ...i, quantity: action.quantity } : i,
        ),
      }
    }
    case "clear":
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  /** Increments every time an item is added — drives the badge "pop" animation. */
  pulse: number
  isOpen: boolean
  isSearchOpen: boolean
  addItem: (product: Product, opts?: { size?: string; quantity?: number }) => void
  removeItem: (lineId: string) => void
  setQuantity: (lineId: string, quantity: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
  setOpen: (open: boolean) => void
  openSearch: () => void
  closeSearch: () => void
  setSearchOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "velvra-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [pulse, setPulse] = useState(0)
  const hydrated = useRef(false)

  // Load persisted cart once on mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) {
          // Backfill lineId for carts persisted before sized line items existed.
          const items = parsed.map((i) => ({
            ...i,
            lineId: i.lineId ?? lineIdFor(i.id, i.size),
          }))
          dispatch({ type: "hydrate", items })
        }
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

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return {
      items: state.items,
      count,
      subtotal,
      pulse,
      isOpen,
      isSearchOpen,
      addItem: (product, opts) => {
        dispatch({ type: "add", product, size: opts?.size, quantity: opts?.quantity })
        setPulse((p) => p + 1)
      },
      removeItem: (lineId) => dispatch({ type: "remove", lineId }),
      setQuantity: (lineId, quantity) => dispatch({ type: "setQty", lineId, quantity }),
      clear: () => dispatch({ type: "clear" }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setOpen: setIsOpen,
      openSearch: () => setIsSearchOpen(true),
      closeSearch: () => setIsSearchOpen(false),
      setSearchOpen: setIsSearchOpen,
    }
  }, [state.items, isOpen, isSearchOpen, pulse])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
