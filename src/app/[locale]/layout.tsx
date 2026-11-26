import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/gruvbox-dark-hard.css";
import { ThemeProvider } from "../../components/layout/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ProjectInquiryModalProvider } from "@/components/project-inquiry-modal";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const trenchSlab = localFont({
  src: [
    {
      path: "../../../public/fonts/TrenchSlab-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/TrenchSlab-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/TrenchSlab-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/TrenchSlab-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/TrenchSlab-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Masons | Product Engineering Studio",
  description:
    "Masons is a Cairo software engineering studio building commercial web apps, internal operations systems, and applied AI for growing businesses.",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const isArabic = locale === "ar";
  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`antialiased no-scrollbar ${
          isArabic
            ? `${ibmPlexSansArabic.variable} ${jetbrainsMono.variable}`
            : `${outfit.variable} ${jetbrainsMono.variable} ${trenchSlab.variable}`
        }`}
        data-rtl={isArabic ? "true" : undefined}
      >
        <ThemeProvider>
          <Suspense>
            <NextIntlClientProvider locale={locale}>
              <LenisProvider>
                <ProjectInquiryModalProvider>
                  {children}
                </ProjectInquiryModalProvider>
              </LenisProvider>
            </NextIntlClientProvider>
          </Suspense>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
