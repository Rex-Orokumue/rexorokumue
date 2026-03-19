import type { Metadata } from 'next';
import About from './About';
 
export const metadata: Metadata = {
  title: 'About',
  description:
    'Full-stack engineer and founder from Warri, Nigeria. I design, build, and ship production-grade software — Flutter for mobile, Next.js for web, Supabase for backend. Founder of Zolarux.',
  openGraph: {
    title: 'About Rex Orokumue — Full-Stack Engineer & Founder',
    description:
      'Full-stack engineer and founder from Warri, Nigeria. Building production software with Flutter, Next.js, and Supabase.',
    url: 'https://rexorokumue.vercel.app/about',
    images: [{ url: '/portfolio_thumbnail.png', width: 1200, height: 627 }],
  },
  alternates: { canonical: 'https://rexorokumue.vercel.app/about' },
};

export default function Page () {
    return <About />;
}