import { Link } from 'wouter';
import UrbanHistoryMap from '@/components/UrbanHistoryMap';

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background flex" data-testid="home-root">
      {/* ─── LEFT COLUMN: 2/5 ─── */}
      <div
        className="relative flex flex-col border-r border-foreground"
        style={{ width: '40%', flexShrink: 0 }}
        data-testid="col-left"
      >
        {/* Logo space — GlobalNav overlays here at fixed top-8 left-8 */}
        <div style={{ height: '72px', flexShrink: 0 }} />

        {/* Name + bio */}
        <div className="px-8 pt-6 flex flex-col gap-4">
          <h1
            className="text-foreground tracking-tight"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1.05 }}
          >
            Seppe Goossens
          </h1>
          <div className="w-full border-t border-foreground/20" />
          <p
            className="text-foreground/70 leading-snug"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', letterSpacing: '0.01em' }}
          >
            Student double-majoring in Urban Planning and Industrial Engineering.
            Interested in the spatial logic of cities, systemic flows, and the
            infrastructure that holds everything together.
          </p>

          {/* Discipline tags */}
          <div className="flex flex-col gap-1 mt-2">
            <span
              className="uppercase text-muted-foreground"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.62rem', letterSpacing: '0.12em' }}
            >
              Urban Planning
            </span>
            <span
              className="uppercase text-muted-foreground"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.62rem', letterSpacing: '0.12em' }}
            >
              × Industrial Engineering
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Contact section — pinned to bottom */}
        <div className="px-8 pb-8 border-t border-foreground/20 pt-6 flex flex-col gap-3">
          <span
            className="uppercase text-muted-foreground"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.6rem', letterSpacing: '0.14em' }}
          >
            Contact
          </span>
          <div className="flex flex-col gap-1.5">
            <a
              href="mailto:s.goossens@student.kuleuven.be"
              className="text-foreground hover:text-accent transition-colors"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.72rem', letterSpacing: '0.02em' }}
              data-testid="contact-email"
            >
              s.goossens@student.kuleuven.be
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.72rem', letterSpacing: '0.02em' }}
              data-testid="contact-linkedin"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.72rem', letterSpacing: '0.02em' }}
              data-testid="contact-github"
            >
              GitHub ↗
            </a>
          </div>
          <p
            className="text-foreground/30 mt-2"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.58rem', letterSpacing: '0.1em' }}
          >
            ©2025 · SEPPE GOOSSENS · URBAN PLANNING × IND. ENG.
          </p>
        </div>
      </div>

      {/* ─── RIGHT COLUMN: 3/5 ─── */}
      <div
        className="flex-grow grid bg-foreground"
        style={{
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '1fr 42% 1fr',
          gap: '1px',
        }}
        data-testid="col-right"
      >
        {/* PROJECTS — large top-left */}
        <Link
          href="/projects"
          className="bg-background flex flex-col justify-between p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors"
          data-testid="zone-projects"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <span
            className="uppercase text-muted-foreground"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.6rem', letterSpacing: '0.14em' }}
          >
            Projects
          </span>
          <div>
            <div
              className="text-foreground group-hover:text-accent transition-colors tracking-tight"
              style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', lineHeight: 1 }}
            >
              Selected
              <br />
              Works
            </div>
          </div>
        </Link>

        {/* PHOTOGRAPHY — top-right */}
        <Link
          href="/creations"
          className="bg-background flex flex-col justify-between p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors border-l border-foreground"
          data-testid="zone-photography"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <span
            className="uppercase text-muted-foreground"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.6rem', letterSpacing: '0.14em' }}
          >
            Photography
          </span>
          <div
            className="text-foreground group-hover:text-accent transition-colors tracking-tight"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', lineHeight: 1.05 }}
          >
            Images &amp;
            <br />
            Field Notes
          </div>
        </Link>

        {/* URBAN HISTORY MAP — full width middle row */}
        <div
          className="col-span-2 relative overflow-hidden"
          data-testid="zone-map"
        >
          <UrbanHistoryMap />
        </div>

        {/* MUSIC — bottom-left */}
        <Link
          href="/creations"
          className="bg-background flex flex-col justify-between p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors"
          data-testid="zone-music"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <span
            className="uppercase text-muted-foreground"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.6rem', letterSpacing: '0.14em' }}
          >
            Music
          </span>
          <div
            className="text-foreground group-hover:text-accent transition-colors tracking-tight"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', lineHeight: 1.05 }}
          >
            Recordings &amp;
            <br />
            Playlists
          </div>
        </Link>

        {/* BLOG — bottom-right */}
        <Link
          href="/creations"
          className="bg-background flex flex-col justify-between p-6 group relative overflow-hidden cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-white/5 transition-colors border-l border-foreground"
          data-testid="zone-blog"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <span
            className="uppercase text-muted-foreground"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 350, fontSize: '0.6rem', letterSpacing: '0.14em' }}
          >
            Blog
          </span>
          <div
            className="text-foreground group-hover:text-accent transition-colors tracking-tight"
            style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', lineHeight: 1.05 }}
          >
            Writing &amp;
            <br />
            Notes
          </div>
        </Link>
      </div>
    </div>
  );
}
