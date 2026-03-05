import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MouseProvider } from "@/lib/mouse-context"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/constants"
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo"
import "./globals.css"

const bricolageGrotesque = Bricolage_Grotesque({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "web development company",
    "app development company",
    "SaaS development agency",
    "custom software development",
    "startup MVP development",
    "UI/UX design agency",
    "digital product studio",
    "Trawerse",
  ],
  authors: [{ name: "passionate developers" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: "/site.webmanifest",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
    capable: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    creator: "@trawersedev",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* ── Resource Hints for Critical Third-Party Origins ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        {/* ── Structured Data ── */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className={`${bricolageGrotesque.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MouseProvider>
            {children}
            <Analytics />
          </MouseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
