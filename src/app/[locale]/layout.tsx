import type { Metadata } from "next";
import {
  Space_Grotesk,
  Space_Mono,
  Crimson_Pro,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import "@/styles/gruvbox-dark-hard.css";
import { ThemeProvider } from "../../components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Masons",
  description:
    "Masons is a lean software team known for scalable, high-performance systems. From NASA Space Apps to building Rafiqi, our AI mental health platform. We engineer impactful, real-world solutions with relentless execution.",
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
    <html lang={isArabic ? "ar" : "en"} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`antialiased no-scrollbar ${
          isArabic
            ? `${ibmPlexSansArabic.variable}`
            : `${spaceGrotesk.variable} ${spaceMono.variable} ${crimsonPro.variable}`
        }`}
        data-rtl={isArabic ? "true" : undefined}
      >
        <ThemeProvider>
          <Suspense>
            <NextIntlClientProvider locale={locale}>
              {children}
            </NextIntlClientProvider>
          </Suspense>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
