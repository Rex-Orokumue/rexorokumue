'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/logs',     label: 'Build Logs' },
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

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
          background: ${scrolled ? 'rgba(15,23,42,0.88)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(18px)' : 'none'};
          border-bottom: 1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'};
        }
        .nav-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 64px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.025em;
          color: #F1F5F9;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .nav-logo span { color: #3B82F6; }

        .nav-links-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-link {
          padding: 7px 14px;
          border-radius: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #94A3B8;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }
        .nav-link:hover {
          color: #F1F5F9;
          background: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: #F1F5F9;
          background: rgba(59,130,246,0.10);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #3B82F6;
        }

        .nav-cta {
          margin-left: 20px;
          padding: 9px 22px;
          border: 1px solid #3B82F6;
          border-radius: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.80rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #3B82F6;
          text-decoration: none;
          transition: all 0.2s;
        }
        .nav-cta:hover {
          background: #3B82F6;
          color: #fff;
          box-shadow: 0 4px 20px rgba(59,130,246,0.3);
        }

        /* hamburger */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .nav-hamburger span {
          display: block;
          width: 22px; height: 1.5px;
          background: #94A3B8;
          border-radius: 2px;
          transition: all 0.25s;
        }

        /* mobile menu */
        .nav-mobile {
          display: none;
          position: fixed;
          top: 70px; left: 0; right: 0;
          background: rgba(15,23,42,0.98);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 20px 28px 28px;
          flex-direction: column;
          gap: 4px;
          z-index: 99;
        }
        .nav-mobile.open { display: flex; }
        .nav-mobile .nav-link {
          font-size: 0.95rem;
          padding: 12px 16px;
        }
        .nav-mobile .nav-cta {
          margin-left: 0;
          margin-top: 12px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .nav-inner { padding: 0 24px; }
          .nav-links-wrap { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Rex<span>.</span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-links-wrap">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${pathname === l.href ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <a href="mailto:hello@zolarux.com" className="nav-cta">
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={menuOpen ? { transform: 'translateY(6px) rotate(45deg)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'translateY(-6px) rotate(-45deg)' } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link${pathname === l.href ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <a href="mailto:hello@zolarux.com" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Hire Me
        </a>
      </div>
    </>
  );
}