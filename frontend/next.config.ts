import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: `${process.env.BACKEND_ENDPOINT}/:path*`,
      },
    ];
  },
};

export default nextConfig;
