"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter } from 'lucide-react'

import { Reveal } from "@/components/motion-primitives"
import { scrollToSection } from "@/lib/scroll"

export function Footer() {
  // Smooth-scroll for real in-page anchors; leave bare "#" placeholders alone.
  const onAnchor = (href: string) => (e: React.MouseEvent) => {
    if (href.length > 1 && href.startsWith("#")) {
      e.preventDefault()
      scrollToSection(href)
    }
  }

  return (
    <footer id="about" className="border-t border-border py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Reveal className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="font-script text-3xl font-normal mb-2 text-foreground">Velvra</h3>
            <p className="text-xs font-normal tracking-wider mb-3">Keep it classy.</p>
            <p className="text-sm text-muted-foreground text-pretty">Timeless elegance for the modern woman</p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#new" onClick={onAnchor("#new")} className="hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#collections" onClick={onAnchor("#collections")} className="hover:text-foreground transition-colors">
                  Outerwear
                </Link>
              </li>
              <li>
                <Link href="#collections" onClick={onAnchor("#collections")} className="hover:text-foreground transition-colors">
                  Knitwear
                </Link>
              </li>
              <li>
                <Link href="#collections" onClick={onAnchor("#collections")} className="hover:text-foreground transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="#collections" onClick={onAnchor("#collections")} className="hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex text-muted-foreground hover:text-foreground transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex text-muted-foreground hover:text-foreground transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="inline-flex text-muted-foreground hover:text-foreground transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </Reveal>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Velvra. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
