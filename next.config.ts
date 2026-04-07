import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aliraza.tech",
      },
      {
        protocol: "https",
        hostname: "webtend.site",
      },
    ],
  },
};

export default nextConfig;
