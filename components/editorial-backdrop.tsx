import { cn } from "@/lib/utils";

// Shared fine "film grain" — an inline SVG fractal-noise tile. Reused across the
// hero and the product sections so the whole page carries one printed-editorial
// texture. Decorative only; always rendered inside a pointer-events-none layer.
export const GRAIN_IMAGE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Refined fine "paper grain" — single-octave, desaturated fractal noise that
// reads as the soft matte tooth of fine-art paper rather than visible speckle.
// Quieter and more neutral than GRAIN_IMAGE; used behind the hero to give the
// seamless-paper campaign set a printed-editorial finish without any noise.
export const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/**
 * Complementary backdrop for the product/category sections: a soft tonal bloom
 * plus the shared grain. Kept lighter than the hero so the hero stays the focal
 * point while the luxury-editorial mood carries through the rest of the page.
 *
 * Drop into a `relative overflow-hidden` section, before a `relative z-10`
 * content wrapper. `tone` shifts the bloom's anchor/strength per section so
 * consecutive sections don't read identically.
 */
export function SectionBackdrop({
  tone = "top",
  className,
}: {
  tone?: "top" | "center" | "split";
  className?: string;
}) {
  const bloom = {
    top: "bg-[radial-gradient(80%_55%_at_50%_0%,oklch(0.6_0.05_62/0.10),transparent_60%)]",
    center:
      "bg-[radial-gradient(70%_60%_at_50%_45%,oklch(0.62_0.05_62/0.08),transparent_62%)]",
    split:
      "bg-[radial-gradient(60%_70%_at_85%_50%,oklch(0.62_0.05_62/0.10),transparent_60%)]",
  }[tone];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("absolute inset-0", bloom)} />
      <div
        className="absolute inset-0 opacity-[0.32] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN_IMAGE }}
      />
    </div>
  );
}
