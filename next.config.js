// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Firebase CDN 모듈 무시
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  // 외부 CDN 허용
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig