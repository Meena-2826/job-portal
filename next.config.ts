// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    appDir: true, // ✅ Enable App Router
  },
}

export default nextConfig;
