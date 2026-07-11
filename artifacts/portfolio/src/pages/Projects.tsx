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

const INDENT = '2rem';
const BASE   = import.meta.env.BASE_URL;

/* ── Project data ──────────────────────────────────────────────────────────
   ratioN: numeric aspect-ratio (width÷height) used to compute card width.
   IMAGE HEIGHT is fixed at IMG_H vh; card width = IMG_H × ratioN.
*/
const IMG_H = 26; // vh — fixed image height for every card

const PROJECTS = [
  {
    id:     '001',
    title:  'De buurtspoorwegen in Brabant',
    desc:   'Een historisch-morfologische lezing van het diffuse verstedelijkingsproces.',
    img:    'thesisboek.png',
    ratio:  '4157 / 5906',
    ratioN: 4157 / 5906,   // ≈ 0.7039  portrait
  },
  {
    id:     '002',
    title:  'Positive Energy Network',
    desc:   'Design Studio – Positive Energy Districts in Intermediate Territories: the Case of Pajottenland.',
    img:    'pen-network.png',
    ratio:  '4000 / 3000',
    ratioN: 4000 / 3000,   // ≈ 1.3333  landscape
  },
  {
    id:     '003',
    title:  'The Landscape as a Unifying Model?',
    desc:   'The Fietssnelwegen Network and the Friction Between Landscape Urbanism and Engineering.',
    img:    'lu-paper.png',
    ratio:  '4157 / 5906',
    ratioN: 4157 / 5906,
  },
  {
    id:     '004',
    title:  'Ruimtelijk Ontwerp',
    desc:   'Masterplan Ossegem Station.',
    img:    'ruimtelijk-ontwerp.png',
    ratio:  '9921 / 7016',
    ratioN: 9921 / 7016,   // ≈ 1.4141
  },
  {
    id:     '005',
    title:  'Excursion 2026 MILAN',
    desc:   'VUB MA STeR* – Video by Nette Sneyers and Seppe Goossens.',
    img:    'excursie.png',
    ratio:  '2560 / 1440',
    ratioN: 2560 / 1440,   // ≈ 1.7778  16:9
  },
  {
    id:     '006',
    title:  'Methoden en Technieken: Ruimtelijke en Morfologische Analyse',
    desc:   'Mahatma Gandhi – Master Stedenbouw en Ruimtelijke Planning 2024–2025.',
    img:    'mt-rm.png',
    ratio:  '5906 / 4157',
    ratioN: 5906 / 4157,   // ≈ 1.4207
  },
  {
    id:     '007',
    title:  'Frictie tussen beleid en beleving',
    desc:   'Over parkeren en het ruimtelijke spanningsveld op de grens tussen Molenbeek en Koekelberg (Sociaal-ruimtelijke analyse).',
    img:    'mt-sr.png',
    ratio:  '4961 / 7016',
    ratioN: 4961 / 7016,   // ≈ 0.7071  portrait
  },
  {
    id:     '008',
    title:  'Is Homeownership Reaching its Limits?',
    desc:   "A Historical and Contemporary Review of Path Dependency in Belgium's Housing Landscape.",
    img:    'housing-paper.png',
    ratio:  '4961 / 7016',
    ratioN: 4961 / 7016,
  },
] as const;

