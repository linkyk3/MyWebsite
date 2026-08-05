import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const BASE = import.meta.env.BASE_URL;

// Statically configure the PDF.js worker to prevent re-initialization on re-renders.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};
export default function PdfDetail({ pdfPath, downloadPath }: { pdfPath: string, downloadPath: string }) {
  const fullPdfPath = `${BASE}${pdfPath}`;
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8 bg-background">
      <Document
        file={fullPdfPath}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="text-center p-8">Loading document...</div>}
        options={options}
        error={<div className="text-center p-8 text-red-500">Failed to load PDF file.</div>}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {Array.from(new Array(numPages || 0), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={600}
            className="flex justify-center"
            loading="" // Hide individual page loader
          />
        ))}
      </Document>
    </div>
  );
}