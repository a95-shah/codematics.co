import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us — Codematics Services Pvt Ltd",
  description: "Learn about Codematics Services — a global trusted partner for software engineering excellence with multinational presence and an award-winning portfolio.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
