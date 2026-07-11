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
  { id: '001', title: 'De buurtspoorwegen in Brabant',
    desc:  'Een historisch-morfologische lezing van het diffuse verstedelijkingsproces.',
    img:   'thesisboek.png',     ratio: '4157 / 5906' },
  { id: '002', title: 'Positive Energy Network',
    desc:  'Design Studio – Positive Energy Districts in Intermediate Territories: the Case of Pajottenland.',
    img:   'pen-network.png',    ratio: '4000 / 3000' },
  { id: '003', title: 'The Landscape as a Unifying Model?',
    desc:  'The Fietssnelwegen Network and the Friction Between Landscape Urbanism and Engineering.',
    img:   'lu-paper.png',       ratio: '4157 / 5906' },
  { id: '004', title: 'Ruimtelijk Ontwerp',
    desc:  'Masterplan Ossegem Station.',
    img:   'ruimtelijk-ontwerp.png', ratio: '9921 / 7016' },
  { id: '005', title: 'Excursion 2026 MILAN',
    desc:  'VUB MA STeR* – Video by Nette Sneyers and Seppe Goossens.',
    img:   'excursie.png',       ratio: '2560 / 1440' },
  { id: '006', title: 'Methoden en Technieken: Ruimtelijke en Morfologische Analyse',
    desc:  'Mahatma Gandhi – Master Stedenbouw en Ruimtelijke Planning 2024–2025.',
    img:   'mt-rm.png',          ratio: '5906 / 4157' },
  { id: '007', title: 'Frictie tussen beleid en beleving',
    desc:  'Over parkeren en het ruimtelijke spanningsveld op de grens tussen Molenbeek en Koekelberg (Sociaal-ruimtelijke analyse).',
    img:   'mt-sr.png',          ratio: '4961 / 7016' },
  { id: '008', title: 'Is Homeownership Reaching its Limits?',
    desc:  "A Historical and Contemporary Review of Path Dependency in Belgium's Housing Landscape.",
    img:   'housing-paper.png',  ratio: '4961 / 7016' },
] as const;

const NAV_LINKS = [
  { label: 'Projects',       href: '/projects'  },
  { label: 'Music',          href: '/creations' },
  { label: 'Visualizations', href: '/creations' },
  { label: 'Blog',           href: '/creations' },
  { label: 'About',          href: '/cv'        },
];

/* ── Staggered column layout definition ───────────────────────────────────
   Each column carries two cards and a vertical offset (paddingTop) that
   creates the editorial scatter effect.  Card order within a column is
   intentionally mixed to keep adjacent columns visually varied.
*/
const COLUMNS = [
  { paddingTop: '0rem',   cards: [PROJECTS[0], PROJECTS[4]] }, // 001 portrait, 005 16:9
  { paddingTop: '6rem',   cards: [PROJECTS[1], PROJECTS[5]] }, // 002 landscape 4:3, 006 landscape
  { paddingTop: '2.5rem', cards: [PROJECTS[2], PROJECTS[6]] }, // 003 portrait, 007 portrait
  { paddingTop: '4rem',   cards: [PROJECTS[3], PROJECTS[7]] }, // 004 landscape wide, 008 portrait
];

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /* dimStyle ─ called with each card's own ID */
  const dimStyle = (id: string): React.CSSProperties =>
    hoveredId !== null && hoveredId !== id
      ? { filter: 'blur(4px)', opacity: 0.12, transition: 'filter 0.3s ease, opacity 0.3s ease' }
      : { filter: 'none',      opacity: 1,    transition: 'filter 0.3s ease, opacity 0.3s ease' };

  /* globalBlur ─ header, lines, title, footer */
  const globalBlur: React.CSSProperties = hoveredId
    ? { filter: 'blur(5px)', opacity: 0.35, transition: 'filter 0.3s ease, opacity 0.3s ease' }
    : { filter: 'none',      opacity: 1,    transition: 'filter 0.3s ease, opacity 0.3s ease' };

  return (
    /* Centering shell */
    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', background: 'var(--background)' }}>
      {/* 4:3 column — naturally scrollable */}
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
        <div className="flex flex-shrink-0" style={globalBlur}>
          <div className="flex items-center gap-3 px-8 py-4">
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
        </div>

        {/* ── UPPER HORIZON LINE ──────────────────────────────────────── */}
        <div className="flex-shrink-0 bg-foreground"
             style={{ height: '2px', marginLeft: INDENT, marginRight: INDENT, ...globalBlur }} />

        {/* ── PAGE TITLE ──────────────────────────────────────────────── */}
        <div style={{ ...globalBlur, flexShrink: 0, paddingLeft: INDENT, paddingTop: '1.4rem', paddingBottom: '1.2rem' }}>
          <div style={f(700, 'clamp(3.5rem, 8.5vh, 7rem)', { letterSpacing: '-0.03em', lineHeight: 1, textTransform: 'uppercase' })}>
            Selected Works
          </div>
        </div>

        {/* ── STAGGERED GALLERY ───────────────────────────────────────── */}
        {/*
          4 flex columns, each offset by a different paddingTop.
          Within each column, 2 cards stacked with a gap.
          Cards are 100% of column width; aspect-ratio drives the height.
        */}
        <div style={{
          flex: 1,
          display: 'flex',
          gap: '2rem',
          paddingLeft: INDENT,
          paddingRight: INDENT,
          paddingBottom: '4rem',
          alignItems: 'flex-start',
        }}>
          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                paddingTop: col.paddingTop,
                minWidth: 0,
              }}
            >
              {col.cards.map((p) => {
                const isActive   = hoveredId === p.id;
                const textVisible = isActive;

                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'default',
                      ...dimStyle(p.id),
                    }}
                  >
                    {/* ── Image card ─────────────────────────────────── */}
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: p.ratio,
                        overflow: 'hidden',
                        flexShrink: 0,
                        /*
                          Realistic depth shadow — mimics a physical print
                          lifted off the canvas. Darkened further on hover.
                        */
                        boxShadow: isActive
                          ? '0 8px 40px rgba(0,0,0,0.75), 0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,0,0,0.6)'
                          : '0 4px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)',
                        transform: isActive ? 'scale(1.012)' : 'scale(1)',
                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                      }}
                    >
                      <img
                        src={`${BASE}works/${p.img}`}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                    </div>

                    {/* ── Text reveal ────────────────────────────────── */}
                    {/*
                      Hidden by default (opacity 0, shifted up 6px).
                      Slides in smoothly when this card is hovered.
                    */}
                    <div
                      style={{
                        paddingTop: '0.7rem',
                        opacity: textVisible ? 1 : 0,
                        transform: textVisible ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        pointerEvents: 'none',
                        /* Reserve space so other cards don't shift */
                        minHeight: '3.8rem',
                      }}
                    >
                      <div style={f(300, '0.55rem', { opacity: 0.4, letterSpacing: '0.08em', lineHeight: 1, marginBottom: '0.35rem' })}>
                        {p.id}
                      </div>
                      <div style={f(500, '0.82rem', { letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '0.3rem' })}>
                        {p.title}
                      </div>
                      <div style={f(300, '0.68rem', { opacity: 0.42, lineHeight: 1.45, letterSpacing: '0.004em' })}>
                        {p.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
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
