"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { LATTICE } from "@/components/hero-backdrop";

type Mode = "signin" | "register";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [pending, setPending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setStatus(mode === "signin" ? "Signing you in…" : "Creating your account…");
    // Simulated auth round-trip — wire to a real endpoint here.
    setTimeout(() => {
      setPending(false);
      setStatus(
        mode === "signin"
          ? "Signed in. Welcome back to Velvra."
          : "Account created. Welcome to Velvra."
      );
    }, 1100);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Faint couture lattice echoing the hero, contained to a soft centre bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(60%_60%_at_50%_45%,black,transparent_75%)]"
        style={{ backgroundImage: LATTICE, backgroundSize: "56px 56px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,oklch(0.99_0.008_84/0.6),transparent_62%)]"
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-sans text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </Link>

        {/* Brand masthead, mirroring the header identity */}
        <div className="mb-8 text-center">
          <div className="font-script text-5xl leading-none text-foreground">Velvra</div>
          <div className="mx-auto mt-2 h-px w-24 bg-foreground/30" />
          <p className="mt-3 text-[0.6rem] font-sans uppercase tracking-[0.42em] text-muted-foreground">
            kind of clothing
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-[oklch(0.985_0.008_80)] p-7 shadow-[0_30px_70px_-45px_oklch(0.4_0.03_55/0.35)] sm:p-9">
          <h1 className="text-center font-display text-3xl font-medium tracking-tight text-foreground">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-2 text-center font-serif text-base text-muted-foreground">
            {mode === "signin"
              ? "Sign in to your Velvra account"
              : "Join Velvra for a curated wardrobe"}
          </p>

          {/* Segmented mode toggle */}
          <div
            role="tablist"
            aria-label="Authentication mode"
            className="mt-6 grid grid-cols-2 rounded-full border border-border bg-muted/60 p-1"
          >
            {(["signin", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m);
                  setStatus("");
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-sans font-medium uppercase tracking-[0.12em] transition-[color,background-color,box-shadow] duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                  mode === m
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m === "signin" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-foreground/85">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Eleanor Vance"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-foreground/85">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground/85">
                  Password
                </Label>
                {mode === "signin" && (
                  <Link
                    href="/login"
                    className="text-xs font-sans text-secondary hover:text-foreground transition-colors"
                  >
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Checkbox id="remember" name="remember" defaultChecked={mode === "signin"} />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                {mode === "signin"
                  ? "Keep me signed in"
                  : "I agree to the Terms & Privacy Policy"}
              </Label>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="h-12 w-full rounded-md bg-secondary text-secondary-foreground font-serif text-sm font-medium uppercase tracking-[0.18em] transition-colors hover:bg-[oklch(0.47_0.05_65)] active:scale-[0.99]"
            >
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>

            {/* Polite status for assistive tech */}
            <p aria-live="polite" className="min-h-5 text-center text-sm font-sans text-secondary">
              {status}
            </p>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[0.65rem] font-sans uppercase tracking-[0.2em] text-muted-foreground">
              or continue with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => setStatus(`Continuing with ${provider}…`)}
                className="rounded-md border border-border bg-card px-4 py-2.5 text-sm font-sans text-foreground/85 transition-[color,border-color,transform] hover:border-secondary hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm font-sans text-muted-foreground">
          {mode === "signin" ? "New to Velvra? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "signin" ? "register" : "signin")}
            className="font-medium text-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </main>
  );
}
