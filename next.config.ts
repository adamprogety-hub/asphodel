import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Docker/Timeweb — npm start теперь запускает node .next/standalone/server.js
};

export default nextConfig;

