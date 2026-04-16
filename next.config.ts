import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com https://api.midtrans.com https://www.youtube.com",
              "connect-src 'self' https://*.supabase.co https://api.groq.com https://app.sandbox.midtrans.com https://api.midtrans.com",
              "frame-src 'self' https://app.sandbox.midtrans.com https://www.youtube.com https://youtube.com https://www.google.com https://maps.google.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' https://www.youtube.com https://youtube.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data: https:"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig