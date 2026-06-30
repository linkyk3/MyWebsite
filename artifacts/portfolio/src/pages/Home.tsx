import { Link } from 'wouter';
import TracingSVG from '@/components/TracingSVG';

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col p-4 md:p-8 pt-24 pb-8 overflow-x-hidden">
      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-foreground border border-foreground shadow-sm">
        
        {/* TOP LEFT: NAME */}
        <div className="bg-background col-span-1 md:col-span-4 flex flex-col justify-between p-6 md:p-8 group relative transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/5">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-destructive transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          <div>
            <h1 className="text-2xl md:text-3xl font-sans font-medium text-foreground tracking-tight mb-2">
              Seppe Goossens
            </h1>
            <div className="w-full h-[1px] bg-foreground/20 my-4"></div>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1">
              Urban Planning
            </p>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-6">
              × Ind. Eng.
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-foreground/40 mt-16 uppercase">
            ©2025 · Seppe Goossens · Urban Planning × Industrial Engineering
          </div>
        </div>

        {/* TOP RIGHT COLUMN (Projects + CV) */}
        <div className="bg-foreground col-span-1 md:col-span-8 grid grid-rows-2 gap-[1px]">
          {/* Projects */}
          <Link href="/projects" className="bg-background flex flex-col justify-between p-6 md:p-8 group relative transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/5 cursor-pointer" data-testid="zone-projects">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-destructive transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-12">PROJECTS</div>
            <div className="text-3xl md:text-5xl font-sans font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">Selected Works</div>
          </Link>
          {/* CV */}
          <Link href="/cv" className="bg-background flex flex-col justify-between p-6 md:p-8 group relative transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/5 cursor-pointer" data-testid="zone-cv">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-destructive transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-12">CV</div>
            <div className="text-3xl md:text-5xl font-sans font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">Curriculum Vitae</div>
          </Link>
        </div>

        {/* MIDDLE: TRACING SVG */}
        <div className="bg-background col-span-1 md:col-span-12 p-6 md:p-8 flex flex-col min-h-[300px] md:min-h-[400px] relative group overflow-hidden">
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase z-10 absolute top-6 left-6 md:top-8 md:left-8">SYS.ARCH</div>
          <div className="absolute inset-0 flex items-center justify-center p-4 opacity-80 group-hover:opacity-100 transition-opacity">
            <TracingSVG />
          </div>
        </div>

        {/* BOTTOM LEFT: CREATIONS */}
        <Link href="/creations" className="bg-background col-span-1 md:col-span-6 flex flex-col justify-between p-6 md:p-8 group relative transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/5 cursor-pointer" data-testid="zone-creations">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-destructive transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-12">CREATIONS</div>
          <div className="text-2xl md:text-4xl font-sans font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">Objects & Tests</div>
        </Link>

        {/* BOTTOM RIGHT: BLOG */}
        <Link href="/creations" className="bg-background col-span-1 md:col-span-6 flex flex-col justify-between p-6 md:p-8 group relative transition-colors hover:bg-[#f5f5f5] dark:hover:bg-white/5 cursor-pointer" data-testid="zone-blog">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-destructive transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-12">BLOG</div>
          <div className="text-2xl md:text-4xl font-sans font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">Writing</div>
        </Link>

      </div>
    </div>
  );
}