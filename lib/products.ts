// Shared product catalog. Frontend-only demo data — kept in one place so the
// featured grid, search overlay, and cart all reference the same source of truth.

export type Product = {
  id: number
  name: string
  price: number
  image: string
  color: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Cashmere Turtleneck",
    price: 245,
    image: "/beige-cashmere-turtleneck-sweater-product-photo.jpg",
    color: "Camel",
  },
  {
    id: 2,
    name: "Wool Blend Coat",
    price: 485,
    image: "/elegant-brown-wool-coat-product-photography.jpg",
    color: "Camel",
  },
  {
    id: 3,
    name: "Silk Midi Dress",
    price: 325,
    image: "/cream-silk-midi-dress-elegant-product-shot.jpg",
    color: "Ivory",
  },
  {
    id: 4,
    name: "Leather Ankle Boots",
    price: 395,
    image: "/black-leather-ankle-boots-product-photography.jpg",
    color: "Black",
  },
  {
    id: 5,
    name: "Leather Shoulder Bag",
    price: 365,
    image: "/autumn-accessories-leather-bag.jpg",
    color: "Cognac",
  },
  {
    id: 6,
    name: "Tailored Trousers",
    price: 225,
    image: "/beige-tailored-trousers-product-photography.jpg",
    color: "Sand",
  },
]

export const formatPrice = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
