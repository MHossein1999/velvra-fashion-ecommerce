import type { Metadata } from "next"

import { InfoPage, InfoSection } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Terms of Service — VELVRA",
  description: "The terms that govern your use of the Velvra website and store.",
}

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      intro="The terms below govern your use of the Velvra website and store."
    >
      <InfoSection heading="Use of the site">
        <p>
          By browsing or purchasing from Velvra, you agree to use the site
          lawfully and not to misuse its content, which is provided for personal,
          non-commercial use.
        </p>
      </InfoSection>

      <InfoSection heading="Orders & pricing">
        <p>
          All orders are subject to availability and acceptance. Prices are shown
          in your local currency where supported and may change without notice.
          We reserve the right to cancel any order in the rare case of a pricing
          or stock error.
        </p>
      </InfoSection>

      <InfoSection heading="Intellectual property">
        <p>
          All imagery, text, and design on this site are the property of Velvra
          and may not be reproduced without written permission.
        </p>
      </InfoSection>

      <InfoSection heading="Liability">
        <p>
          The site is provided &ldquo;as is.&rdquo; To the extent permitted by
          law, Velvra is not liable for any indirect loss arising from its use.
        </p>
      </InfoSection>

      <InfoSection heading="Note">
        <p className="text-muted-foreground">
          Velvra is a portfolio design project. These terms are illustrative and
          do not constitute a binding agreement.
        </p>
      </InfoSection>
    </InfoPage>
  )
}
