/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    transpilePackages: ["@cok/api", "@cok/auth-core", "@cok/db"],
  },
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;
