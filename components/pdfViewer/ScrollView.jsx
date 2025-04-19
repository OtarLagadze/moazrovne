"use client";

import LoadingText from "@/app/loadingText";
import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./Scroll.module.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ScrollView({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(700);
  const [renderedPages, setRenderedPages] = useState([]);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const onDocLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setRenderedPages([]);
    setError(null);
  };

  const onPageRenderSuccess = (pageIndex) => {
    setRenderedPages((prev) => {
      const updated = [...new Set([...prev, pageIndex])];
      return updated;
    });
  };

  const onDocLoadError = (err) => {
    console.error("PDF loading error:", err);
    setError("დაფიქსირდა შეცდომა");
  };

  const allPagesRendered = numPages !== null && renderedPages.length === numPages;

  return (
    <div className={styles.viewerWrapper}>
      <div ref={containerRef} className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}

        {!error && !allPagesRendered && (
          <div className={styles.loading}>
            <LoadingText />
          </div>
        )}

        {!error && (
          <div className={styles.pdfContainer} style={{ display: allPagesRendered ? "block" : "none" }}>
            <Document file={file} onLoadSuccess={onDocLoadSuccess} onLoadError={onDocLoadError}>
              {Array.from(new Array(numPages), (_, index) => (
                <div key={`page_container_${index + 1}`} className={styles.pageContainer}>
                  <Page
                    pageNumber={index + 1}
                    width={width - 32}
                    renderAnnotationLayer={false}
                    renderTextLayer={true}
                    devicePixelRatio={window.devicePixelRatio || 1}
                    onRenderSuccess={() => onPageRenderSuccess(index)}
                  />
                </div>
              ))}
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}