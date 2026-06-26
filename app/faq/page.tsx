import type { Metadata } from "next"

import { InfoPage, InfoSection } from "@/components/info-page"

export const metadata: Metadata = {
  title: "FAQ — VELVRA",
  description: "Answers to common questions about orders, delivery, and returns.",
}

export default function FaqPage() {
  return (
    <InfoPage
      title="Frequently Asked Questions"
      intro="Everything you need to know about ordering, delivery, and care."
    >
      <InfoSection heading="Do you ship internationally?">
        <p>
          Yes — we deliver to over 40 countries. Duties and taxes are calculated
          at checkout for most destinations, so there are no surprises on arrival.
        </p>
      </InfoSection>

      <InfoSection heading="How long will my order take?">
        <p>
          Orders are processed within 1–2 business days. Standard delivery takes
          3–5 business days; express options are available at checkout.
        </p>
      </InfoSection>

      <InfoSection heading="What is your return policy?">
        <p>
          Unworn pieces can be returned within 30 days of delivery for a full
          refund. See our{" "}
          <a className="text-secondary underline-offset-4 hover:underline" href="/shipping-returns">
            Shipping &amp; Returns
          </a>{" "}
          page for the details.
        </p>
      </InfoSection>

      <InfoSection heading="How do I find my size?">
        <p>
          Our{" "}
          <a className="text-secondary underline-offset-4 hover:underline" href="/size-guide">
            Size Guide
          </a>{" "}
          includes measurements and fit notes for every piece. When in doubt,
          our team is happy to advise.
        </p>
      </InfoSection>

      <InfoSection heading="How should I care for my garments?">
        <p>
          Each piece ships with care instructions on the label. As a rule, we
          recommend gentle cold washing or dry cleaning for knitwear and
          tailoring to preserve the fabric and finish.
        </p>
      </InfoSection>
    </InfoPage>
  )
}
