"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Loading from "@/app/loading";
import styles from "./PaginatedView.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PaginatedView({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState("");
  const [width, setWidth] = useState(800);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const containerRef = useRef(null);
  const jumpInputRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(800);
  const pageRef = useRef(null);
  
  const [displayPageNumber, setDisplayPageNumber] = useState(1);

  const updateContainerHeight = () => {
    if (pageRef.current) {
      const pageElement = pageRef.current.querySelector('.react-pdf__Page');
      if (pageElement) {
        const computedStyle = getComputedStyle(pageElement);
        const heightValue = computedStyle.height;
        setContainerHeight(parseFloat(heightValue));
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    setIsPageLoading(true);
  };

  const handleJumpToPage = () => {
    const newPage = parseInt(jumpPageInput);
    if (!isNaN(newPage)) {
      const clampedPage = Math.max(1, Math.min(newPage, numPages || Infinity));
      if (clampedPage !== pageNumber) {
        handlePageChange(clampedPage);
      }
    }
    setJumpPageInput("");
    jumpInputRef.current?.blur();
  };

  const handleRenderSuccess = () => {
    setDisplayPageNumber(pageNumber);
    setIsPageLoading(false);
    updateContainerHeight();
  };

  const handleRenderError = (error) => {
    console.error("Page render error:", error);
    setIsPageLoading(false);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      updateContainerHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setJumpPageInput(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleJumpToPage();
    }
  };

  const Pagination = () => {
    return (
      <div className={styles.paginationRow}>
        <button
          onClick={() => {
            const newPage = Math.max(1, pageNumber - 1);
            setPageNumber(newPage);
            setIsPageLoading(true);
          }}
          disabled={pageNumber <= 1 || isPageLoading}
          className={styles.navButton}
        >
          წინა
        </button>

        <div className={styles.pageDisplay}>
          <span>გვერდი {pageNumber} / {numPages || "..."}</span>
        </div>

        <button
          onClick={() => {
            const newPage = Math.min(pageNumber + 1, numPages || Infinity);
            setPageNumber(newPage);
            setIsPageLoading(true);
          }}
          disabled={pageNumber >= (numPages || Infinity) || isPageLoading}
          className={styles.navButton}
        >
          მომდევნო
        </button>
      </div>
    )
  }

  return (
    <div className={styles.viewerWrapper}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.jumpRow}>
          <input
            ref={jumpInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={jumpPageInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.jumpInput}
            placeholder="გვერდი"
            disabled={isLoading || isPageLoading}
          />
          <button 
            onClick={handleJumpToPage}
            className={styles.jumpButton}
            disabled={isLoading || isPageLoading || !jumpPageInput}
          >
            გადასვლა
          </button>
        </div>

        <Pagination />

        <div 
          className={styles.pdfContainer} 
          style={{ height: `${containerHeight}px` }}
        >
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setIsLoading(false);
            }}
            loading={<Loading />}
          >
            <div ref={pageRef}>
              <Page
                key={`page-${pageNumber}`}
                pageNumber={pageNumber}
                width={width - 32}
                renderAnnotationLayer={false}
                renderTextLayer={true}
                loading={<Loading />}
                onLoadSuccess={handleRenderSuccess}
                onRenderSuccess={handleRenderSuccess}
                onRenderError={handleRenderError}
              />
            </div>
          </Document>
        </div>

        <Pagination />
      </div>
    </div>
  );
}