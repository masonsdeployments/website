export const site = {
  name: "Masons",
  studioName: "Masons Studio",
  url: "https://wearemasons.com",
  studioUrl: "https://studio.wearemasons.com",
  email: "wearemasonsteam@gmail.com",
  location: "Cairo, Egypt",
  timeZone: "Africa/Cairo",
  mapsUrl: "https://maps.google.com/?q=Cairo,Egypt",
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "@wearemasons",
      href: "https://github.com/wearemasons",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "company/wearemasons",
      href: "https://linkedin.com/company/wearemasons",
    },
    {
      id: "twitter",
      label: "X",
      handle: "@wearemasons",
      href: "https://twitter.com/wearemasons",
    },
  ],
  products: [
    {
      id: "rafiqi",
      title: "Rafiqi",
      domain: "rafiqi.wearemasons.com",
      href: "https://rafiqi.wearemasons.com/",
      caseStudyHref: "/case-studies/rafiqi",
    },
    {
      id: "repai",
      title: "repAI",
      domain: "repai.wearemasons.com",
      href: "https://repai.wearemasons.com/",
      caseStudyHref: "/case-studies/repai",
    },
    {
      id: "orbit",
      title: "Orbit",
      domain: "orbit.wearemasons.com",
      href: "https://orbit.wearemasons.com/",
      caseStudyHref: "/case-studies/orbit",
    },
    {
      id: "naveris",
      title: "NAVERIS",
      domain: "github.com/wearemasons/NAVERIS",
      href: "https://github.com/wearemasons/NAVERIS",
      caseStudyHref: "/case-studies/naveris",
    },
  ],
} as const;

export const INQUIRY_OPTIONS = [
  {
    id: "new-product",
    subject: "Project Inquiry: New Product / MVP",
    timeline: "6-16 weeks",
  },
  {
    id: "ai-integration",
    subject: "Project Inquiry: AI & Automation",
    timeline: "4-10 weeks",
  },
  {
    id: "team-augmentation",
    subject: "Project Inquiry: Team Augmentation",
    timeline: "Monthly sprint",
  },
  {
    id: "consulting",
    subject: "Project Inquiry: Technical Audit & Architecture",
    timeline: "1-2 weeks",
  },
] as const;

export type InquiryOptionId = (typeof INQUIRY_OPTIONS)[number]["id"];

export function buildMailtoHref(subject: string, greeting = "Hi Masons team,") {
  const encodedSubject = encodeURIComponent(subject);
  const body = encodeURIComponent(
    [
      greeting,
      "",
      "What we are building:",
      "",
      "Target timeline:",
      "",
      "Links or context:",
      "",
    ].join("\n")
  );
  return `mailto:${site.email}?subject=${encodedSubject}&body=${body}`;
}
