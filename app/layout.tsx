import type { Metadata, Viewport } from 'next'
import './globals.css'
import { TranslationProvider } from '@/hooks/useTranslation'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { generateHomeMetadata, SITE_CONFIG } from '@/lib/seo'
import { Toaster } from 'sonner'


export const metadata: Metadata = generateHomeMetadata()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7c3aed' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1b4b' }
  ],
  colorScheme: 'dark light',
}

// 구조화된 데이터 (Organization)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_CONFIG.name,
  "url": SITE_CONFIG.url,
  "logo": `${SITE_CONFIG.url}/logo.png`,
  "description": SITE_CONFIG.description,
  "sameAs": [
    // 소셜 미디어 링크들 (실제 계정으로 교체)
    "https://www.instagram.com/vrook_official",
    "https://www.youtube.com/@vrook_official",
    "https://twitter.com/vrook_official"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Korean", "English"]
  },
  "foundingDate": "2024",
  "founder": {
    "@type": "Organization",
    "name": "XROMEDA"
  }
}

// 웹사이트 구조화 데이터
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_CONFIG.name,
  "url": SITE_CONFIG.url,
  "description": SITE_CONFIG.description,
  "inLanguage": ["ko-KR", "en-US"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_CONFIG.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://stg.xromeda.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* 🆕 네이버 서치 애드바이저 - 사이트 소유 확인 */}
        <meta name="naver-site-verification" content="398fd9d412e242bc22d42ad995729ae477494a44" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        
        {/* Google Analytics (실제 GA ID로 교체) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-84WGC59PNZ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-84WGC59PNZ', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        
        {/* Microsoft Clarity (선택사항) */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
            `,
          }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <ErrorBoundary>
          <TranslationProvider>
            <div id="root">
             {children}
            </div>
            {/* Sonner Toaster 추가 - 이 부분이 새로 추가됨 */}
            <Toaster 
              theme="dark"
              position="top-center"
              expand={true}
              richColors
              closeButton
            />
          </TranslationProvider>
        </ErrorBoundary>
  
        {/* Skip to content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-purple-600 text-white p-2 z-50"
        >
          메인 콘텐츠로 건너뛰기
        </a>
      </body>
    </html>
  )
}