import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"

import { LATTICE } from "@/components/hero-backdrop"

/**
 * Shared layout for the informational/legal pages (FAQ, Shipping, Size Guide,
 * Contact, Privacy, Terms). Echoes the wishlist/login aesthetic — cream ground,
 * faint couture lattice, brand masthead — so the secondary pages stay on-brand
 * with the storefront. Server component; no interactivity.
 */
export function InfoPage({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent_75%)]"
        style={{ backgroundImage: LATTICE, backgroundSize: "56px 56px" }}
      />

      <article className="relative mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 rounded-sm text-sm font-sans text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </Link>

        <header className="text-center">
          <div className="font-script text-4xl leading-none text-foreground">Velvra</div>
          <div className="mx-auto mt-2 h-px w-20 bg-foreground/30" />
          <h1 className="mt-8 font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mx-auto mt-4 max-w-xl font-serif text-lg text-muted-foreground text-pretty">
              {intro}
            </p>
          )}
        </header>

        <div className="mt-12 space-y-9">{children}</div>
      </article>
    </main>
  )
}

/** A titled prose block used inside an `InfoPage`. */
export function InfoSection({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="font-serif text-xl font-normal text-foreground">{heading}</h2>
      <div className="mt-2 space-y-3 font-sans text-[0.95rem] leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  )
}
