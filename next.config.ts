import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：next build 后产出 out/，部署不需要 Node 运行时
  output: "export",

  // 项目当前没用 next/image，但 export 模式下默认 loader 会在 dev 环境直接抛错，
  // 而 build 不会 —— 提前拆掉这颗雷，无副作用。
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
