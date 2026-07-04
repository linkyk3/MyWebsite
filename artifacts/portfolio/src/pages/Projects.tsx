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

// Portrait tiles: 4157×5906 → aspect-ratio ≈ 4157/5906
// Landscape tiles: 4000×3000 → aspect-ratio = 4/3
const PORTRAIT  = '4157 / 5906' as const;
const LANDSCAPE = '4000 / 3000' as const;

/* ── Project data ──
   Even indices (0,2,4,6) → left tile column
   Odd  indices (1,3,5,7) → right tile column
   Column heights balance: 2× portrait + 2× landscape on each side.
*/
const PROJECTS = [
  {
    id: '001',
    title: 'De buurtspoorwegen in Brabant',
    desc: 'Een historisch-morfologische lezing van het diffuse verstedelijkingsproces.',
    img: 'thesisboek.png',
    ratio: PORTRAIT,
  },
  {
    id: '002',
    title: 'Positive Energy Network',
    desc: 'Design Studio – Positive Energy Districts in Intermediate Territories: the Case of Pajottenland.',
    img: 'pen-network.png',
    ratio: LANDSCAPE,
  },
  {
    id: '003',
    title: 'Is Homeownership Reaching its Limits?',
    desc: 'A Historical and Contemporary Review of Path Dependency in Belgium\'s Housing Landscape.',
    img: 'housing-paper.png',
    ratio: PORTRAIT,
  },
  {
    id: '004',
    title: 'The Landscape as a Unifying Model?',
    desc: 'The Fietssnelwegen Network and the Friction Between Landscape Urbanism and Engineering.',
    img: 'lu-paper.png',
    ratio: PORTRAIT,
  },
  {
    id: '005',
    title: 'Methoden en Technieken: Ruimtelijke en Morfologische Analyse',
    desc: 'Mahatma Gandhi – Master Stedenbouw en Ruimtelijke Planning 2024–2025.',
    img: 'mt-rm.png',
    ratio: LANDSCAPE,
  },
  {
    id: '006',
    title: 'Frictie tussen beleid en beleving',
    desc: 'Over parkeren en het ruimtelijke spanningsveld op de grens tussen Molenbeek en Koekelberg.',
    img: 'mt-sr.png',
    ratio: PORTRAIT,
  },
  {
    id: '007',
    title: 'Ruimtelijk Ontwerp',
    desc: 'Masterplan Ossegem Station.',
    img: 'ruimtelijk-ontwerp.png',
    ratio: LANDSCAPE,
  },
  {
    id: '008',
    title: 'Excursion 2026 MILAN',
    desc: 'VUB MA STeR* – Video by Nette Sneyers and Seppe Goossens.',
    img: 'excursie.png',
    ratio: LANDSCAPE,
  },
] as const;

const NAV_LINKS = [
  { label: 'Projects',       href: '/projects'  },
  { label: 'Music',          href: '/creations' },
  { label: 'Visualizations', href: '/creations' },
  { label: 'Blog',           href: '/creations' },
  { label: 'About',          href: '/cv'        },
];

const BASE = import.meta.env.BASE_URL; // e.g. "/portfolio/"

/* ── Page ── */
export default function Projects() {
  // hoveredId is set ONLY by text-list hover — never by tile hover
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const dim = (id: string): React.CSSProperties =>
    hoveredId !== null && hoveredId !== id
      ? { filter: 'blur(3px)', opacity: 0.18, transition: 'filter 0.25s ease, opacity 0.25s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' };

  const globalBlur: React.CSSProperties = hoveredId
    ? { filter: 'blur(4px)', transition: 'filter 0.25s ease' }
    : { filter: 'none',      transition: 'filter 0.25s ease' };

  // Split into two tile columns keeping heights balanced
  const leftTiles  = PROJECTS.filter((_, i) => i % 2 === 0); // 001, 003, 005, 007
  const rightTiles = PROJECTS.filter((_, i) => i % 2 === 1); // 002, 004, 006, 008

  const renderTile = (p: typeof PROJECTS[number]) => {
    const isActive = hoveredId === p.id;
    return (
      <div
        key={p.id}
        aria-label={p.title}
        style={{
          aspectRatio: p.ratio,
          border: '1px solid #FF0000',
          boxShadow: isActive ? '0 0 0 1px #FF0000, 0 8px 32px rgba(255,0,0,0.3)' : 'none',
          ...dim(p.id),
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={`${BASE}works/${p.img}`}
          alt={p.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    /*
      min-h-screen (not h-screen) so the page grows with content and scrolls
      naturally. The 4:3 max-width is kept as a layout constraint only.
    */
    <div className="w-screen min-h-screen flex justify-center bg-background">
      <div
        className="min-h-screen flex flex-col bg-background text-foreground"
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

        {/* ── MAIN CONTENT ──
            Both columns grow with their natural content height.
            The page scrolls if total height exceeds viewport.
        */}
        <div className="flex" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', alignItems: 'flex-start' }}>

          {/* LEFT — project text list (40%) */}
          <div
            className="flex-shrink-0"
            style={{ width: '40%', paddingLeft: TEXT_INDENT, paddingRight: '2.5rem' }}
          >
            {/*
              List wrapper: top and bottom borders frame the full list.
              Internal dividers sit between items.
            */}
            <div style={{ borderTop: '1px solid currentColor', borderBottom: '1px solid currentColor' }}>
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
                    padding: '0.6rem 0',
                    borderBottom: i < PROJECTS.length - 1 ? '1px solid currentColor' : 'none',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {/* Number + title on one row */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.55rem', marginBottom: '0.2rem' }}>
                    <span style={f(300, '0.62rem', { opacity: 0.38, letterSpacing: '0.06em', flexShrink: 0, lineHeight: 1 })}>
                      {p.id}
                    </span>
                    <span style={f(500, '0.9rem', { letterSpacing: '-0.01em', lineHeight: 1.25 })}>
                      {p.title}
                    </span>
                  </div>
                  {/* Description, indented past the number */}
                  <div style={f(300, '0.75rem', { opacity: 0.45, lineHeight: 1.5, letterSpacing: '0.005em', paddingLeft: '1.35rem' })}>
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — tile grid (flex-grow)
              Two independent flex-col strips.
              Even projects → left strip; odd → right strip.
              Each image is displayed in a container with aspect-ratio matching
              the source file dimensions — no cropping or distortion.
          */}
          <div
            className="flex-grow"
            style={{ display: 'flex', gap: '3px', paddingRight: TEXT_INDENT }}
          >
            {/* Left tile strip: 001, 003, 005, 007 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {leftTiles.map(renderTile)}
            </div>
            {/* Right tile strip: 002, 004, 006, 008 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {rightTiles.map(renderTile)}
            </div>
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
