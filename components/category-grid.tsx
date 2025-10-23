import Link from "next/link"
import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Outerwear",
    image: "/elegant-wool-coat-on-hanger-autumn-colors.jpg",
    href: "#outerwear",
  },
  {
    name: "Knitwear",
    image: "/cashmere-sweater-folded-neutral-tones.jpg",
    href: "#knitwear",
  },
  {
    name: "Dresses",
    image: "/elegant-winter-dress-on-mannequin.jpg",
    href: "#dresses",
  },
  {
    name: "Accessories",
    image: "/leather-handbag-and-scarf-autumn-styling.jpg",
    href: "#accessories",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl font-light text-center mb-12 md:mb-16">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <Card
                className={`group overflow-hidden border-0 shadow-none bg-transparent opacity-0 animate-fade-in-up animation-delay-${index * 200}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                </div>
                <div className="py-4">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-center text-foreground group-hover:text-secondary transition-all duration-300 ease-out">
                    {category.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
