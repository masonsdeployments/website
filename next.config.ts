import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
    ],
    domains: ["wearemasons.com"],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(withMDX(nextConfig));

