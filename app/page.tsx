import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import Projects from './components/Projects';
import BuildInPublic from './components/BuildInPublic';
import FinalCTA from './components/FinalCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />
      <WhatIDo />
      <Projects />
      <BuildInPublic />
      <FinalCTA />
    </main>
  );
}