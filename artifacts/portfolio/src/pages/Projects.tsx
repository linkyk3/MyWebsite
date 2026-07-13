import { useState } from 'react';
import { Link } from 'wouter';
import { ThemeToggleInline } from '@/components/ThemeToggle';

/* ── Shared primitives ── */
const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor"
       strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
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

const INDENT = '2.5rem';
const BASE   = import.meta.env.BASE_URL;

/*
  IMAGE_W_PCT: image container takes this % of the row width.
  Text column always starts at IMAGE_W_PCT + gap → uniform left axis.
  object-fit: cover fills the box regardless of native aspect ratio.
*/
const IMAGE_W_PCT = 46; // %
const IMAGE_H_VH  = 64; // vh  →  ~1–1.5 rows visible at a time

/* ── Project data ─────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:    'p001',
    title: 'De buurtspoorwegen in Brabant',
    desc:  'Een historisch-morfologische lezing van het diffuse verstedelijkingsproces.',
    img:   'thesisboek.png',
    date:  '2024–2025',
  },
  {
    id:    'p002',
    title: 'Positive Energy Network',
    desc:  'Design Studio – Positive Energy Districts in Intermediate Territories: the Case of Pajottenland.',
    img:   'pen-network.png',
    date:  '2024–2025',
  },
  {
    id:    'p003',
    title: 'The Landscape as a Unifying Model?',
    desc:  'The Fietssnelwegen Network and the Friction Between Landscape Urbanism and Engineering.',
    img:   'lu-paper.png',
    date:  '2023–2024',
  },
  {
    id:    'p004',
    title: 'Ruimtelijk Ontwerp',
    desc:  'Masterplan Ossegem Station.',
    img:   'ruimtelijk-ontwerp.png',
    date:  '2024',
  },
  {
    id:    'p005',
    title: 'Excursion 2026 MILAN',
    desc:  'VUB MA STeR* – Video by Nette Sneyers and Seppe Goossens.',
    img:   'excursie.png',
    date:  '2026',
  },
  {
    id:    'p006',
    title: 'Methoden en Technieken: Ruimtelijke en Morfologische Analyse',
    desc:  'Mahatma Gandhi – Master Stedenbouw en Ruimtelijke Planning.',
    img:   'mt-rm.png',
    date:  '2024–2025',
  },
  {
    id:    'p007',
    title: 'Frictie tussen beleid en beleving',
    desc:  'Over parkeren en het ruimtelijke spanningsveld op de grens tussen Molenbeek en Koekelberg.',
    img:   'mt-sr.png',
    date:  '2024–2025',
  },
  {
    id:    'p008',
    title: 'Is Homeownership Reaching its Limits?',
    desc:  "A Historical and Contemporary Review of Path Dependency in Belgium's Housing Landscape.",
    img:   'housing-paper.png',
    date:  '2024',
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

  const dimStyle = (id: string): React.CSSProperties =>
    hoveredId !== null && hoveredId !== id
      ? { filter: 'blur(3px)', opacity: 0.12, transition: 'filter 0.25s ease, opacity 0.25s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' };

  const globalBlur: React.CSSProperties = hoveredId
    ? { filter: 'blur(4px)', opacity: 0.3, transition: 'filter 0.25s ease, opacity 0.25s ease' }
    : { filter: 'none',      opacity: 1,   transition: 'filter 0.25s ease, opacity 0.25s ease' };

  return (
    /* Centering shell */
    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', background: 'var(--background)' }}>
      {/* 4:3 column, naturally scrollable */}
      <div
        style={{
          width: '100%',
          maxWidth: 'calc(100vh * 4 / 3)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--background)',
          color: 'var(--foreground)',
          minHeight: '100vh',
        }}
        data-testid="projects-root"
      >

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <div
          style={{
            ...globalBlur,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: INDENT,
            paddingRight: INDENT,
            paddingTop: '1rem',
            paddingBottom: '1rem',
            flexShrink: 0,
          }}
        >
          {/* Name + logo flyout */}
          <div className="flex items-center gap-3">
            <Link href="/" style={f(500, '1.75rem', { letterSpacing: '-0.02em', lineHeight: 1, color: 'inherit', textDecoration: 'none' })}>
              Seppe Goossens
            </Link>
            <div className="relative group flex items-center"
                 style={{ lineHeight: 0, paddingRight: '320px', marginRight: '-320px' }}>
              <div className="hover:text-accent transition-colors" style={{ lineHeight: 0 }}>
                <LogoMark />
              </div>
              <nav
                aria-label="Primary navigation"
                className="absolute flex items-center gap-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150"
                style={{ left: '44px', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <Link key={label} href={href} className="text-foreground hover:text-accent transition-colors"
                        style={f(300, '1.15rem', { letterSpacing: '0.01em' })}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* "SELECTED WORKS" — outlined, right-aligned */}
          <div style={f(500, 'clamp(1.4rem, 3.2vh, 2.2rem)', {
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px var(--color-foreground)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          })}>
            Selected Works
          </div>
        </div>

        {/* ── UPPER HORIZON LINE ──────────────────────────────────────── */}
        <div className="flex-shrink-0 bg-foreground"
             style={{ height: '2px', marginLeft: INDENT, marginRight: INDENT, ...globalBlur }} />

        {/* ── PROJECT LIST ────────────────────────────────────────────── */}
        {/*
          No divider lines — vertical padding alone separates rows.
          Image column: fixed % width + fixed vh height → object-fit cover.
          Text column: always starts at the same x position (uniform axis).
          Both row halves receive dimStyle so the whole row dims together.
        */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: INDENT,
            paddingRight: INDENT,
            paddingBottom: '6vh',
          }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3.5rem',
                paddingTop: '5vh',
                paddingBottom: '5vh',
                ...dimStyle(p.id),
              }}
            >
              {/* ── Image ────────────────────────────────────────────── */}
              {/*
                Fixed % width + fixed vh height.  object-fit cover crops
                gracefully.  Box-shadow gives the physical print depth.
              */}
              <div
                style={{
                  flexShrink: 0,
                  width: `${IMAGE_W_PCT}%`,
                  height: `${IMAGE_H_VH}vh`,
                  overflow: 'hidden',
                  boxShadow: '0 6px 32px rgba(0,0,0,0.6), 0 1px 6px rgba(0,0,0,0.35)',
                }}
              >
                <img
                  src={`${BASE}works/${p.img}`}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>

              {/* ── Text — always starts at the same left axis ───────── */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={f(500, 'clamp(1rem, 2vh, 1.5rem)', {
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  marginBottom: '0.6rem',
                })}>
                  {p.title}
                </div>
                <div style={f(300, 'clamp(0.75rem, 1.5vh, 1rem)', {
                  opacity: 0.45,
                  lineHeight: 1.55,
                  letterSpacing: '0.004em',
                  marginBottom: '0.8rem',
                })}>
                  {p.desc}
                </div>
                <div style={f(300, 'clamp(0.65rem, 1.2vh, 0.85rem)', {
                  opacity: 0.28,
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                })}>
                  {p.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── LOWER HORIZON LINE ──────────────────────────────────────── */}
        <div className="flex-shrink-0 bg-foreground"
             style={{ height: '2px', marginLeft: INDENT, marginRight: INDENT, ...globalBlur }} />

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <div className="flex flex-shrink-0 items-center px-8 py-2.5" style={globalBlur}>
          <div style={{ marginLeft: 'auto', marginRight: '0.5rem' }}>
            <ThemeToggleInline />
          </div>
        </div>

      </div>
    </div>
  );
}
