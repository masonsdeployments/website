import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  images: {
    unoptimized: true, // Disables Next.js image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
    domains: ["wearemasons.com"],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

module.exports = withMDX(nextConfig);
