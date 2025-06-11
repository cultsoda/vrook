import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VROOK - VR 셀럽 화보 플랫폼',
  description: 'VR 영상과 AI 화보를 통해 팬들에게 새로운 몰입 경험을 전달하는 혁신적인 셀럽 화보 플랫폼',
  keywords: 'VR, 화보, 셀럽, AI, 인플루언서, 가상현실',
  authors: [{ name: 'VROOK' }],
  creator: 'VROOK',
  publisher: 'VROOK',
  openGraph: {
    title: 'VROOK - VR 셀럽 화보 플랫폼',
    description: 'VR 영상과 AI 화보를 통해 팬들에게 새로운 몰입 경험을 전달합니다',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VROOK - VR 셀럽 화보 플랫폼',
    description: 'VR 영상과 AI 화보를 통해 팬들에게 새로운 몰입 경험을 전달합니다',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body>{children}</body>
    </html>
  )
}
