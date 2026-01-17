"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useMediaQuery } from "../lib/hooks";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function ResumeViewer({ fileUrl }: { fileUrl: string }) {
  const [error, setError] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      const width = containerRef.current?.clientWidth ?? 800;
      setPageWidth(Math.min(800, width));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (isMobile) {
    return (
      <div className="card min-h-[520px]">
        <iframe
          title="Resume PDF"
          src={fileUrl}
          className="h-[520px] w-full rounded-xl border border-border"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card flex flex-col items-start gap-3">
        <p className="text-sm text-secondary">Preview failed to load.</p>
        <a href={fileUrl} className="btn-secondary" target="_blank" rel="noreferrer">
          Open PDF
        </a>
      </div>
    );
  }

  return (
    <div className="card min-h-[520px]" ref={containerRef}>
      <Document
        file={fileUrl}
        onLoadError={() => setError(true)}
        loading={<p className="text-sm text-secondary">Loading PDF...</p>}
      >
        <Page pageNumber={1} width={pageWidth} renderAnnotationLayer={false} renderTextLayer={false} />
      </Document>
    </div>
  );
}
