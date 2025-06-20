import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["knex", "pg"],
  output: "standalone",
};

export default nextConfig;
