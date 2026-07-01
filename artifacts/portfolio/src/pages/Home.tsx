import { Link } from 'wouter';
import { ThemeToggleInline } from '@/components/ThemeToggle';

/* Six-pointed asterisk mark */
const LogoMark = () => (
  <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <line x1="10" y1="1"   x2="10" y2="19"  />
    <line x1="2"  y1="5.5" x2="18" y2="14.5"/>
    <line x1="18" y1="5.5" x2="2"  y2="14.5"/>
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

// Left-side text starts at px-8 = 2rem from left edge
const TEXT_INDENT = '2rem';

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-background text-foreground" data-testid="home-root">

      {/* ══════════════════════════════════════
          HEADER — name + logo/nav above upper line
      ══════════════════════════════════════ */}
      <div className="flex flex-shrink-0">
        <div className="flex items-center gap-3 px-8 py-3" style={{ width: '40%' }}>
          {/* Name */}
          <span style={f(500, '1.4rem', { letterSpacing: '-0.02em', lineHeight: 1 })}>
            Seppe Goossens
          </span>

          {/* Logo + nav — group has extended right hit-area so mouse can slide into links */}
          <div
            className="relative group flex items-center"
            style={{ lineHeight: 0, paddingRight: '320px', marginRight: '-320px' }}
          >
            <div className="opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all" style={{ lineHeight: 0 }}>
              <LogoMark />
            </div>

            <nav
              aria-label="Primary navigation"
              className="absolute flex items-center gap-4
                         opacity-0 pointer-events-none
                         group-hover:opacity-100 group-hover:pointer-events-auto
                         transition-opacity duration-150"
              style={{ left: '36px', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}
            >
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
                  className="text-foreground/50 group-hover:text-accent hover:text-accent transition-colors"
                  style={f(300, '1rem', { letterSpacing: '0.01em' })}
                  data-testid={`link-${label.toLowerCase()}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div style={{ width: '60%' }} />
      </div>

      {/* UPPER HORIZON LINE — 2px, inset left & right */}
      <div className="flex-shrink-0 bg-foreground" style={{ height: '2px', marginLeft: TEXT_INDENT, marginRight: TEXT_INDENT }} />

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="flex flex-grow overflow-hidden">

        {/* LEFT COLUMN */}
        <div className="flex flex-col" style={{ width: '40%' }} data-testid="col-left">

          {/* Bio */}
          <div className="px-8 pt-5 pb-4">
            <p className="text-foreground/65" style={f(350, '1rem', { lineHeight: 1.6, letterSpacing: '0.005em' })}>
              Student double-majoring in Urban Planning and Industrial
              Engineering at KU Leuven. Interested in the spatial logic of
              cities, systemic infrastructure flows, and the overlapping
              territories between urban design and industrial systems thinking.
            </p>
          </div>

          <div className="flex-grow" />

        </div>

        {/* RIGHT COLUMN: tiles — outer carries the right margin, inner is the grid */}
        <div
          className="flex-grow overflow-hidden bg-background"
          style={{ paddingRight: TEXT_INDENT }}
          data-testid="col-right"
        >
        <div
          className="grid bg-foreground h-full border-x border-foreground"
          style={{ gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: '1fr 1fr 44%', gap: '1px' }}
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
      </div>

      {/* LOWER HORIZON LINE — 2px, inset left & right */}
      <div className="flex-shrink-0 bg-foreground" style={{ height: '2px', marginLeft: TEXT_INDENT, marginRight: TEXT_INDENT }} />

      {/* FOOTER — email + links + theme toggle */}
      <div className="flex flex-shrink-0 items-center gap-5 px-8 py-2.5">
        <a
          href="mailto:s.goossens@student.kuleuven.be"
          className="text-foreground/70 hover:text-accent transition-colors"
          style={f(350, '1rem', { letterSpacing: '0.01em' })}
          data-testid="contact-email"
        >
          s.goossens@student.kuleuven.be
        </a>
        {[
          { label: 'LinkedIn', href: 'https://linkedin.com', testId: 'contact-linkedin', internal: false },
          { label: 'CV',       href: '/cv',                  testId: 'contact-cv',        internal: true  },
        ].map(({ label, href, testId, internal }) =>
          internal
            ? <Link key={label} href={href} className="text-foreground/50 hover:text-accent transition-colors" style={f(300, '1rem')} data-testid={testId}>{label}</Link>
            : <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-accent transition-colors" style={f(300, '1rem')} data-testid={testId}>{label}</a>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggleInline />
        </div>
      </div>

    </div>
  );
}
