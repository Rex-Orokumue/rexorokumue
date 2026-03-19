import type { Metadata } from 'next';
import Projects from './Projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Production-grade software projects built by Rex Orokumue — Zolarux (live social commerce platform), EduPanion (EdTech), Zolarux Admin Control Center, and the EscrowPay FinTech Engine.',
  openGraph: {
    title: 'Projects — Rex Orokumue',
    description:
      'Real products built and shipped by Rex Orokumue — Zolarux marketplace, EduPanion, Admin Control Center, and the EscrowPay Engine.',
    url: 'https://rexorokumue.vercel.app/projects',
    images: [{ url: '/zolarux-thumbnail.png', width: 1200, height: 627 }],
  },
  alternates: { canonical: 'https://rexorokumue.vercel.app/projects' },
};

export default function Page() {
  return <Projects />;
}