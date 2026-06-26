"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LATTICE } from "@/components/hero-backdrop";

export default function WishlistPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(55%_55%_at_50%_45%,black,transparent_75%)]"
        style={{ backgroundImage: LATTICE, backgroundSize: "56px 56px" }}
      />

      <div className="relative">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-sans text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </Link>

        <div className="font-script text-5xl leading-none text-foreground">Velvra</div>
        <div className="mx-auto mt-2 mb-10 h-px w-24 bg-foreground/30" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
          <Heart className="h-7 w-7 text-secondary" strokeWidth={1.5} />
        </div>

        <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-foreground">
          Your wishlist
        </h1>
        <p className="mx-auto mt-3 max-w-sm font-serif text-lg text-muted-foreground">
          You haven’t saved any pieces yet. Tap the heart on a product to keep it
          here for later.
        </p>

        <Button
          asChild
          className="mt-8 rounded-md bg-secondary px-9 py-6 font-serif text-sm font-medium uppercase tracking-[0.18em] text-secondary-foreground transition-colors hover:bg-[oklch(0.47_0.05_65)]"
        >
          <Link href="/#collections">Explore the collection</Link>
        </Button>
      </div>
    </main>
  );
}
