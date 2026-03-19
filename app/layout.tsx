import NavBar from './components/NavBar';
import './globals.css';
import type { Metadata } from 'next';

const BASE_URL = 'https://rexorokumue.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Rex Orokumue — Full-Stack Engineer & Founder',
    template: '%s | Rex Orokumue',
  },
  description:
    'Full-stack engineer and founder building production-grade mobile and web products. Core stack: Flutter, Next.js, Supabase, PostgreSQL. Founder of Zolarux — a live social commerce platform built solo.',
  keywords: [
    'Rex Orokumue', 'Full-Stack Engineer', 'Flutter Developer', 'Next.js Developer',
    'Supabase', 'Nigeria', 'Remote Developer', 'Zolarux', 'Mobile App Developer',
    'Software Engineer Nigeria', 'Flutter Nigeria', 'React Developer',
  ],
  authors: [{ name: 'Rex Orokumue', url: BASE_URL }],
  creator: 'Rex Orokumue',
  publisher: 'Rex Orokumue',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE_URL,
    siteName: 'Rex Orokumue',
    title: 'Rex Orokumue — Full-Stack Engineer & Founder',
    description:
      'Full-stack engineer and founder building production-grade mobile and web products with Flutter, Next.js, and Supabase.',
    images: [
      {
        url: '/portfolio_thumbnail.png',
        width: 1200,
        height: 627,
        alt: 'Rex Orokumue — Full-Stack Engineer & Founder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@iamrexorokumue',
    creator: '@iamrexorokumue',
    title: 'Rex Orokumue — Full-Stack Engineer & Founder',
    description:
      'Full-stack engineer and founder building production-grade mobile and web products with Flutter, Next.js, and Supabase.',
    images: ['/portfolio_thumbnail.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add your Google Search Console verification code here when you get it
    // google: 'your-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="canonical" href={BASE_URL} />

        {/* Person schema — tells Google who you are */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Rex Godstime Orokumue',
              url: BASE_URL,
              image: `${BASE_URL}/portfolio_thumbnail.png`,
              jobTitle: 'Full-Stack Engineer & Founder',
              description:
                'Full-stack engineer and founder building production-grade mobile and web products with Flutter, Next.js, and Supabase.',
              worksFor: {
                '@type': 'Organization',
                name: 'Zolarux',
                url: 'https://zolarux.com.ng',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Warri',
                addressCountry: 'NG',
              },
              sameAs: [
                'https://www.linkedin.com/in/rexorokumue/',
                'https://github.com/Rex-Orokumue',
                'https://x.com/iamrexorokumue',
                'https://zolarux.com.ng',
                'https://www.youtube.com/@TheTechSerial',
              ],
              knowsAbout: [
                'Flutter', 'Dart', 'Next.js', 'React', 'TypeScript',
                'Supabase', 'PostgreSQL', 'Firebase', 'Mobile App Development',
                'Full-Stack Development', 'Software Engineering',
              ],
            }),
          }}
        />

        {/* Website schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Rex Orokumue',
              url: BASE_URL,
              description: 'Portfolio and professional website of Rex Orokumue — Full-Stack Engineer & Founder.',
              author: {
                '@type': 'Person',
                name: 'Rex Godstime Orokumue',
              },
            }),
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#0F172A',
          color: '#F1F5F9',
          overflowX: 'hidden',
        }}
      >
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}