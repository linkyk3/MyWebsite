import { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { PROJECTS, NAV_LINKS, f, INDENT } from './Projects';
import thesisPdfUrl from '@assets/thesisboek_spreads.pdf';
import { ThemeToggleInline } from '@/components/ThemeToggle';

// Configure the PDF worker to render the document
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor"
       strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <line x1="10" y1="1"   x2="10" y2="19" />
    <line x1="2"  y1="5.5" x2="18" y2="14.5" />
    <line x1="18" y1="5.5" x2="2"  y2="14.5" />
  </svg>
);

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:id');
  const project = PROJECTS.find((p) => p.id === params?.id);

  const [numPages, setNumPages] = useState<number | null>(null);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', background: 'var(--background)' }}>
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
      >
        {/* Header */}
        <div
          className="flex items-center flex-shrink-0"
          style={{ justifyContent: 'space-between', paddingLeft: INDENT, paddingRight: INDENT, paddingTop: '1rem', paddingBottom: '1rem' }}
        >
          <div className="flex items-center gap-3">
            <Link href="/" style={f(500, '1.75rem', { letterSpacing: '-0.02em', lineHeight: 1, color: 'inherit', textDecoration: 'none' })}>
              Seppe Goossens
            </Link>
            <div className="relative group flex items-center" style={{ lineHeight: 0, paddingRight: '320px', marginRight: '-320px' }}>
              <div className="hover:text-accent transition-colors" style={{ lineHeight: 0 }}><LogoMark /></div>
              <nav aria-label="Primary navigation" className="absolute flex items-center gap-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150" style={{ left: '44px', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}>
                {NAV_LINKS.map(({ label, href }) => (
                  <Link key={label} href={href} className="text-foreground hover:text-accent transition-colors" style={f(300, '1.15rem', { letterSpacing: '0.01em' })}>{label}</Link>
                ))}
              </nav>
            </div>
          </div>
          <Link href="/projects" style={f(500, 'clamp(1.4rem, 3.2vh, 2.2rem)', { letterSpacing: '-0.02em', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px var(--color-foreground)', textTransform: 'uppercase', whiteSpace: 'nowrap', userSelect: 'none', textDecoration: 'none' })}>
            Selected Works
          </Link>
        </div>

        {/* Upper Horizon Line */}
        <div className="flex-shrink-0 bg-foreground" style={{ height: '2px', marginLeft: INDENT, marginRight: INDENT }} />

        {/* Main Content */}
        <main className="flex-grow flex flex-col px-8 py-12 gap-8">
          <header className="text-center">
            <h1 style={f(500, '2.5rem', { letterSpacing: '-0.02em' })}>{project.title}</h1>
            <p style={f(300, '1.1rem', { marginTop: '0.5rem', opacity: 0.7, letterSpacing: '0.01em' })}>{project.desc}</p>
          </header>

          {/* PDF Viewer */}
          <div className="flex-grow w-full overflow-y-auto border border-foreground/20" style={{ minHeight: '50vh' }}>
            <Document
              file={thesisPdfUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="flex flex-col items-center gap-4 py-4"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={Math.min(window.innerWidth * 0.7, 800)} // Responsive width
                />
              ))}
            </Document>
          </div>
        </main>

        {/* Lower Horizon Line */}
        <div className="flex-shrink-0 bg-foreground" style={{ height: '2px', marginLeft: INDENT, marginRight: INDENT }} />

        {/* Footer */}
        <div className="flex flex-shrink-0 items-center px-8 py-2.5">
          <div style={{ marginLeft: 'auto', marginRight: '0.5rem' }}>
            <ThemeToggleInline />
          </div>
        </div>
      </div>
    </div>
  );
}