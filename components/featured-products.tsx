import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
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
    color: "Chocolate",
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
    name: "Merino Cardigan",
    price: 195,
    image: "/grey-merino-wool-cardigan-product-photo.jpg",
    color: "Grey",
  },
  {
    id: 6,
    name: "Tailored Trousers",
    price: 225,
    image: "/beige-tailored-trousers-product-photography.jpg",
    color: "Sand",
  },
];

export function FeaturedProducts() {
  return (
    <section id="collection" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Carefully selected pieces that embody the essence of autumn elegance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className={`group overflow-hidden border-0 shadow-none bg-background opacity-0 animate-scale-in animation-delay-${Math.min(
                index * 200,
                800
              )} transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 cursor-pointer"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-serif text-xl md:text-2xl font-light mb-1 transition-colors duration-200 group-hover:text-secondary">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.color}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">${product.price}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer"
                  >
                    Add to Bag
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
