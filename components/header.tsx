"use client";

import { ShoppingBag, Search, Menu, X, Heart, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

// "Shop" maps to the hero (#hero) and is the active department while the hero is
// in view; the rest are the in-page sections.
const NAV_LINKS = [
  { href: "#hero", label: "Shop" },
  { href: "#collections", label: "Collections" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "#about", label: "About" },
];

// Shared icon-control styling: a slightly-whiter-than-cream fill so it tunes with
// the creamy hero panel, plus accessible hover/active/focus feedback.
const ICON_BG = "bg-[oklch(0.985_0.008_80)]";
const iconControl = cn(
  "relative flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground/90",
  ICON_BG,
  "transition-[color,border-color,transform] duration-150 ease-out hover:text-secondary hover:border-secondary",
  "active:scale-90 cursor-pointer",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Default to the hero so "Shop" reads as selected on first paint.
  const [activeSection, setActiveSection] = useState<string>("#hero");
  // Polite, screen-reader-only announcement for every icon interaction.
  const [announcement, setAnnouncement] = useState<string>("");
  const { count, pulse, openCart, openSearch } = useCart();

  const announce = (msg: string) => {
    // Reset first so identical consecutive messages are still announced.
    setAnnouncement("");
    requestAnimationFrame(() => setAnnouncement(msg));
  };

  // Scroll-spy: highlight the nav link whose section is currently in view, the
  // way a real storefront marks the active department. Each section is tracked
  // by its id; the one closest to the top of the viewport wins.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(`#${visible[0].target.id}`);
      },
      // Bias the active zone to the upper-middle band beneath the sticky header.
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Intercept in-page anchors so navigation smooth-scrolls instead of jumping,
  // and reflect the destination in the URL hash so links are shareable/bookmarkable.
  const handleNav = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
      setActiveSection(href);
      if (typeof history !== "undefined") history.replaceState(null, "", href);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/85 border-b border-border transition-colors duration-300">
      {/* Screen-reader live region announcing icon interactions */}
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-transform duration-200 active:scale-90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Link href="/" className="group" aria-label="Velvra — home">
            {/* Desktop logo — brush-script wordmark, a thin rule under the
                wordmark, a spaced small-caps tagline, and a delicate brand rule
                beneath the whole container to reinforce the masthead identity. */}
            <div className="hidden md:inline-block leading-none pb-1">
              <div className="font-script text-[2.1rem] lg:text-[2.5rem] leading-[1.1] text-foreground">
                Velvra
              </div>
              <div className="mt-1 h-px w-full bg-foreground/40" />
              <div className="mt-1.5 text-[0.55rem] font-sans font-normal tracking-[0.42em] text-muted-foreground uppercase">
                kind of clothing
              </div>
              {/* thin brand rule under the logo container */}
              <div className="mt-1.5 h-px w-full bg-gradient-to-r from-foreground/35 via-foreground/15 to-transparent" />
            </div>

            {/* Mobile monogram - script V */}
            <div className="md:hidden">
              <div className="font-script text-[2.4rem] leading-[1.1] text-foreground">
                V
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNav(link.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    // Heading font family (Playfair) so nav typography is unified
                    // with the section headings; darker + larger for legibility.
                    "relative font-display text-[1.05rem] lg:text-[1.18rem] font-medium uppercase tracking-[0.1em] transition-colors duration-300",
                    // Underline scales on the X axis (transform) instead of
                    // animating width, so the hover never triggers layout/reflow.
                    "after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:bg-secondary after:origin-left after:transition-transform after:duration-300 after:ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                    active
                      ? "text-foreground after:scale-x-100"
                      : "text-foreground/75 hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Search bar (desktop) — opens the search overlay */}
            <button
              onClick={() => {
                openSearch();
                announce("Search opened");
              }}
              aria-label="Open search"
              className={cn(
                "hidden lg:flex items-center gap-2 w-48 xl:w-56 rounded-full border border-border px-4 py-2 text-muted-foreground",
                ICON_BG,
                "transition-[border-color,transform] duration-150 hover:border-secondary active:scale-[0.98] cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm font-sans">Search</span>
            </button>

            {/* Compact search chip (tablet) */}
            <button
              onClick={() => {
                openSearch();
                announce("Search opened");
              }}
              aria-label="Open search"
              className={cn(iconControl, "hidden md:flex lg:hidden")}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist — routes to the wishlist page */}
            <Link
              href="/wishlist"
              onClick={() => announce("Opening your wishlist")}
              aria-label="Wishlist"
              className={cn(iconControl, "hidden sm:flex")}
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Account — routes to the authentication page */}
            <Link
              href="/login"
              onClick={() => announce("Opening sign in")}
              aria-label="Account and sign in"
              className={cn(iconControl, "hidden sm:flex")}
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Cart — opens the cart drawer */}
            <button
              onClick={() => {
                openCart();
                announce(
                  count > 0
                    ? `Cart opened, ${count} item${count === 1 ? "" : "s"}`
                    : "Cart opened, empty"
                );
              }}
              aria-label={`Shopping bag, ${count} item${count === 1 ? "" : "s"}`}
              className={iconControl}
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    // Re-keying on `pulse` remounts the badge on every add, so it
                    // "pops" each time an item lands in the bag.
                    key={pulse}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 15 }}
                    className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[0.625rem] font-medium leading-none text-secondary-foreground tabular-nums"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col gap-4 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={activeSection === link.href ? "page" : undefined}
                    className={cn(
                      "font-display text-lg font-medium uppercase tracking-[0.1em] transition-colors duration-200",
                      activeSection === link.href
                        ? "text-foreground"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                    onClick={handleNav(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-1 flex items-center gap-4 border-t border-border pt-4">
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <Heart className="h-5 w-5" /> Wishlist
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <User className="h-5 w-5" /> Account
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="justify-start px-0 text-secondary hover:text-foreground transition-colors duration-200"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
