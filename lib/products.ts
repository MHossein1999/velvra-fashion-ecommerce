// Shared product catalog. Frontend-only demo data — kept in one place so the
// featured grid, search overlay, and cart all reference the same source of truth.

export type Product = {
  id: number
  name: string
  price: number
  image: string
  color: string
  /**
   * Gallery shots for the detail page. Optional and additive — callers that only
   * read `image` (cards, search, cart) are unaffected. Use `galleryFor()` to get
   * a guaranteed-non-empty list that falls back to `[image]`.
   */
  images?: string[]
  /** Selectable sizes on the detail page; falls back to `DEFAULT_SIZES`. */
  sizes?: string[]
  /** Editorial copy for the detail page; falls back to a generic line. */
  description?: string
  /** Short bulleted specs shown under the description. */
  details?: string[]
}

export const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL"]

export const products: Product[] = [
  {
    id: 1,
    name: "Cashmere Turtleneck",
    price: 245,
    image: "/beige-cashmere-turtleneck-sweater-product-photo.jpg",
    color: "Camel",
    images: [
      "/beige-cashmere-turtleneck-sweater-product-photo.jpg",
      "/cashmere-sweater-folded-neutral-tones.jpg",
      "/woman-in-beige-sweater-autumn-styling.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Spun from grade-A Mongolian cashmere, this turtleneck drapes with quiet weight and softens with every wear. A wardrobe anchor for the cooler months.",
    details: ["100% Mongolian cashmere", "Relaxed fit", "Ribbed turtleneck & cuffs", "Dry clean only"],
  },
  {
    id: 2,
    name: "Wool Blend Coat",
    price: 485,
    image: "/elegant-brown-wool-coat-product-photography.jpg",
    color: "Camel",
    images: [
      "/elegant-brown-wool-coat-product-photography.jpg",
      "/elegant-wool-coat-on-hanger-autumn-colors.jpg",
      "/wool-coat-detail-autumn-colors.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A tailored double-faced wool-blend coat with a clean collar and a longline silhouette. Structured enough to layer, fluid enough to move.",
    details: ["70% wool, 30% cashmere blend", "Longline tailored fit", "Concealed front placket", "Fully lined"],
  },
  {
    id: 3,
    name: "Silk Midi Dress",
    price: 325,
    image: "/cream-silk-midi-dress-elegant-product-shot.jpg",
    color: "Ivory",
    images: [
      "/cream-silk-midi-dress-elegant-product-shot.jpg",
      "/elegant-winter-dress-on-mannequin.jpg",
      "/woman-in-elegant-winter-dress.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Cut on the bias from washed silk, this midi dress catches the light and skims the figure. An effortless piece that carries from day to evening.",
    details: ["100% washed silk", "Bias-cut midi length", "Concealed side zip", "Dry clean only"],
  },
  {
    id: 4,
    name: "Leather Ankle Boots",
    price: 395,
    image: "/black-leather-ankle-boots-product-photography.jpg",
    color: "Black",
    images: [
      "/black-leather-ankle-boots-product-photography.jpg",
      "/fashion-woman-studio-minimal-backdrop-autumn-outfit.jpg",
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    description:
      "Hand-finished calf leather ankle boots on a stacked block heel. A considered, walkable heel that reads polished with everything.",
    details: ["Full-grain calf leather", "55mm stacked block heel", "Leather lining & sole", "Side zip closure"],
  },
  {
    id: 5,
    name: "Leather Shoulder Bag",
    price: 365,
    image: "/autumn-accessories-leather-bag.jpg",
    color: "Cognac",
    images: [
      "/autumn-accessories-leather-bag.jpg",
      "/leather-handbag-and-scarf-autumn-styling.jpg",
    ],
    sizes: ["One Size"],
    description:
      "A softly structured shoulder bag in burnished cognac leather, sized for the everyday essentials with an adjustable strap.",
    details: ["Vegetable-tanned leather", "Adjustable shoulder strap", "Suede-lined interior", "Magnetic closure"],
  },
  {
    id: 6,
    name: "Tailored Trousers",
    price: 225,
    image: "/beige-tailored-trousers-product-photography.jpg",
    color: "Sand",
    images: [
      "/beige-tailored-trousers-product-photography.jpg",
      "/fashion-woman-studio-minimal-backdrop-autumn-outfit.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "High-waisted trousers with a pressed crease and a straight leg, cut from a fluid wool-touch fabric that holds its line all day.",
    details: ["Wool-touch tailoring fabric", "High-rise straight leg", "Side & back welt pockets", "Hook-and-bar closure"],
  },
]

/** Look up a product by its numeric id (the detail route param). */
export const getProduct = (id: number) => products.find((p) => p.id === id)

/** Guaranteed-non-empty gallery: a product's `images`, or `[image]` as fallback. */
export const galleryFor = (product: Product) =>
  product.images && product.images.length > 0 ? product.images : [product.image]

/** Selectable sizes for a product, falling back to the default apparel run. */
export const sizesFor = (product: Product) =>
  product.sizes && product.sizes.length > 0 ? product.sizes : DEFAULT_SIZES

export const formatPrice = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
