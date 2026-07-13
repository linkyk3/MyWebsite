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

const INDENT = '2rem';
const BASE   = import.meta.env.BASE_URL;

/* ── Project data ─────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:    'p001',
    title: 'De buurtspoorwegen in Brabant',
    desc:  'Een historisch-morfologische lezing van het diffuse verstedelijkingsproces.',
    img:   'thesisboek.png',
    ratio: '4157 / 5906',
    date:  '2024–2025',
  },
  {
    id:    'p002',
    title: 'Positive Energy Network',
    desc:  'Design Studio – Positive Energy Districts in Intermediate Territories: the Case of Pajottenland.',
    img:   'pen-network.png',
    ratio: '4000 / 3000',
    date:  '2024–2025',
  },
  {
    id:    'p003',
    title: 'The Landscape as a Unifying Model?',
    desc:  'The Fietssnelwegen Network and the Friction Between Landscape Urbanism and Engineering.',
    img:   'lu-paper.png',
    ratio: '4157 / 5906',
    date:  '2023–2024',
  },
  {
    id:    'p004',
    title: 'Ruimtelijk Ontwerp',
    desc:  'Masterplan Ossegem Station.',
    img:   'ruimtelijk-ontwerp.png',
    ratio: '9921 / 7016',
    date:  '2024',
  },
  {
    id:    'p005',
    title: 'Excursion 2026 MILAN',
    desc:  'VUB MA STeR* – Video by Nette Sneyers and Seppe Goossens.',
    img:   'excursie.png',
    ratio: '2560 / 1440',
    date:  '2026',
  },
  {
    id:    'p006',
    title: 'Methoden en Technieken: Ruimtelijke en Morfologische Analyse',
    desc:  'Mahatma Gandhi – Master Stedenbouw en Ruimtelijke Planning.',
    img:   'mt-rm.png',
    ratio: '5906 / 4157',
    date:  '2024–2025',
  },
  {
    id:    'p007',
    title: 'Frictie tussen beleid en beleving',
    desc:  'Over parkeren en het ruimtelijke spanningsveld op de grens tussen Molenbeek en Koekelberg.',
    img:   'mt-sr.png',
    ratio: '4961 / 7016',
    date:  '2024–2025',
  },
  {
    id:    'p008',
    title: 'Is Homeownership Reaching its Limits?',
    desc:  "A Historical and Contemporary Review of Path Dependency in Belgium's Housing Landscape.",
    img:   'housing-paper.png',
    ratio: '4961 / 7016',
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

/* ── Fixed image height (px).  Width is driven by aspect-ratio per card. ── */
const IMG_H = 140; // px

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /* dimStyle — called with the row's own id */
  const dimStyle = (id: string): React.CSSProperties =>
    hoveredId !== null && hoveredId !== id
      ? { filter: 'blur(3px)', opacity: 0.14, transition: 'filter 0.25s ease, opacity 0.25s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' };

  /* globalBlur — header, lines, footer */
  const globalBlur: React.CSSProperties = hoveredId
    ? { filter: 'blur(4px)', opacity: 0.35, transition: 'filter 0.25s ease, opacity 0.25s ease' }
    : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' };

  /* borderStyle — for divider lines between rows */
  const borderStyle = (keepForIds: string[]) => ({
    ...(hoveredId !== null && !keepForIds.includes(hoveredId)
      ? { filter: 'blur(3px)', opacity: 0.14, transition: 'filter 0.25s ease, opacity 0.25s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.25s ease, opacity 0.25s ease' }),
    height: '1px',
    background: 'currentColor',
    flexShrink: 0 as const,
  });

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
        {/*
          Left: name + logo flyout (same as always).
          Right: "SELECTED WORKS" in outlined text — mirrors the
          homepage typographic nav style (transparent fill, stroke outline).
        */}
        <div
          className="flex items-center flex-shrink-0"
          style={{ ...globalBlur, justifyContent: 'space-between', paddingLeft: INDENT, paddingRight: INDENT, paddingTop: '1rem', paddingBottom: '1rem' }}
        >
          {/* Name + logo */}
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

          {/* "SELECTED WORKS" — outlined, right side of header.
              Use CSS var for stroke so it works in both light + dark mode.
              color:transparent + WebkitTextStroke with an explicit var() avoids
              the currentColor-is-transparent trap. */}
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
          One row per project.
          Left: image (fixed height IMG_H px, width from aspect-ratio).
          Right: title, description, date.
          Divider lines between rows get their own dimStyle so the
          active row's top and bottom lines stay crisp (mirrors previous logic).
        */}
        <div
          className="flex flex-col flex-grow"
          style={{ paddingLeft: INDENT, paddingRight: INDENT }}
        >
          {/* Framing border above first row */}
          <div style={borderStyle([PROJECTS[0].id])} />

          {PROJECTS.map((p, i) => (
            <div key={p.id}>
              {/* ── Row ────────────────────────────────────────────────── */}
              <div
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3rem',
                  paddingTop: '1.6rem',
                  paddingBottom: '1.6rem',
                  cursor: 'default',
                  ...dimStyle(p.id),
                }}
              >
                {/* Image — fixed height, width from aspect-ratio */}
                <div
                  style={{
                    flexShrink: 0,
                    height: `${IMG_H}px`,
                    aspectRatio: p.ratio,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`${BASE}works/${p.img}`}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>

                {/* Text block */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={f(500, '1rem', { letterSpacing: '-0.015em', lineHeight: 1.3, marginBottom: '0.3rem' })}>
                    {p.title}
                  </div>
                  <div style={f(300, '0.8rem', { opacity: 0.45, lineHeight: 1.5, letterSpacing: '0.004em', marginBottom: '0.5rem' })}>
                    {p.desc}
                  </div>
                  <div style={f(300, '0.72rem', { opacity: 0.3, letterSpacing: '0.04em', lineHeight: 1 })}>
                    {p.date}
                  </div>
                </div>
              </div>

              {/* Divider — sharp for active row and its neighbour */}
              {i < PROJECTS.length - 1 ? (
                <div style={borderStyle([p.id, PROJECTS[i + 1].id])} />
              ) : (
                <div style={borderStyle([p.id])} />
              )}
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
