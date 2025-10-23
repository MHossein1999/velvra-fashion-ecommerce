import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Stay in Style
          </h2>
          <p className="text-secondary-foreground/90 mb-8 text-pretty">
            Subscribe to receive exclusive updates, styling tips, and early
            access to new collections
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-secondary-foreground/10 border-secondary-foreground/30 text-secondary-foreground placeholder:text-secondary-foreground/70 focus-visible:ring-secondary-foreground"
            />
            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap cursor-pointer"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
