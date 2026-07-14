import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import thesisPdfUrl from '@assets/thesisboek_omslag.pdf';

// Configure the PDF worker. This is a common setup for Vite.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      // Set a responsive width for the PDF pages
      setPageWidth(Math.min(window.innerWidth * 0.7, 800));
    };
    window.addEventListener('resize', updateWidth);
    updateWidth(); // Set initial width on mount

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <Document
      file={thesisPdfUrl}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      className="flex flex-col items-center gap-4 py-4"
      loading={<div className="p-4">Loading PDF...</div>}
    >
      {numPages &&
        Array.from(new Array(numPages), (_el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={pageWidth} />
        ))}
    </Document>
  );
}