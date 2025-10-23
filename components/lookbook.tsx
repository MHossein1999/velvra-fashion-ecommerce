export function Lookbook() {
  return (
    <section id="new" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-6">Autumn Essentials</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                Embrace the changing season with our thoughtfully curated collection of timeless pieces. From luxurious
                knits to structured outerwear, each item is designed to elevate your everyday wardrobe with effortless
                sophistication.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
                Crafted from premium materials and finished with meticulous attention to detail, our Autumn/Winter
                collection celebrates the beauty of understated elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#collection"
                  className="inline-flex items-center justify-center text-sm font-medium hover:text-muted-foreground transition-colors"
                >
                  Explore the Collection →
                </a>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-muted overflow-hidden">
                  <img src="/woman-in-beige-sweater-autumn-styling.jpg" alt="Autumn styling" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-muted overflow-hidden">
                  <img src="/autumn-accessories-leather-bag.jpg" alt="Accessories" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img src="/wool-coat-detail-autumn-colors.jpg" alt="Coat detail" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] bg-muted overflow-hidden">
                  <img src="/woman-in-elegant-winter-dress.jpg" alt="Winter dress" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
