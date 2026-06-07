import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mammoth", "pdf-parse"],
  async redirects() {
    return [
      {
        source: "/delivery",
        destination: "/service/delivery",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ["192.168.219.104", "192.168.*.*", "10.*.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
