"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./PaginatedView.module.css";

export default function PaginatedView({ pdfDoc }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState("");
  const [width, setWidth] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const pageRef = useRef(null);
  const jumpInputRef = useRef(null);
  const lastRender = useRef({ page: 0, width: 0 });

  useEffect(() => {
    const onResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        if (Math.abs(newWidth - width) > 5) {
          setWidth(newWidth);
        }
      }
    };
    
    window.addEventListener("resize", onResize);
    onResize();
    
    return () => window.removeEventListener("resize", onResize);
  }, [width]);

  useEffect(() => {
    if (!pdfDoc) return;
    setNumPages(pdfDoc.numPages);
    setPageNumber(1);
    setError("");
  }, [pdfDoc]);

  useEffect(() => {
    if (!pdfDoc || !width) return;

    if (
      lastRender.current.page === pageNumber && 
      lastRender.current.width === width
    ) {
      return;
    }

    const renderPage = async () => {
      setIsPageLoading(true);
      setError("");
      if (!pageRef.current) return;
      
      try {
        const page = await pdfDoc.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const dpr = window.devicePixelRatio || 1;
        const scale = ((width - 32) / baseViewport.width) * dpr;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        canvas.style.width = `${(width - 32)}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        canvas.setAttribute("draggable", "false");
        canvas.style.userSelect = "none";
        canvas.style.webkitUserDrag = "none";
        canvas.addEventListener("contextmenu", (e) => e.preventDefault());

        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;

        const wrapper = pageRef.current;
        wrapper.innerHTML = "";
        wrapper.appendChild(canvas);

        setContainerHeight(viewport.height);
        lastRender.current = { page: pageNumber, width };
      } catch (err) {
        console.error("Page render error:", err);
        setError("დაფიქსირდა შეცდომა გვერდის ჩვენებისას");
      } finally {
        setIsPageLoading(false);
      }
    };

    renderPage();
  }, [pdfDoc, pageNumber, width]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > numPages) return;
    setPageNumber(newPage);
  };

  const handleJumpToPage = () => {
    const n = parseInt(jumpPageInput, 10);
    if (!isNaN(n)) {
      handlePageChange(Math.min(Math.max(1, n), numPages));
    }
    setJumpPageInput("");
    jumpInputRef.current?.blur();
  };

  const Pagination = () => (
    <div className={styles.paginationRow}>
      <button
        onClick={() => handlePageChange(pageNumber - 1)}
        disabled={pageNumber <= 1 || isPageLoading}
        className={styles.navButton}
      >
        წინა
      </button>

      <div className={styles.pageDisplay}>
        <span>გვერდი {pageNumber} / {numPages || "..."}</span>
      </div>

      <button
        onClick={() => handlePageChange(pageNumber + 1)}
        disabled={pageNumber >= numPages || isPageLoading}
        className={styles.navButton}
      >
        შემდეგი
      </button>
    </div>
  );

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
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^[1-9]\d*$/.test(v)) {
                setJumpPageInput(v);
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && handleJumpToPage()}
            className={styles.jumpInput}
            placeholder="გვერდი"
            disabled={isPageLoading}
          />
          <button
            onClick={handleJumpToPage}
            className={styles.jumpButton}
            disabled={isPageLoading || !jumpPageInput}
          >
            გადასვლა
          </button>
        </div>

        <Pagination />

        {error && <div className={styles.error}>{error}</div>}

        <div
          className={styles.pdfContainer}
          style={{ height: `${containerHeight}px` }}
        >
          <div ref={pageRef} className={styles.pageCanvas}></div>
        </div>

        <Pagination />
      </div>
    </div>
  );
}