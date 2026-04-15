import type { Metadata } from "next";
import RemoteResourcesClient from "./RemoteResourcesClient";

export const metadata: Metadata = {
  title: "Remote Resources — Codematics Services Pvt Ltd",
  description: "Hire expert remote talent from Codematics. On-demand developers, designers, and marketing specialists for your business.",
};

export default function RemoteResourcesPage() {
  return <RemoteResourcesClient />;
}
