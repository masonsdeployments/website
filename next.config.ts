import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  images: {
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
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

module.exports = withMDX(NextConfig);
