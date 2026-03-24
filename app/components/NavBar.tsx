'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About' },
  { href: '/projects',     label: 'Projects' },
  { href: '/blog',         label: 'Blog' },
  { href: '/tech-serial',  label: 'Tech Serial' },
  { href: '/bootcamp',     label: 'Bootcamp' },
  { href: '/build-logs',   label: 'Build Logs' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background .3s, box-shadow .3s, border-color .3s;
          background: ${scrolled ? 'rgba(15,23,42,0.92)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          border-bottom: 1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'};
        }
        .nav-inner {
          width: 100%; padding: 0 40px;
          height: 68px; display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.15rem;
          letter-spacing: -.025em; color: #F1F5F9; text-decoration: none;
          display: flex; align-items: center; gap: 2px; flex-shrink: 0;
        }
        .nav-logo span { color: #3B82F6; }
        .nav-links-wrap { display: flex; align-items: center; gap: 2px; }
        .nav-link {
          padding: 6px 12px; border-radius: 7px; font-family: 'DM Sans', sans-serif;
          font-size: .80rem; font-weight: 500; letter-spacing: .01em;
          color: #94A3B8; text-decoration: none; transition: color .2s, background .2s;
          position: relative; white-space: nowrap;
        }
        .nav-link:hover { color: #F1F5F9; background: rgba(255,255,255,0.05); }
        .nav-link.active { color: #F1F5F9; background: rgba(59,130,246,0.10); }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 4px; left: 50%;
          transform: translateX(-50%); width: 4px; height: 4px;
          border-radius: 50%; background: #3B82F6;
        }
        .nav-link.highlight {
          color: #34D399; background: rgba(52,211,153,0.08);
          border: 1px solid rgba(52,211,153,0.25);
        }
        .nav-link.highlight:hover { background: rgba(52,211,153,0.15); }
        .nav-cta {
          margin-left: 16px; padding: 8px 20px; border: 1px solid #3B82F6;
          border-radius: 7px; font-family: 'DM Sans', sans-serif; font-size: .80rem;
          font-weight: 600; letter-spacing: .04em; color: #3B82F6;
          text-decoration: none; transition: all .2s; white-space: nowrap; flex-shrink: 0;
        }
        .nav-cta:hover { background: #3B82F6; color: #fff; box-shadow: 0 4px 20px rgba(59,130,246,.3); }
        .nav-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 6px;
        }
        .nav-hamburger span {
          display: block; width: 22px; height: 1.5px; background: #94A3B8;
          border-radius: 2px; transition: all .25s;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        .nav-mobile {
          display: none; position: fixed; top: 68px; left: 0; right: 0;
          background: rgba(15,23,42,0.98); backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 16px 24px 24px; flex-direction: column; gap: 3px; z-index: 99;
        }
        .nav-mobile.open { display: flex; }
        .nav-mobile .nav-link { font-size: .92rem; padding: 11px 16px; }
        .nav-mobile .nav-cta { margin-left: 0; margin-top: 10px; text-align: center; }
        .nav-mobile-section {
          font-size: .60rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          color: #475569; padding: 12px 16px 4px; margin-top: 4px;
        }
        @media (max-width: 1024px) {
          .nav-inner { padding: 0 28px; }
          .nav-links-wrap { gap: 0; }
          .nav-link { padding: 6px 10px; font-size: .76rem; }
        }
        @media (max-width: 768px) {
          .nav-inner { padding: 0 20px; }
          .nav-links-wrap { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Rex<span>.</span></Link>

          {/* Desktop */}
          <div className="nav-links-wrap">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${pathname === l.href ? ' active' : ''}${l.href === '/bootcamp' ? ' highlight' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <a href="mailto:hello@zolarux.com" className="nav-cta">Hire Me</a>
          </div>

          {/* Mobile hamburger */}
          <button className={`nav-hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <div className="nav-mobile-section">Navigation</div>
        {links.slice(0, 3).map(l => (
          <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`}>
            {l.label}
          </Link>
        ))}
        <div className="nav-mobile-section">Content</div>
        {links.slice(3, 6).map(l => (
          <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}${l.href === '/bootcamp' ? ' highlight' : ''}`}>
            {l.label}
          </Link>
        ))}
        <div className="nav-mobile-section">More</div>
        {links.slice(6).map(l => (
          <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`}>
            {l.label}
          </Link>
        ))}
        <a href="mailto:hello@zolarux.com" className="nav-cta">Hire Me</a>
      </div>
    </>
  );
}