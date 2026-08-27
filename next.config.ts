import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Для Docker/Timeweb — создаёт автономный server.js
};

export default nextConfig;
