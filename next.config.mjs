const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === "production" ? ".next-build" : ".next-output"),
  experimental: {
    cpus: 1,
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: { bodySizeLimit: "27mb" },
    webpackBuildWorker: false,
  },
  async rewrites() {
    const backend = (process.env.BACKEND_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
    return [{ source: "/catalog-data", destination: `${backend}/api/` }];
  },
};
export default nextConfig;
