"use client";

import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-transform duration-200 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Link href="/" className="group transition-colors duration-200">
            {/* Desktop logo - full VELVRA */}
            <div className="hidden md:block">
              <div className="font-serif text-2xl lg:text-3xl font-light tracking-[0.3em] text-foreground group-hover:text-accent transition-colors duration-300">
                VELVRA
              </div>
              <div className="text-[0.65rem] font-sans font-light tracking-[0.25em] text-muted-foreground text-center mt-0.5 uppercase">
                Timeless Layers
              </div>
            </div>

            {/* Mobile monogram - V only */}
            <div className="md:hidden">
              <div className="font-serif text-3xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                V
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#new"
              className="text-base font-serif text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              New Arrivals
            </Link>
            <Link
              href="#collections"
              className="text-base font-serif text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              Collections
            </Link>
            <Link
              href="#lookbook"
              className="text-base font-serif text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              Lookbook
            </Link>
            <Link
              href="#about"
              className="text-base font-serif text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping bag</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href="#new"
                className="text-sm font-serif text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="#collections"
                className="text-sm font-serif text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="#lookbook"
                className="text-sm font-serif text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Lookbook
              </Link>
              <Link
                href="#about"
                className="text-sm font-serif text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Button
                variant="ghost"
                className="justify-start px-0 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
