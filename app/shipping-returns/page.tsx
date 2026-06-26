import type { Metadata } from "next"

import { InfoPage, InfoSection } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Shipping & Returns — VELVRA",
  description: "Delivery options, processing times, and our 30-day return policy.",
}

export default function ShippingReturnsPage() {
  return (
    <InfoPage
      title="Shipping & Returns"
      intro="Considered delivery and an easy, 30-day return policy."
    >
      <InfoSection heading="Delivery options">
        <p>
          <strong className="font-medium text-foreground">Standard</strong> — 3–5
          business days. Complimentary on orders over $250.
        </p>
        <p>
          <strong className="font-medium text-foreground">Express</strong> — 1–2
          business days, available at checkout.
        </p>
      </InfoSection>

      <InfoSection heading="Processing">
        <p>
          Orders placed before 1pm GMT ship the same day, Monday to Friday.
          You&apos;ll receive tracking by email the moment your parcel is on its way.
        </p>
      </InfoSection>

      <InfoSection heading="Returns">
        <p>
          Return any unworn item with its tags attached within 30 days of
          delivery for a full refund to your original payment method. Returns are
          complimentary within the EU and UK.
        </p>
      </InfoSection>

      <InfoSection heading="Exchanges">
        <p>
          Need a different size or colour? Start a return and place a new order —
          it&apos;s the fastest way to secure the piece you want before it sells out.
        </p>
      </InfoSection>

      <InfoSection heading="Refunds">
        <p>
          Once your return is received and inspected, refunds are issued within
          5–7 business days. We&apos;ll email you as soon as it&apos;s processed.
        </p>
      </InfoSection>
    </InfoPage>
  )
}
