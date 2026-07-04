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
const BASE = import.meta.env.BASE_URL; // e.g. "/portfolio/"

/* ── Project data (new order) ──
   Aspect ratios measured from source files:
     Portrait  thesisboek / LU_paper:       4157×5906  (ar 0.7039)
     Portrait  MT-SR / housing_paper:        4961×7016  (ar 0.7071)
     Landscape pen-network (tile):           4000×3000  (ar 1.3333)
     Landscape RuimtelijkOntwerp:            9921×7016  (ar 1.4141)
     Landscape MT-RM_Brochure:               5906×4157  (ar 1.4207)
     Landscape excursie (Screenshot 16:9):   2560×1440  (ar 1.7778)
*/
const PROJECTS = [
  {
    id: '001',
    title: 'De buurtspoorwegen in Brabant',
    desc:  'Een historisch-morfologische lezing van het diffuse verstedelijkingsproces.',
    img:   'thesisboek.png',
    ratio: '4157 / 5906',   // portrait
  },
  {
    id: '002',
    title: 'Positive Energy Network',
    desc:  'Design Studio – Positive Energy Districts in Intermediate Territories: the Case of Pajottenland.',
    img:   'pen-network.png',
    ratio: '4000 / 3000',   // landscape
  },
  {
    id: '003',
    title: 'The Landscape as a Unifying Model?',
    desc:  'The Fietssnelwegen Network and the Friction Between Landscape Urbanism and Engineering.',
    img:   'lu-paper.png',
    ratio: '4157 / 5906',   // portrait
  },
  {
    id: '004',
    title: 'Ruimtelijk Ontwerp',
    desc:  'Masterplan Ossegem Station.',
    img:   'ruimtelijk-ontwerp.png',
    ratio: '9921 / 7016',   // landscape
  },
  {
    id: '005',
    title: 'Excursion 2026 MILAN',
    desc:  'VUB MA STeR* – Video by Nette Sneyers and Seppe Goossens.',
    img:   'excursie.png',
    ratio: '2560 / 1440',   // landscape 16:9
  },
  {
    id: '006',
    title: 'Methoden en Technieken: Ruimtelijke en Morfologische Analyse',
    desc:  'Mahatma Gandhi – Master Stedenbouw en Ruimtelijke Planning 2024–2025.',
    img:   'mt-rm.png',
    ratio: '5906 / 4157',   // landscape
  },
  {
    id: '007',
    title: 'Frictie tussen beleid en beleving',
    desc:  'Over parkeren en het ruimtelijke spanningsveld op de grens tussen Molenbeek en Koekelberg (Sociaal-ruimtelijke analyse).',
    img:   'mt-sr.png',
    ratio: '4961 / 7016',   // portrait
  },
  {
    id: '008',
    title: 'Is Homeownership Reaching its Limits?',
    desc:  'A Historical and Contemporary Review of Path Dependency in Belgium\'s Housing Landscape.',
    img:   'housing-paper.png',
    ratio: '4961 / 7016',   // portrait
  },
] as const;

type Project = typeof PROJECTS[number];

const NAV_LINKS = [
  { label: 'Projects',       href: '/projects'  },
  { label: 'Music',          href: '/creations' },
  { label: 'Visualizations', href: '/creations' },
  { label: 'Blog',           href: '/creations' },
  { label: 'About',          href: '/cv'        },
];

