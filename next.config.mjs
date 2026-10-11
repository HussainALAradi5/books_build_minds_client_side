const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || ".next-output",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: { bodySizeLimit: "27mb" },
  },
};
export default nextConfig;
