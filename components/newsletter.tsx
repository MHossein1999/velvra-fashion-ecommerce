"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/motion-primitives";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    // Frontend-only demo: simulate a subscribe request.
    setTimeout(() => {
      toast.success("You're on the list", {
        description: "Watch your inbox for early access and styling notes.",
      });
      setEmail("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Stay in Style
          </h2>
          <p className="text-secondary-foreground/90 mb-8 text-pretty">
            Subscribe to receive exclusive updates, styling tips, and early
            access to new collections
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-secondary-foreground/10 border-secondary-foreground/30 text-secondary-foreground placeholder:text-secondary-foreground/70 focus-visible:ring-secondary-foreground"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap cursor-pointer disabled:opacity-70 transition-[transform,background-color] duration-300 ease-out hover:scale-[1.02] active:scale-95 disabled:scale-100"
            >
              {submitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
