import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/brand",
  assetPrefix: "/brand/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
