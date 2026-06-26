import type { Metadata } from "next"

import { InfoPage, InfoSection } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Privacy Policy — VELVRA",
  description: "How Velvra collects, uses, and protects your personal data.",
}

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="We respect your privacy and only collect what we need to serve you well."
    >
      <InfoSection heading="What we collect">
        <p>
          When you place an order or subscribe, we collect your name, contact
          details, delivery address, and order history. Payment details are
          handled by our payment provider and never stored on our servers.
        </p>
      </InfoSection>

      <InfoSection heading="How we use it">
        <p>
          Your information is used to process orders, provide client care, and —
          only with your consent — send you updates about new collections. We
          never sell your data.
        </p>
      </InfoSection>

      <InfoSection heading="Cookies">
        <p>
          We use essential cookies to run the site and optional analytics cookies
          to understand how it&apos;s used. You can manage these in your browser at
          any time.
        </p>
      </InfoSection>

      <InfoSection heading="Your rights">
        <p>
          You may request access to, correction of, or deletion of your personal
          data at any time by emailing{" "}
          <a className="text-secondary underline-offset-4 hover:underline" href="mailto:care@velvra.studio">
            care@velvra.studio
          </a>
          .
        </p>
      </InfoSection>
    </InfoPage>
  )
}
