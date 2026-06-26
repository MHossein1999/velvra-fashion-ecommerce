import type { Metadata } from "next"
import { Mail, Clock, Instagram } from "lucide-react"

import { InfoPage, InfoSection } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Contact — VELVRA",
  description: "Get in touch with the Velvra client care team.",
}

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact Us"
      intro="Our client care team is here to help with sizing, orders, and styling."
    >
      <InfoSection heading="Client care">
        <p className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-secondary" />
          <a
            className="text-secondary underline-offset-4 hover:underline"
            href="mailto:care@velvra.studio"
          >
            care@velvra.studio
          </a>
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-secondary" />
          Monday–Friday, 9am–6pm GMT
        </p>
        <p>We aim to reply to every message within one business day.</p>
      </InfoSection>

      <InfoSection heading="Press & wholesale">
        <p>
          For press, collaborations, or wholesale enquiries, write to{" "}
          <a
            className="text-secondary underline-offset-4 hover:underline"
            href="mailto:press@velvra.studio"
          >
            press@velvra.studio
          </a>
          .
        </p>
      </InfoSection>

      <InfoSection heading="Stay connected">
        <p className="flex items-center gap-2">
          <Instagram className="h-4 w-4 text-secondary" />
          Follow{" "}
          <a
            className="text-secondary underline-offset-4 hover:underline"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            @velvra
          </a>{" "}
          for new arrivals and styling notes.
        </p>
      </InfoSection>
    </InfoPage>
  )
}
