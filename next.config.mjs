const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === "production" ? ".next-build" : ".next-output"),
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: { bodySizeLimit: "27mb" },
  },
};
export default nextConfig;
