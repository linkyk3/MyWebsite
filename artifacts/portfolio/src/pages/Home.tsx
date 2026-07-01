import { Link } from 'wouter';
import BelgianInfraSVG from '@/components/BelgianInfraSVG';

const LogoMark = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="1" y="1" width="5" height="5" />
    <rect x="8" y="1" width="5" height="5" />
    <rect x="1" y="8" width="5" height="5" />
    <rect x="8" y="8" width="5" height="5" />
  </svg>
);

const micro: React.CSSProperties = {
  fontFamily: "'ABC ROM'",
  fontWeight: 300,
  fontSize: '0.6rem',
  letterSpacing: '0.08em',
};

const navLink: React.CSSProperties = {
  fontFamily: "'ABC ROM'",
  fontWeight: 350,
  fontSize: '0.65rem',
  letterSpacing: '0.04em',
};

const tileLabel: React.CSSProperties = {
  fontFamily: "'ABC ROM'",
  fontWeight: 500,
  letterSpacing: '-0.01em',
  lineHeight: 1,
};

export default function Home() {
  return (
    <div
      className="w-screen h-screen flex flex-col overflow-hidden"
      style={{ background: '#000', color: '#fff' }}
      data-testid="home-root"
    >
      {/* ═══════════════════════════════════════
          HEADER ROW — name + micro-nav
      ═══════════════════════════════════════ */}
      <div className="flex flex-shrink-0" style={{ borderBottom: '1px solid #fff' }}>
        {/* Left header — 2/5 */}
        <div
          className="flex flex-col justify-center gap-1.5 px-8 py-4"
          style={{ width: '40%', borderRight: '1px solid rgba(255,255,255,0.2)' }}
        >
          {/* Name + logo */}
          <div className="flex items-center gap-2">
            <LogoMark />
            <span style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', letterSpacing: '-0.01em', lineHeight: 1 }}>
              Seppe Goossens
            </span>
          </div>
          {/* Micro-nav */}
          <nav className="flex items-center gap-4" aria-label="Primary navigation">
            <Link href="/projects" className="text-white/55 hover:text-white transition-colors" style={navLink} data-testid="link-projects">Projects</Link>
            <Link href="/creations" className="text-white/55 hover:text-white transition-colors" style={navLink} data-testid="link-music">Music</Link>
            <Link href="/creations" className="text-white/55 hover:text-white transition-colors" style={navLink} data-testid="link-visualizations">Visualizations</Link>
            <Link href="/creations" className="text-white/55 hover:text-white transition-colors" style={navLink} data-testid="link-blog">Blog</Link>
            <Link href="/cv" className="text-white/55 hover:text-white transition-colors" style={navLink} data-testid="link-about">About</Link>
          </nav>
        </div>

        {/* Right header — 3/5, empty */}
        <div style={{ width: '60%' }} />
      </div>

      {/* ═══════════════════════════════════════
          MAIN CONTENT — left col + right canvas
      ═══════════════════════════════════════ */}
      <div className="flex flex-grow overflow-hidden">

        {/* ── LEFT COLUMN: 2/5 ── */}
        <div
          className="flex flex-col flex-shrink-0"
          style={{ width: '40%', borderRight: '1px solid #fff' }}
          data-testid="col-left"
        >
          {/* Bio block */}
          <div className="px-8 pt-7 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
            <p style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.01em' }}>
              Student double-majoring in Urban Planning and Industrial
              Engineering at KU Leuven. Interested in the spatial logic of
              cities, systemic infrastructure flows, and the overlapping
              territories between urban design and industrial systems thinking.
            </p>
          </div>

          {/* Whereabouts / Whatabouts */}
          <div className="px-8 py-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="grid grid-cols-2 gap-6">
              {/* Whereabouts */}
              <div className="flex flex-col gap-2">
                <span className="text-white/40 uppercase" style={micro}>Whereabouts</span>
                <span style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.72rem', color: '#fff' }}>
                  Leuven, Belgium
                </span>
                <span style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>
                  KU Leuven
                </span>
              </div>
              {/* Whatabouts */}
              <div className="flex flex-col gap-2">
                <span className="text-white/40 uppercase" style={micro}>Whatabouts</span>
                <div className="flex flex-col gap-1">
                  <a
                    href="https://www.kuleuven.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                    style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}
                  >
                    kuleuven.be
                  </a>
                  <a
                    href="https://urbanplanning.kuleuven.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                    style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}
                  >
                    urbanplanning.be
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                    style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}
                  >
                    linkedin.com/in/seppe
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Contact + metadata — absolute bottom */}
          <div className="px-8 pt-5 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 uppercase" style={micro}>Contact</span>
              <a
                href="mailto:s.goossens@student.kuleuven.be"
                className="hover:text-accent transition-colors"
                style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.7rem', color: '#fff', letterSpacing: '0.01em' }}
                data-testid="contact-email"
              >
                s.goossens@student.kuleuven.be
              </a>
              {/* Horizontal link row */}
              <div className="flex items-center gap-5 pt-0.5">
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com', testId: 'contact-linkedin' },
                  { label: 'GitHub',   href: 'https://github.com',   testId: 'contact-github' },
                  { label: 'CV',       href: '/cv',                  testId: 'contact-cv', internal: true },
                ].map(({ label, href, testId, internal }) =>
                  internal ? (
                    <Link key={label} href={href} className="hover:text-accent transition-colors" style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }} data-testid={testId}>{label}</Link>
                  ) : (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }} data-testid={testId}>{label}</a>
                  )
                )}
              </div>
              {/* Copyright */}
              <p className="pt-1" style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.56rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em' }}>
                ©2025 SEPPE GOOSSENS — URBAN PLANNING × IND. ENG.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3/5 canvas ── */}
        <div
          className="flex-grow grid"
          style={{
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: '1fr 1fr 44%',
            gap: '1px',
            background: 'rgba(255,255,255,0.35)',
          }}
          data-testid="col-right"
        >
          {/* SELECTED WORKS — top-left 70% */}
          <Link
            href="/projects"
            className="col-span-7 flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors"
            style={{ background: '#000' }}
            data-testid="zone-projects"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div
              className="text-white group-hover:text-accent transition-colors"
              style={{ ...tileLabel, fontSize: 'clamp(1.5rem, 2.8vw, 2.6rem)' }}
            >
              Selected Works
            </div>
          </Link>

          {/* BLOG — top-right 30% */}
          <Link
            href="/creations"
            className="col-span-3 flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors"
            style={{ background: '#000' }}
            data-testid="zone-blog"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div
              className="text-white group-hover:text-accent transition-colors"
              style={{ ...tileLabel, fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)' }}
            >
              Blog
            </div>
          </Link>

          {/* MUSIC — middle-left 50% */}
          <Link
            href="/creations"
            className="col-span-5 flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors"
            style={{ background: '#000' }}
            data-testid="zone-music"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div
              className="text-white group-hover:text-accent transition-colors"
              style={{ ...tileLabel, fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)' }}
            >
              Music
            </div>
          </Link>

          {/* VISUALIZATIONS — middle-right 50% */}
          <Link
            href="/creations"
            className="col-span-5 flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors"
            style={{ background: '#000' }}
            data-testid="zone-visualizations"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div
              className="text-white group-hover:text-accent transition-colors"
              style={{ ...tileLabel, fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)' }}
            >
              Visualizations
            </div>
          </Link>

          {/* SVG ANIMATION — full-width bottom */}
          <div
            className="col-span-10 relative flex items-center justify-center overflow-hidden group"
            style={{ background: '#000' }}
            data-testid="zone-svg"
          >
            <span
              className="absolute bottom-4 left-5 z-10 select-none uppercase"
              style={{ ...micro, color: 'rgba(255,255,255,0.35)' }}
            >
              BE.INFRA — Diffused Urban Condition
            </span>
            <div className="absolute inset-0 flex items-center justify-center p-4 opacity-60 group-hover:opacity-90 transition-opacity">
              <BelgianInfraSVG />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM HORIZON LINE
      ═══════════════════════════════════════ */}
      <div className="flex-shrink-0 w-full" style={{ height: '1px', background: '#fff' }} />
    </div>
  );
}
