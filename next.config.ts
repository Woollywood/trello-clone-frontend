import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/user',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
