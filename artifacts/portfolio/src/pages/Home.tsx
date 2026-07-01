import { Link } from 'wouter';

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

const navLinkStyle: React.CSSProperties = {
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

const bodyText: React.CSSProperties = {
  fontFamily: "'ABC ROM'",
  fontWeight: 350,
  fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
  lineHeight: 1.65,
  letterSpacing: '0.01em',
};

const smallText: React.CSSProperties = {
  fontFamily: "'ABC ROM'",
  fontWeight: 300,
  fontSize: '0.68rem',
};

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-background text-foreground" data-testid="home-root">

      {/* ═══ HEADER ROW ═══ */}
      <div className="flex flex-shrink-0 border-b border-foreground">
        {/* Left header — 2/5 */}
        <div className="flex flex-col justify-center gap-1.5 px-8 py-4 border-r border-foreground/20" style={{ width: '40%' }}>
          <div className="flex items-center gap-2">
            <LogoMark />
            <span style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', letterSpacing: '-0.01em', lineHeight: 1 }}>
              Seppe Goossens
            </span>
          </div>
          <nav className="flex items-center gap-4" aria-label="Primary navigation">
            {[
              { label: 'Projects',       href: '/projects'   },
              { label: 'Music',          href: '/creations'  },
              { label: 'Visualizations', href: '/creations'  },
              { label: 'Blog',           href: '/creations'  },
              { label: 'About',          href: '/cv'         },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-foreground/50 hover:text-foreground transition-colors" style={navLinkStyle} data-testid={`link-${label.toLowerCase()}`}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Right header — 3/5, empty */}
        <div style={{ width: '60%' }} />
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex flex-grow overflow-hidden">

        {/* ── LEFT COLUMN: 2/5 ── */}
        <div className="flex flex-col flex-shrink-0 border-r border-foreground" style={{ width: '40%' }} data-testid="col-left">

          {/* Bio */}
          <div className="px-8 pt-7 pb-6 border-b border-foreground/15">
            <p className="text-foreground/65" style={bodyText}>
              Student double-majoring in Urban Planning and Industrial
              Engineering at KU Leuven. Interested in the spatial logic of
              cities, systemic infrastructure flows, and the overlapping
              territories between urban design and industrial systems thinking.
            </p>
          </div>

          {/* Whereabouts / Whatabouts */}
          <div className="px-8 py-7 border-b border-foreground/15">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-foreground/40 uppercase" style={micro}>Whereabouts</span>
                <span className="text-foreground" style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.72rem' }}>Leuven, Belgium</span>
                <span className="text-foreground/55" style={smallText}>KU Leuven</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-foreground/40 uppercase" style={micro}>Whatabouts</span>
                {[
                  { label: 'kuleuven.be',       href: 'https://www.kuleuven.be' },
                  { label: 'urbanplanning.be',  href: 'https://urbanplanning.kuleuven.be' },
                  { label: 'linkedin.com/in/seppe', href: 'https://linkedin.com' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-foreground/65 hover:text-accent transition-colors"
                    style={smallText}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-grow" />

          {/* Contact — pinned to bottom */}
          <div className="px-8 pt-5 pb-6 border-t border-foreground/15">
            <div className="flex flex-col gap-2">
              <span className="text-foreground/40 uppercase" style={micro}>Contact</span>
              <a href="mailto:s.goossens@student.kuleuven.be"
                className="text-foreground hover:text-accent transition-colors"
                style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.7rem', letterSpacing: '0.01em' }}
                data-testid="contact-email">
                s.goossens@student.kuleuven.be
              </a>
              <div className="flex items-center gap-5 pt-0.5">
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com', testId: 'contact-linkedin', internal: false },
                  { label: 'GitHub',   href: 'https://github.com',   testId: 'contact-github',   internal: false },
                  { label: 'CV',       href: '/cv',                  testId: 'contact-cv',        internal: true  },
                ].map(({ label, href, testId, internal }) =>
                  internal
                    ? <Link key={label} href={href} className="text-foreground/50 hover:text-accent transition-colors" style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.04em' }} data-testid={testId}>{label}</Link>
                    : <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-accent transition-colors" style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.04em' }} data-testid={testId}>{label}</a>
                )}
              </div>
              <p className="text-foreground/22 pt-1" style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.56rem', letterSpacing: '0.08em' }}>
                ©2025 SEPPE GOOSSENS — URBAN PLANNING × IND. ENG.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3/5 canvas ── */}
        <div
          className="flex-grow grid bg-foreground"
          style={{ gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: '1fr 1fr 44%', gap: '1px' }}
          data-testid="col-right"
        >
          {/* SELECTED WORKS — top-left 70% */}
          <Link href="/projects"
            className="col-span-7 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors hover:bg-foreground/5"
            data-testid="zone-projects">
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="text-foreground group-hover:text-accent transition-colors" style={{ ...tileLabel, fontSize: 'clamp(1.5rem, 2.8vw, 2.6rem)' }}>
              Selected Works
            </div>
          </Link>

          {/* BLOG — top-right 30% */}
          <Link href="/creations"
            className="col-span-3 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors hover:bg-foreground/5"
            data-testid="zone-blog">
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="text-foreground group-hover:text-accent transition-colors" style={{ ...tileLabel, fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)' }}>
              Blog
            </div>
          </Link>

          {/* MUSIC — middle-left 50% */}
          <Link href="/creations"
            className="col-span-5 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors hover:bg-foreground/5"
            data-testid="zone-music">
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="text-foreground group-hover:text-accent transition-colors" style={{ ...tileLabel, fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)' }}>
              Music
            </div>
          </Link>

          {/* VISUALIZATIONS — middle-right 50% */}
          <Link href="/creations"
            className="col-span-5 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer transition-colors hover:bg-foreground/5"
            data-testid="zone-visualizations">
            <div className="absolute top-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="text-foreground group-hover:text-accent transition-colors" style={{ ...tileLabel, fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)' }}>
              Visualizations
            </div>
          </Link>

          {/* BLANK SPACE — bottom row */}
          <div className="col-span-10 bg-background" data-testid="zone-blank" />

        </div>
      </div>

      {/* ═══ BOTTOM HORIZON LINE ═══ */}
      <div className="flex-shrink-0 w-full h-px bg-foreground" />
    </div>
  );
}
