import { Link } from 'wouter';

const LogoMark = () => (
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="1" y="1" width="5" height="5" />
    <rect x="8" y="1" width="5" height="5" />
    <rect x="1" y="8" width="5" height="5" />
    <rect x="8" y="8" width="5" height="5" />
  </svg>
);

const f = (weight: number, size: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: "'ABC ROM'",
  fontWeight: weight,
  fontSize: size,
  ...extra,
});

const tileLabel: React.CSSProperties = {
  fontFamily: "'ABC ROM'",
  fontWeight: 500,
  letterSpacing: '-0.01em',
  lineHeight: 1,
};

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-background text-foreground" data-testid="home-root">

      {/* ══════════════════════════════════════
          HEADER — above upper horizon line
          Name on row 1, logo + nav on row 2
      ══════════════════════════════════════ */}
      <div className="flex flex-shrink-0 border-b border-foreground">
        <div className="flex flex-col gap-1 px-8 py-3" style={{ width: '40%' }}>
          {/* Row 1: Name */}
          <span style={f(500, 'clamp(0.78rem, 1.2vw, 0.9rem)', { letterSpacing: '-0.01em', lineHeight: 1 })}>
            Seppe Goossens
          </span>
          {/* Row 2: logo mark + nav links */}
          <nav className="flex items-center gap-3" aria-label="Primary navigation">
            <LogoMark />
            {[
              { label: 'Projects',       href: '/projects'  },
              { label: 'Music',          href: '/creations' },
              { label: 'Visualizations', href: '/creations' },
              { label: 'Blog',           href: '/creations' },
              { label: 'About',          href: '/cv'        },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-foreground/50 hover:text-foreground transition-colors"
                style={f(300, '0.62rem', { letterSpacing: '0.02em' })}
                data-testid={`link-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ width: '60%' }} />
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="flex flex-grow overflow-hidden">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col border-r border-foreground" style={{ width: '40%' }} data-testid="col-left">

          {/* Bio */}
          <div className="px-8 pt-6 pb-4">
            <p className="text-foreground/65" style={f(350, '0.68rem', { lineHeight: 1.6, letterSpacing: '0.005em' })}>
              Student double-majoring in Urban Planning and Industrial
              Engineering at KU Leuven. Interested in the spatial logic of
              cities, systemic infrastructure flows, and the overlapping
              territories between urban design and industrial systems thinking.
            </p>
          </div>

          <div className="flex-grow" />

          {/* Contact label — sits just above the lower horizon line */}
          <div className="px-8 pb-3">
            <span className="text-foreground/50" style={f(300, '0.62rem', { letterSpacing: '0.06em' })}>
              Contact
            </span>
          </div>
        </div>

        {/* ── RIGHT COLUMN: tiles ── */}
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

          {/* BLANK — bottom row */}
          <div className="col-span-10 bg-background" data-testid="zone-blank" />
        </div>
      </div>

      {/* ══════════════════════════════════════
          LOWER HORIZON LINE
      ══════════════════════════════════════ */}
      <div className="flex-shrink-0 w-full h-px bg-foreground" />

      {/* ══════════════════════════════════════
          FOOTER — email + links below lower line
      ══════════════════════════════════════ */}
      <div className="flex flex-shrink-0 px-8 py-2.5 gap-6 items-center">
        <a
          href="mailto:s.goossens@student.kuleuven.be"
          className="text-foreground/70 hover:text-accent transition-colors"
          style={f(350, '0.68rem', { letterSpacing: '0.01em' })}
          data-testid="contact-email"
        >
          s.goossens@student.kuleuven.be
        </a>
        {[
          { label: 'LinkedIn', href: 'https://linkedin.com', testId: 'contact-linkedin', internal: false },
          { label: 'GitHub',   href: 'https://github.com',   testId: 'contact-github',   internal: false },
          { label: 'CV',       href: '/cv',                  testId: 'contact-cv',        internal: true  },
        ].map(({ label, href, testId, internal }) =>
          internal
            ? <Link key={label} href={href} className="text-foreground/50 hover:text-accent transition-colors" style={f(300, '0.68rem')} data-testid={testId}>{label}</Link>
            : <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-accent transition-colors" style={f(300, '0.68rem')} data-testid={testId}>{label}</a>
        )}
      </div>

    </div>
  );
}
