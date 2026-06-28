import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="font-script text-5xl leading-none text-foreground">Velvra</div>
      <div className="mx-auto mt-2 mb-10 h-px w-24 bg-foreground/30" />
      <h1 className="font-display text-4xl font-medium tracking-tight text-foreground">
        Piece not found
      </h1>
      <p className="mx-auto mt-3 max-w-sm font-serif text-lg text-muted-foreground">
        We couldn’t find the item you’re looking for. It may have sold out or moved.
      </p>
      <Button
        asChild
        className="mt-8 rounded-md bg-secondary px-9 py-6 font-serif text-sm font-medium uppercase tracking-[0.18em] text-secondary-foreground transition-colors hover:bg-secondary/90"
      >
        <Link href="/#new">Explore the collection</Link>
      </Button>
    </main>
  )
}
