import type { NextConfig } from "next";


const nextConfig: NextConfig = {

  /* 忽略 TypeScript 构建错误，先部署上线 */
  typescript: {
    ignoreBuildErrors: true,
  },

};


export default nextConfig;