import { cn } from "@/lib/utils";
import { PAPER_GRAIN } from "@/components/editorial-backdrop";

// Fine couture diamond-lattice tile (a quilted-luxury reference) — a hairline
// diamond grid with a pinned centre dot, in the warm editorial brown-black.
// Rendered faint and masked so it reads as a contained monogram texture behind
// the model, never as wallpaper. Exported so the auth/wishlist pages can echo it.
export const LATTICE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='54' height='54'%3E%3Cpath d='M27 0 L54 27 L27 54 L0 27 Z' fill='none' stroke='%232b2622' stroke-width='0.7'/%3E%3Ccircle cx='27' cy='27' r='1' fill='%232b2622'/%3E%3C/svg%3E\")";

/** The framing arch alcove — a lit niche in the gallery palette behind the model. */
function Arch() {
  return (
    <div className="absolute bottom-0 right-[1%] lg:right-[6%] h-[88%] w-[clamp(300px,44vw,600px)]">
      {/* thin concentric outline */}
      <div className="absolute -inset-x-[3%] bottom-0 top-0 rounded-t-[999px] border border-foreground/12" />
      {/* graded fill panel */}
      <div className="absolute inset-x-0 bottom-0 top-[4%] rounded-t-[999px] bg-[linear-gradient(to_bottom,oklch(0.95_0.014_78/0.4),oklch(0.86_0.022_70/0.26))]" />
      {/* light pooling at the crown */}
      <div className="absolute inset-x-[8%] top-[5%] h-[58%] rounded-t-[999px] bg-[radial-gradient(82%_70%_at_50%_0%,oklch(0.99_0.008_84/0.5),transparent_72%)]" />
    </div>
  );
}

// Editorial luxury backdrop for the hero — a soft warm-cream gallery wall with a
// diffuse daylight pool, a couture diamond-lattice monogram texture, an oversized
// Didone "V" watermark, a framing arch alcove, a vignette to seat the figure, and
// a fine paper grain. Decorative only; always inside a pointer-events-none layer.
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* soft warm-cream wall — creamy editorial tone tuned to the site's
          #F4EDE1 background */}
      <div className="absolute inset-0 bg-[linear-gradient(176deg,oklch(0.963_0.02_82)_0%,oklch(0.942_0.024_78)_56%,oklch(0.915_0.03_72)_100%)]" />
      {/* even, diffuse warm daylight pool */}
      <div className="absolute inset-0 bg-[radial-gradient(72%_82%_at_60%_16%,oklch(0.978_0.018_84/0.5),transparent_62%)]" />
      {/* warm floor */}
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(to_top,oklch(0.89_0.024_70/0.4),transparent)]" />

      {/* couture diamond-lattice monogram texture — sits above the tonal washes
          so it reads, masked to bloom on the right behind the model and fade out
          before the headline */}
      <div
        className="absolute inset-0 opacity-[0.13] [mask-image:linear-gradient(to_left,black_0%,black_22%,transparent_70%)]"
        style={{ backgroundImage: LATTICE, backgroundSize: "56px 56px" }}
      />

      {/* oversized Didone "V" monogram watermark, centred in the composition */}
      <div className="absolute inset-0 hidden items-center justify-center lg:flex">
        <span className="translate-x-[5%] -translate-y-[3%] select-none font-display leading-none text-[26rem] xl:text-[32rem] text-foreground/[0.05]">
          V
        </span>
      </div>

      <Arch />

      {/* thin radiant arc echoing the arch crown for an editorial-crest feel */}
      <div className="absolute bottom-0 right-[1%] lg:right-[6%] h-[88%] w-[clamp(300px,44vw,600px)]">
        <div className="absolute -inset-x-[9%] bottom-0 top-[-5%] rounded-t-[999px] border-t border-foreground/10" />
      </div>

      {/* handwritten campaign signature in the open centre */}
      <span className="absolute bottom-[15%] left-[37%] hidden select-none font-script text-5xl text-foreground/[0.14] lg:block">
        Velvra
      </span>

      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_42%,transparent_58%,oklch(0.5_0.02_55/0.1))]" />
      <div
        className={cn("absolute inset-0 mix-blend-soft-light opacity-[0.2]")}
        style={{ backgroundImage: PAPER_GRAIN }}
      />
    </div>
  );
}
