/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Modern formats (AVIF → WebP fallback) for the optimized hero asset.
    // High quality keeps it visually identical to the original 3.9 MB PNG
    // while cutting the transferred bytes by ~10×.
    formats: ["image/avif", "image/webp"],
    // 90 for the hero + product imagery; 70 for the tiny cart/search thumbnails
    // (≤80px — the extra quality is invisible at that size).
    qualities: [70, 90],
  },
}

export default nextConfig
