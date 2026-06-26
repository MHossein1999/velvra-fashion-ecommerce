import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BrandStrip } from "@/components/brand-strip"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { Lookbook } from "@/components/lookbook"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BrandStrip />
        <CategoryGrid />
        <FeaturedProducts />
        <Lookbook />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
