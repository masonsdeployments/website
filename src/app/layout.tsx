import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const geistSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Masons",
  description:
    "Masons is a lean software team known for scalable, high-performance systems. From NASA Space Apps to building Rafiqi, our AI mental health platform. We engineer impactful, real-world solutions with relentless execution.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonPro.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
