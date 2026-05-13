import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? "/skill-of-professional" : "",
  assetPrefix: isProd ? "/skill-of-professional" : "",
}

export default nextConfig;
