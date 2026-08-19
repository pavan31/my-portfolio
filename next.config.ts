import type { NextConfig } from "next";

/**
 * Deployed to GitHub Pages as a user site (pavanseshukumar.github.io), which
 * serves static files from the repo root — so there is no Node server and no
 * basePath. `output: "export"` and an unoptimized image loader are required.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
