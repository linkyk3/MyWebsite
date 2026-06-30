import ConstellationMap from '@/components/ConstellationMap';

export default function Home() {
  return (
    <div
      className="w-screen h-screen overflow-hidden bg-background flex"
      data-testid="home-root"
    >
      {/* ─── LEFT COLUMN: 2/5 ───────────────────────────────────────────────── */}
      {/*
        overflow: visible so that the full-width horizon divider can escape
        the column boundary and run edge-to-edge across the page.
      */}
      <div
        className="relative flex flex-col"
        style={{ width: '40%', flexShrink: 0, overflow: 'visible', zIndex: 1 }}
        data-testid="col-left"
      >
        {/* Logo space — GlobalNav overlays here */}
        <div style={{ height: '72px', flexShrink: 0 }} />

        {/* Name */}
        <div className="px-8 pt-4 flex flex-col gap-3">
          <h1
            className="text-foreground tracking-tight"
            style={{
              fontFamily: "'ABC ROM'",
              fontWeight: 500,
              fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
              lineHeight: 1.05,
            }}
          >
            Seppe Goossens
          </h1>

          {/*
            FULL-WIDTH HORIZON LINE
            width: 100vw + left: 0 breaks out of the 40% column and runs
            across the entire page, exactly like the bottom divider in the
            Evan Kirkiles reference (image_1782826026120.png).
          */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              width: '100vw',
              height: '1px',
              background: 'rgba(0,0,0,0.18)',
              // vertically placed just below the heading; approximated as
              // 72px logo + 16px pt-4 + ~32px h1 ≈ 120px from top
              top: 120,
            }}
            aria-hidden="true"
          />

          <p
            className="text-foreground/70 leading-snug"
            style={{
              fontFamily: "'ABC ROM'",
              fontWeight: 350,
              fontSize: 'clamp(0.72rem, 1vw, 0.85rem)',
              letterSpacing: '0.01em',
            }}
          >
            Student double-majoring in Urban Planning and Industrial Engineering.
            Interested in the spatial logic of cities, systemic flows, and the
            infrastructure that holds everything together.
          </p>

          {/* Discipline tags */}
          <div className="flex flex-col gap-1 mt-1">
            <span
              className="uppercase text-muted-foreground"
              style={{
                fontFamily: "'ABC ROM'",
                fontWeight: 350,
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
              }}
            >
              Urban Planning
            </span>
            <span
              className="uppercase text-muted-foreground"
              style={{
                fontFamily: "'ABC ROM'",
                fontWeight: 350,
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
              }}
            >
              × Industrial Engineering
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Contact — pinned to bottom */}
        <div
          className="px-8 pb-8 pt-6 flex flex-col gap-3"
          style={{ position: 'relative' }}
        >
          {/* Full-width horizon line above contact */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100vw',
              height: '1px',
              background: 'rgba(0,0,0,0.12)',
            }}
            aria-hidden="true"
          />

          <span
            className="uppercase text-muted-foreground"
            style={{
              fontFamily: "'ABC ROM'",
              fontWeight: 350,
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
            }}
          >
            Contact
          </span>

          <div className="flex flex-col gap-1.5">
            <a
              href="mailto:s.goossens@student.kuleuven.be"
              className="text-foreground hover:text-accent transition-colors"
              style={{
                fontFamily: "'ABC ROM'",
                fontWeight: 350,
                fontSize: '0.72rem',
                letterSpacing: '0.02em',
              }}
              data-testid="contact-email"
            >
              s.goossens@student.kuleuven.be
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              style={{
                fontFamily: "'ABC ROM'",
                fontWeight: 350,
                fontSize: '0.72rem',
                letterSpacing: '0.02em',
              }}
              data-testid="contact-linkedin"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              style={{
                fontFamily: "'ABC ROM'",
                fontWeight: 350,
                fontSize: '0.72rem',
                letterSpacing: '0.02em',
              }}
              data-testid="contact-github"
            >
              GitHub ↗
            </a>
          </div>

          <p
            className="text-foreground/30 mt-2"
            style={{
              fontFamily: "'ABC ROM'",
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
            }}
          >
            ©2025 · SEPPE GOOSSENS · URBAN PLANNING × IND. ENG.
          </p>
        </div>
      </div>

      {/* ─── RIGHT COLUMN: 3/5 — Constellation Canvas ──────────────────────── */}
      {/*
        No grid, no boxes. A free diagrammatic canvas bounded only by the
        left vertical rule and the viewport edges.
      */}
      <div
        className="flex-grow relative"
        style={{ borderLeft: '1px solid rgba(0,0,0,0.18)' }}
        data-testid="col-right"
      >
        <ConstellationMap />
      </div>
    </div>
  );
}
