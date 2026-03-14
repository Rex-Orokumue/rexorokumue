import NavBar from './components/NavBar';
import './globals.css';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Rex Orokumue — Full-Stack Engineer & Founder',
  description:
    'AI-first full-stack engineer shipping production apps with Flutter, Next.js, and Supabase. Founder of Zolarux.',
  keywords: ['Flutter', 'Next.js', 'Supabase', 'Full-Stack Engineer', 'Zolarux', 'Nigeria'],
  authors: [{ name: 'Rex Orokumue' }],
  openGraph: {
    title: 'Rex Orokumue — Full-Stack Engineer & Founder',
    description: 'AI-first engineer building trust-driven products.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for Google Fonts (loaded in GlobalStyles component inline) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        <SpeedInsights />
      </body>
    </html>
  );
}