/* ── Page ── */
export default function Projects() {
  // Set ONLY from text-list hover — never from tile hover
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /* ─── Blur helpers ───────────────────────────────────────────────────────
     keepSharpForIds: array of project IDs that stay unblurred.
     Everything else dims when any item is hovered.
  */
  const dimStyle = (keepSharpForIds: string[]): React.CSSProperties =>
    hoveredId !== null && !keepSharpForIds.includes(hoveredId)
      ? { filter: 'blur(3px)', opacity: 0.18, transition: 'filter 0.25s ease, opacity 0.25s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' };

  // Global blur: applied to site header, both horizon lines, footer
  const globalBlur: React.CSSProperties = hoveredId
    ? { filter: 'blur(4px)', transition: 'filter 0.25s ease' }
    : { filter: 'none',      transition: 'filter 0.25s ease' };

  /* ─── List divider helpers ───────────────────────────────────────────────
     topBorder:              sharp only when PROJECTS[0] is active
     divider between [i,i+1]: sharp when either neighbour is active
     bottomBorder:           sharp only when PROJECTS[n-1] is active
  */
  const borderStyle = (keepForIds: string[]) => ({
    ...dimStyle(keepForIds),
    height: '1px',
    background: 'currentColor',
    flexShrink: 0,
  });

  /* ─── Tile columns ───────────────────────────────────────────────────────
     Natural reading order: row-major left→right.
     Left col: indices 0,2,4,6  (001,003,005,007)
     Right col: indices 1,3,5,7 (002,004,006,008)
  */
  const leftTiles  = PROJECTS.filter((_, i) => i % 2 === 0);
  const rightTiles = PROJECTS.filter((_, i) => i % 2 === 1);

  const renderTile = (p: Project) => {
    const isActive = hoveredId === p.id;
    return (
      <div
        key={p.id}
        aria-label={p.title}
        style={{
          aspectRatio: p.ratio,
          border: '1px solid #FF0000',
          boxShadow: isActive ? '0 0 0 1px #FF0000, 0 8px 32px rgba(255,0,0,0.3)' : 'none',
          // Tiles passively dim — no mouse events on them
          ...dimStyle([p.id]),
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
    <div className="w-screen min-h-screen flex justify-center bg-background">
      <div
        className="min-h-screen flex flex-col bg-background text-foreground"
        style={{ width: '100%', maxWidth: 'calc(100vh * 4 / 3)' }}
        data-testid="projects-root"
      >

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
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
                  <Link key={label} href={href} className="text-foreground hover:text-accent transition-colors" style={f(300, '1.15rem', { letterSpacing: '0.01em' })}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div style={{ width: '60%' }} />
        </div>

        {/* ── UPPER HORIZON LINE ─ blurs on any hover ─────────────────────── */}
        <div
          className="flex-shrink-0 bg-foreground"
          style={{ height: '2px', marginLeft: TEXT_INDENT, marginRight: TEXT_INDENT, ...globalBlur }}
        />

        {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
        <div className="flex" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', alignItems: 'flex-start' }}>

          {/* ── LEFT — project text list (40%) ──────────────────────────── */}
          <div
            className="flex-shrink-0 flex flex-col"
            style={{ width: '40%', paddingLeft: TEXT_INDENT, paddingRight: '2.5rem' }}
          >
            {/*
              FRAMING BORDER ABOVE 001
              Sharp only when item 001 is active (its top line stays unblurred).
            */}
            <div style={borderStyle([PROJECTS[0].id])} />

            {PROJECTS.map((p, i) => (
              <div key={p.id}>
                {/*
                  ITEM — interactive hover target.
                  Only the item itself stays sharp; dimStyle([p.id]) handles that.
                  Padding creates the 4× larger between-item breathing room.
                  Text is vertically centred by equal top/bottom padding.
                */}
                <div
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(p.id)}
                  onBlur={() => setHoveredId(null)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setHoveredId(p.id); }}
                  style={{
                    ...dimStyle([p.id]),
                    paddingTop: '2.4rem',
                    paddingBottom: '2.4rem',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {/* Project number — flush left, dim, tight above title */}
                  <div style={f(300, '0.58rem', {
                    opacity: 0.35,
                    letterSpacing: '0.07em',
                    lineHeight: 1,
                    marginBottom: '0.15rem',
                  })}>
                    {p.id}
                  </div>

                  {/* Title — flush left, same margin as caption */}
                  <div style={f(500, '0.9rem', {
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    marginBottom: '0.12rem',
                  })}>
                    {p.title}
                  </div>

                  {/* Caption — flush left (NO indent), same left margin as title */}
                  <div style={f(300, '0.75rem', {
                    opacity: 0.45,
                    lineHeight: 1.45,
                    letterSpacing: '0.005em',
                  })}>
                    {p.desc}
                  </div>
                </div>

                {/*
                  DIVIDER after each item.
                  Between items i and i+1: stays sharp if either neighbour is active.
                  Final item (i = n-1): this is the FRAMING BORDER BELOW 008.
                */}
                {i < PROJECTS.length - 1 ? (
                  <div style={borderStyle([p.id, PROJECTS[i + 1].id])} />
                ) : (
                  /* Bottom framing border — sharp only when 008 is active */
                  <div style={borderStyle([p.id])} />
                )}
              </div>
            ))}
          </div>

          {/* ── RIGHT — image tile grid ──────────────────────────────────── */}
          {/*
            Two flex-col strips, tiles sized by native aspect-ratio.
            No mouse handlers — tiles are display-only; glow/dim responds
            passively to hoveredId set by the text list only.
          */}
          <div
            className="flex-grow"
            style={{ display: 'flex', gap: '3px', paddingRight: TEXT_INDENT }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {leftTiles.map(renderTile)}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {rightTiles.map(renderTile)}
            </div>
          </div>

        </div>

        {/* ── LOWER HORIZON LINE ─ blurs on any hover ─────────────────────── */}
        <div
          className="flex-shrink-0 bg-foreground"
          style={{ height: '2px', marginLeft: TEXT_INDENT, marginRight: TEXT_INDENT, ...globalBlur }}
        />

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
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
