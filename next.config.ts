import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "mammoth",
    "pdf-parse",
    "pdfjs-dist",
    "@napi-rs/canvas",
  ],
  outputFileTracingIncludes: {
    "/api/admin/file-converter": [
      "./node_modules/pdf-parse/**/*",
      "./node_modules/pdfjs-dist/**/*",
      "./node_modules/@napi-rs/canvas/**/*",
      "./node_modules/@napi-rs/canvas-linux-x64-gnu/**/*",
      "./node_modules/@napi-rs/canvas-linux-x64-musl/**/*",
      "./node_modules/@napi-rs/canvas-linux-arm64-gnu/**/*",
      "./node_modules/@napi-rs/canvas-linux-arm64-musl/**/*",
    ],
  },
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
