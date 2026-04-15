import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — Codematics Services Pvt Ltd",
  description: "Get in touch with Codematics. Offices in Pakistan and Estonia. Discuss your next project with our experts.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
