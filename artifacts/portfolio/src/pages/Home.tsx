import { Link } from 'wouter';
import BelgianInfraSVG from '@/components/BelgianInfraSVG';

const LogoMark = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="1" y="1" width="5" height="5" />
    <rect x="8" y="1" width="5" height="5" />
    <rect x="1" y="8" width="5" height="5" />
    <rect x="8" y="8" width="5" height="5" />
  </svg>
);

const hoverBar = (
  <div className="absolute top-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
);

const labelStyle: React.CSSProperties = {
  fontFamily: "'ABC ROM'",
  fontWeight: 500,
  letterSpacing: '-0.01em',
  lineHeight: 1,
};

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background flex" data-testid="home-root">

      {/* ─── LEFT COLUMN: 2/5 ─── */}
      <div
        className="relative flex flex-col border-r border-foreground"
        style={{ width: '40%', flexShrink: 0 }}
        data-testid="col-left"
      >
        {/* Spacer for fixed GlobalNav logo */}
        <div style={{ height: '60px', flexShrink: 0 }} />

        {/* Name + logo mark */}
        <div className="px-8 flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <h1
              className="text-foreground tracking-tight"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(1.15rem, 1.8vw, 1.55rem)', lineHeight: 1 }}
            >
              Seppe Goossens
            </h1>
          </div>

          {/* Thin rule */}
          <div className="w-full border-t border-foreground/25" />

          {/* Bio */}
          <p
            className="text-foreground/65 leading-relaxed"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: 'clamp(0.7rem, 0.95vw, 0.82rem)', letterSpacing: '0.005em' }}
          >
            Student double-majoring in Urban Planning and Industrial Engineering.
            Interested in the spatial logic of cities, systemic flows, and the
            infrastructure that holds everything together.
          </p>

          {/* Discipline row */}
          <div className="flex gap-4">
            <span
              className="uppercase text-muted-foreground"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.13em' }}
            >
              Urban Planning
            </span>
            <span className="text-muted-foreground/40" style={{ fontSize: '0.6rem' }}>×</span>
            <span
              className="uppercase text-muted-foreground"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.13em' }}
            >
              Industrial Engineering
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Contact + link row — bottom of left column */}
        <div className="px-8 pb-7 flex flex-col gap-3 border-t border-foreground/20 pt-5">
          <span
            className="uppercase text-muted-foreground"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.58rem', letterSpacing: '0.14em' }}
          >
            Contact
          </span>
          <a
            href="mailto:s.goossens@student.kuleuven.be"
            className="text-foreground hover:text-accent transition-colors"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.72rem', letterSpacing: '0.01em' }}
            data-testid="contact-email"
          >
            s.goossens@student.kuleuven.be
          </a>

          {/* Horizontal link row — reference style */}
          <div className="flex items-center gap-5 pt-1">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.68rem', letterSpacing: '0.04em' }}
              data-testid="contact-linkedin"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.68rem', letterSpacing: '0.04em' }}
              data-testid="contact-github"
            >
              GitHub
            </a>
            <Link
              href="/cv"
              className="text-muted-foreground hover:text-accent transition-colors"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.68rem', letterSpacing: '0.04em' }}
              data-testid="contact-cv"
            >
              CV
            </Link>
          </div>
        </div>
      </div>

      {/* ─── RIGHT COLUMN: 3/5 ─── */}
      <div
        className="flex-grow grid bg-foreground"
        style={{
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: '1fr 1fr 44%',
          gap: '1px',
        }}
        data-testid="col-right"
      >
        {/* SELECTED WORKS — top-left 70% */}
        <Link
          href="/projects"
          className="col-span-7 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors"
          data-testid="zone-projects"
        >
          {hoverBar}
          <div
            className="text-foreground group-hover:text-accent transition-colors"
            style={{ ...labelStyle, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
          >
            Selected Works
          </div>
        </Link>

        {/* BLOG — top-right 30% */}
        <Link
          href="/creations"
          className="col-span-3 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors"
          data-testid="zone-blog"
        >
          {hoverBar}
          <div
            className="text-foreground group-hover:text-accent transition-colors"
            style={{ ...labelStyle, fontSize: 'clamp(1.1rem, 2vw, 1.7rem)' }}
          >
            Blog
          </div>
        </Link>

        {/* MUSIC — middle-left 50% */}
        <Link
          href="/creations"
          className="col-span-5 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors"
          data-testid="zone-music"
        >
          {hoverBar}
          <div
            className="text-foreground group-hover:text-accent transition-colors"
            style={{ ...labelStyle, fontSize: 'clamp(1.1rem, 2vw, 1.7rem)' }}
          >
            Music
          </div>
        </Link>

        {/* VISUALIZATIONS — middle-right 50% */}
        <Link
          href="/creations"
          className="col-span-5 bg-background flex flex-col justify-end p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors"
          data-testid="zone-visualizations"
        >
          {hoverBar}
          <div
            className="text-foreground group-hover:text-accent transition-colors"
            style={{ ...labelStyle, fontSize: 'clamp(1.1rem, 2vw, 1.7rem)' }}
          >
            Visualizations
          </div>
        </Link>

        {/* SVG — full-width bottom row */}
        <div
          className="col-span-10 bg-background relative flex items-center justify-center overflow-hidden group"
          data-testid="zone-svg"
        >
          <span
            className="absolute bottom-4 left-5 uppercase text-muted-foreground z-10 select-none"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.56rem', letterSpacing: '0.14em' }}
          >
            BE.INFRA — Diffused Urban Condition
          </span>
          <div className="absolute inset-0 flex items-center justify-center p-4 opacity-75 group-hover:opacity-100 transition-opacity">
            <BelgianInfraSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
