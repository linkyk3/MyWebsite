import { useState } from 'react';
import { Link } from 'wouter';
import { ThemeToggleInline } from '@/components/ThemeToggle';

/* ── Shared primitives ── */
const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <line x1="10" y1="1"   x2="10" y2="19" />
    <line x1="2"  y1="5.5" x2="18" y2="14.5" />
    <line x1="18" y1="5.5" x2="2"  y2="14.5" />
  </svg>
);

const f = (weight: number, size: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: "'ABC ROM'",
  fontWeight: weight,
  fontSize: size,
  ...extra,
});

const TEXT_INDENT = '2rem';

/* ── Project data ── */
const PROJECTS = [
  {
    id: '001',
    title: 'Transit Network Optimization',
    desc: 'Modelling multimodal transit in a mid-size city using graph theory and GIS.',
    bg: 'repeating-linear-gradient(45deg,  #0d0d0d 0px, #0d0d0d 18px, #111 18px, #111 19px)',
  },
  {
    id: '002',
    title: 'Zoning Reform Proposal',
    desc: 'Rezoning study for mixed-use corridors via urban policy and spatial analysis.',
    bg: 'repeating-linear-gradient(90deg,  #0a0a0a 0px, #0a0a0a 28px, #111 28px, #111 29px)',
  },
  {
    id: '003',
    title: 'Pedestrian Flow Simulation',
    desc: 'Agent-based simulation of pedestrian density in public spaces.',
    bg: 'repeating-linear-gradient(135deg, #0e0e0e 0px, #0e0e0e 18px, #131313 18px, #131313 19px)',
  },
  {
    id: '004',
    title: 'Supply Chain Resilience',
    desc: 'Risk mapping and mitigation for mid-tier manufacturing networks.',
    bg: 'repeating-linear-gradient(0deg,   #090909 0px, #090909 24px, #0f0f0f 24px, #0f0f0f 25px)',
  },
  {
    id: '005',
    title: 'Ergonomics Audit',
    desc: 'Workstation redesign study using RULA methodology and motion capture data.',
    bg: 'repeating-linear-gradient(60deg,  #0b0b0b 0px, #0b0b0b 18px, #121212 18px, #121212 19px)',
  },
  {
    id: '006',
    title: 'Production Scheduling',
    desc: 'Integer programming model for a job-shop scheduling problem with OR-Tools.',
    bg: 'repeating-linear-gradient(120deg, #0c0c0c 0px, #0c0c0c 22px, #111 22px, #111 23px)',
  },
] as const;

const NAV_LINKS = [
  { label: 'Projects',       href: '/projects'  },
  { label: 'Music',          href: '/creations' },
  { label: 'Visualizations', href: '/creations' },
  { label: 'Blog',           href: '/creations' },
  { label: 'About',          href: '/cv'        },
];

