import type { Metadata } from "next";
import { LinksHub } from "@/components/links/LinksHub";

export const metadata: Metadata = {
  title: "Links | Masons",
  description:
    "Official links for Masons: commercial studio, flagship products, case studies, direct contact, and social channels.",
};

export default function LinksPage() {
  return <LinksHub />;
}