const NAV_LINKS = [
  { label: 'Projects',       href: '/projects'  },
  { label: 'Music',          href: '/creations' },
  { label: 'Visualizations', href: '/creations' },
  { label: 'Blog',           href: '/creations' },
  { label: 'About',          href: '/cv'        },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /* dimStyle: everything blurs except the hovered card */
  const dimStyle = (id: string): React.CSSProperties =>
    hoveredId !== null && hoveredId !== id
      ? { filter: 'blur(3px)', opacity: 0.18, transition: 'filter 0.25s ease, opacity 0.25s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' };

  /* globalBlur: header, lines, footer blur on any hover */
  const globalBlur: React.CSSProperties = hoveredId
    ? { filter: 'blur(4px)', transition: 'filter 0.25s ease' }
    : { filter: 'none',      transition: 'filter 0.25s ease' };

  return (
    /* Outer centering shell — fixed to viewport */
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      background: 'var(--background)',
    }}>
      {/* 4:3 column */}
      <div
        style={{
          width: '100%',
          maxWidth: 'calc(100vh * 4 / 3)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
        data-testid="projects-root"
      >

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <div className="flex flex-shrink-0" style={globalBlur}>
          <div className="flex items-center gap-3 px-8 py-4">
            <Link
              href="/"
              style={f(500, '1.75rem', { letterSpacing: '-0.02em', lineHeight: 1, color: 'inherit', textDecoration: 'none' })}
            >
              Seppe Goossens
            </Link>

            {/* Logo flyout */}
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
        </div>

        {/* ── UPPER HORIZON LINE ──────────────────────────────────────── */}
        <div
          className="flex-shrink-0 bg-foreground"
          style={{ height: '2px', marginLeft: INDENT, marginRight: INDENT, ...globalBlur }}
        />

        {/* ── PAGE TITLE ──────────────────────────────────────────────── */}
        <div
          style={{
            ...globalBlur,
            flexShrink: 0,
            paddingLeft: INDENT,
            paddingTop: '1.4rem',
            paddingBottom: '1.2rem',
          }}
        >
          <div style={f(700, 'clamp(3.5rem, 8.5vh, 7rem)', {
            letterSpacing: '-0.03em',
            lineHeight: 1,
            textTransform: 'uppercase',
          })}>
            Selected Works
          </div>
        </div>

        {/* ── HORIZONTAL GALLERY ──────────────────────────────────────── */}
        {/*
          Each card has:
            • fixed width = IMG_H vh × ratioN  (matches the image's natural width at IMG_H height)
            • flex-col: text block on top, image on bottom
            • hover on either child activates the card
        */}
        <div
          style={{
            flex: 1,
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            paddingLeft: INDENT,
            paddingRight: INDENT,
            paddingBottom: 0,
            gap: 0,
            /* thin custom scrollbar */
            scrollbarWidth: 'thin',
            scrollbarColor: 'currentColor transparent',
          }}
        >
          {PROJECTS.map((p, i) => {
            const isActive = hoveredId === p.id;
            const cardW    = `calc(${IMG_H}vh * ${p.ratioN.toFixed(6)})`;
            const isLast   = i === PROJECTS.length - 1;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  flexShrink: 0,
                  width: cardW,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  /* right border divider between cards */
                  borderRight: isLast ? 'none' : '1px solid currentColor',
                  paddingRight: isLast ? 0 : '1.2rem',
                  paddingLeft: i === 0 ? 0 : '1.2rem',
                  ...dimStyle(p.id),
                }}
              >
                {/* ── Text block ───────────────────────────────────────── */}
                <div style={{ paddingBottom: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  {/* Number */}
                  <div style={f(300, '0.55rem', {
                    opacity: 0.38,
                    letterSpacing: '0.08em',
                    lineHeight: 1,
                    marginBottom: '0.45rem',
                  })}>
                    {p.id}
                  </div>

                  {/* Title */}
                  <div style={f(500, '0.82rem', {
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                    marginBottom: '0.35rem',
                  })}>
                    {p.title}
                  </div>

                  {/* Caption */}
                  <div style={f(300, '0.68rem', {
                    opacity: 0.42,
                    lineHeight: 1.45,
                    letterSpacing: '0.004em',
                  })}>
                    {p.desc}
                  </div>
                </div>

                {/* ── Image ────────────────────────────────────────────── */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '100%',
                    height: `${IMG_H}vh`,
                    overflow: 'hidden',
                    outline: isActive ? '1px solid #FF0000' : '1px solid transparent',
                    boxShadow: isActive ? '0 0 28px rgba(255,0,0,0.25)' : 'none',
                    transition: 'outline-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  <img
                    src={`${BASE}works/${p.img}`}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── LOWER HORIZON LINE ──────────────────────────────────────── */}
        <div
          className="flex-shrink-0 bg-foreground"
          style={{ height: '2px', marginLeft: INDENT, marginRight: INDENT, ...globalBlur }}
        />

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
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
