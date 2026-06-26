import type { Metadata } from "next"

import { InfoPage, InfoSection } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Size Guide — VELVRA",
  description: "Measurements and fit notes to help you find your perfect size.",
}

const SIZES = [
  { size: "XS", bust: "31–32", waist: "24–25", hips: "34–35" },
  { size: "S", bust: "33–34", waist: "26–27", hips: "36–37" },
  { size: "M", bust: "35–36", waist: "28–29", hips: "38–39" },
  { size: "L", bust: "37–39", waist: "30–32", hips: "40–42" },
  { size: "XL", bust: "40–42", waist: "33–35", hips: "43–45" },
]

export default function SizeGuidePage() {
  return (
    <InfoPage
      title="Size Guide"
      intro="Measurements in inches. When you're between sizes, we recommend sizing up for a relaxed, layered fit."
    >
      <InfoSection heading="Womenswear">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-sm tabular-nums">
            <thead>
              <tr className="bg-muted/60 text-foreground">
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Bust</th>
                <th className="px-4 py-3 font-medium">Waist</th>
                <th className="px-4 py-3 font-medium">Hips</th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((row) => (
                <tr key={row.size} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{row.size}</td>
                  <td className="px-4 py-3">{row.bust}</td>
                  <td className="px-4 py-3">{row.waist}</td>
                  <td className="px-4 py-3">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfoSection>

      <InfoSection heading="How to measure">
        <p>
          <strong className="font-medium text-foreground">Bust</strong> — measure
          around the fullest part, keeping the tape level.
        </p>
        <p>
          <strong className="font-medium text-foreground">Waist</strong> — measure
          around the narrowest part of your natural waistline.
        </p>
        <p>
          <strong className="font-medium text-foreground">Hips</strong> — measure
          around the fullest part, roughly 8 inches below the waist.
        </p>
      </InfoSection>

      <InfoSection heading="Fit notes">
        <p>
          Our knitwear is designed for an easy, enveloping drape, while tailoring
          runs true to size. Individual product pages note any piece that runs
          large or small.
        </p>
      </InfoSection>
    </InfoPage>
  )
}
