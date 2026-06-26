import type React from "react"
import type { Metadata } from "next"
import { Cormorant, Inter, Playfair_Display, Yellowtail } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"

const cormorant = Cormorant({
  subsets: ["latin"],
  // Only the weights the UI actually renders (font-light / normal / medium).
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

// Heavy Didone serif for editorial display headings (hero, brand strip),
// matching the "Style That Speaks" reference treatment.
const playfair = Playfair_Display({
  subsets: ["latin"],
  // medium headings/nav, bold + black brand wordmarks.
  weight: ["400", "500", "700", "900"],
  variable: "--font-display",
  display: "swap",
})

// Elegant brush script used exclusively for the logo wordmark — its connected,
// flourished letterforms and editorial slant match the "Euphoria" wordmark in
// the screen.png reference far more closely than a heavier retro script.
const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
})

const SITE_URL = "https://velvra-fashion-ecommerce.vercel.app"
const SITE_TITLE = "VELVRA — Women's Autumn/Winter Collection"
const SITE_DESCRIPTION =
  "Editorial women's fashion for the cooler seasons — cozy cashmere knits, tailored wool coats, and timeless accessories."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // app/opengraph-image.png and app/icon.svg are auto-wired by Next's file
  // conventions, so og:image / twitter:image and the favicon come for free.
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "VELVRA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${yellowtail.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