/* ── Page ── */
export default function Projects() {
  // hoveredId is set ONLY by text-list hover — never by tile hover
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // dim: applied to both list items and tiles passively
  const dim = (id: string): React.CSSProperties =>
    hoveredId !== null && hoveredId !== id
      ? { filter: 'blur(3px)', opacity: 0.18, transition: 'filter 0.25s ease, opacity 0.25s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' };

  // globalBlur: applied to header / lines / footer — only when text item is hovered
  const globalBlur: React.CSSProperties = hoveredId
    ? { filter: 'blur(4px)', transition: 'filter 0.25s ease' }
    : { filter: 'none',      transition: 'filter 0.25s ease' };

  return (
    <div className="w-screen h-screen flex justify-center bg-background overflow-hidden">
      <div
        className="h-full flex flex-col overflow-hidden bg-background text-foreground"
        style={{ width: '100%', maxWidth: 'calc(100vh * 4 / 3)' }}
        data-testid="projects-root"
      >

        {/* ── HEADER ── */}
        <div className="flex flex-shrink-0" style={globalBlur}>
          <div className="flex items-center gap-3 px-8 py-4" style={{ width: '40%' }}>
            <Link href="/" style={f(500, '1.75rem', { letterSpacing: '-0.02em', lineHeight: 1, color: 'inherit', textDecoration: 'none' })}>
              Seppe Goossens
            </Link>

            <div
              className="relative group flex items-center"
              style={{ lineHeight: 0, paddingRight: '320px', marginRight: '-320px' }}
            >
              <div className="hover:text-accent transition-colors" style={{ lineHeight: 0 }}>
                <LogoMark />
              </div>
              <nav
                aria-label="Primary navigation"
                className="absolute flex items-center gap-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150"
                style={{ left: '44px', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-foreground hover:text-accent transition-colors"
                    style={f(300, '1.15rem', { letterSpacing: '0.01em' })}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div style={{ width: '60%' }} />
        </div>

        {/* ── UPPER LINE ── */}
        <div
          className="flex-shrink-0 bg-foreground"
          style={{ height: '2px', marginLeft: TEXT_INDENT, marginRight: TEXT_INDENT, ...globalBlur }}
        />

        {/* ── MAIN CONTENT ── */}
        {/*
          Vertical breathing room: paddingTop / paddingBottom push content
          away from both horizon lines. The tile grid is given a fixed width
          (~46%) so it sits inset from the right edge, leaving deliberate
          whitespace at far right.
        */}
        <div
          className="flex flex-grow overflow-hidden"
          style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}
        >

          {/* LEFT — project text list
              paddingRight creates the gap between list/dividers and the tile grid.
              Dividers stop before the grid because they're constrained by this column width.
          */}
          <div
            className="flex flex-col flex-shrink-0 overflow-y-auto"
            style={{ width: '40%', paddingLeft: TEXT_INDENT, paddingRight: '2.5rem' }}
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(p.id)}
                onBlur={() => setHoveredId(null)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setHoveredId(p.id); }}
                style={{
                  ...dim(p.id),
                  // Tight vertical rhythm — compact but breathable
                  padding: '0.6rem 0',
                  borderBottom: i < PROJECTS.length - 1 ? '1px solid currentColor' : 'none',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {/* Project number + title on one row */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.55rem', marginBottom: '0.2rem' }}>
                  <span style={f(300, '0.62rem', {
                    opacity: 0.38,
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                    lineHeight: 1,
                  })}>
                    {p.id}
                  </span>
                  <span style={f(500, '0.9rem', { letterSpacing: '-0.01em', lineHeight: 1.25 })}>
                    {p.title}
                  </span>
                </div>
                {/* Description */}
                <div style={f(300, '0.75rem', {
                  opacity: 0.45,
                  lineHeight: 1.5,
                  letterSpacing: '0.005em',
                  paddingLeft: '1.35rem', // indent to align under title (past the number)
                })}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — image tile grid
              Fixed width (~46% of the 4:3 box) leaves deliberate right-side whitespace.
              No mouse handlers — tiles are display-only; glow/dim responds
              passively to hoveredId set by the text list.
          */}
          <div
            style={{
              flexShrink: 0,
              width: '46%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '3px',
            }}
          >
            {PROJECTS.map((p) => {
              const isActive = hoveredId === p.id;
              return (
                <div
                  key={p.id}
                  aria-label={p.title}
                  style={{
                    background: p.bg,
                    border: '1px solid #FF0000',
                    boxShadow: isActive
                      ? '0 0 0 1px #FF0000, 0 8px 32px rgba(255,0,0,0.3)'
                      : 'none',
                    // Tiles dim passively but never trigger blur themselves
                    ...dim(p.id),
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                />
              );
            })}
          </div>

        </div>

        {/* ── LOWER LINE ── */}
        <div
          className="flex-shrink-0 bg-foreground"
          style={{ height: '2px', marginLeft: TEXT_INDENT, marginRight: TEXT_INDENT, ...globalBlur }}
        />

        {/* ── FOOTER ── */}
        <div
          className="flex flex-shrink-0 items-center px-8 py-2.5"
          style={globalBlur}
        >
          <div style={{ marginLeft: 'auto', marginRight: '0.5rem' }}>
            <ThemeToggleInline />
          </div>
        </div>

      </div>
    </div>
  );
}
