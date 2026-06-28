import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { getProduct, products } from "@/lib/products"

// Pre-render every product page at build time.
export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(Number(id))
  if (!product) return { title: "Product not found — VELVRA" }
  return {
    title: `${product.name} — VELVRA`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(Number(id))
  if (!product) notFound()

  return (
    <div className="min-h-screen">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  )
}
