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

function NavBarInner({ pathname }: { pathname: string }) {
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
          transition: background .3s, border-color .3s;
          background: ${scrolled ? 'var(--panel)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          border-bottom: 1px solid ${scrolled ? 'var(--border)' : 'transparent'};
        }
        .nav-inner {
          width: 100%; padding: 0 40px;
          height: 68px; display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 1.15rem;
          letter-spacing: -.025em; color: var(--text); text-decoration: none;
          display: flex; align-items: center; gap: 2px; flex-shrink: 0;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links-wrap { display: flex; align-items: center; gap: 2px; }
        .nav-link {
          padding: 6px 12px; border-radius: 7px; font-family: 'DM Sans', sans-serif;
          font-size: .80rem; font-weight: 500; letter-spacing: .01em;
          color: var(--muted); text-decoration: none; transition: color .2s, background .2s;
          position: relative; white-space: nowrap;
        }
        .nav-link:hover { color: var(--text); background: color-mix(in srgb, var(--text) 6%, transparent); }
        .nav-link.active { color: var(--text); background: color-mix(in srgb, var(--accent) 10%, transparent); }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 4px; left: 50%;
          transform: translateX(-50%); width: 4px; height: 4px;
          border-radius: 50%; background: var(--accent);
        }
        .nav-link.highlight {
          color: #34D399; background: rgba(52,211,153,0.08);
          border: 1px solid rgba(52,211,153,0.25);
        }
        .nav-link.highlight:hover { background: rgba(52,211,153,0.15); }
        .nav-cta {
          margin-left: 16px; padding: 8px 20px; border: 1px solid var(--accent);
          border-radius: 7px; font-family: 'DM Sans', sans-serif; font-size: .80rem;
          font-weight: 600; letter-spacing: .04em; color: var(--accent);
          text-decoration: none; transition: all .2s; white-space: nowrap; flex-shrink: 0;
        }
        .nav-cta:hover { background: var(--accent); color: var(--accent-ink); }
        .nav-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 6px;
        }
        .nav-hamburger span {
          display: block; width: 22px; height: 1.5px; background: var(--muted);
          border-radius: 2px; transition: all .25s;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        .nav-mobile {
          display: none; position: fixed; top: 68px; left: 0; right: 0;
          background: var(--panel); backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          padding: 16px 24px 24px; flex-direction: column; gap: 3px; z-index: 99;
        }
        .nav-mobile.open { display: flex; }
        .nav-mobile .nav-link { font-size: .92rem; padding: 11px 16px; }
        .nav-mobile .nav-cta { margin-left: 0; margin-top: 10px; text-align: center; }
        .nav-mobile-section {
          font-size: .60rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          color: var(--muted); padding: 12px 16px 4px; margin-top: 4px;
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

export default function NavBar() {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/resume') return null;
  return <NavBarInner pathname={pathname} />;
}