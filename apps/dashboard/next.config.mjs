/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enables hot-reload and easy integration for local packages
    transpilePackages: ["@cok/api", "@cok/db", "@cok/interface", "@cok/auth-core"],
  },
  images: {
    domains: ["avatars.githubusercontent.com", "cdn.xpr.im"]
  }
};

export default config;
