"use client";

import { useEffect, useRef, useState } from "react";
import LoadingText from "@/app/loadingText";
import styles from "./Scroll.module.css";

export default function ScrollView({ pdfDoc }) {
  const containerRef = useRef();
  const [width, setWidth]       = useState(0);
  const [rendered, setRendered] = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  
  useEffect(() => {
    if (!pdfDoc || !width) return;

    setRendered(false);
    setError("");

    (async () => {
      try {
        const canvases = [];

        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport1x = page.getViewport({ scale: 1 });
          const scale = width / viewport1x.width;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width  = viewport.width;
          canvas.height = viewport.height;

          canvas.setAttribute("draggable", "false");
          canvas.style.userSelect     = "none";
          canvas.style.webkitUserDrag = "none";
          canvas.addEventListener("contextmenu", (e) => e.preventDefault());

          const context = canvas.getContext("2d");
          await page
            .render({ canvasContext: context, viewport })
            .promise
            .catch((e) => {
              console.error(`Page ${i} render error:`, e);
              setError("დაფიქსირდა შეცდომა PDF-ის ჩვენებისას");
              throw new Error(`Failed to render page ${i}`);
            });

          canvases.push(canvas);
        }

        const container = containerRef.current;
        container.innerHTML = "";
        canvases.forEach((canvas) => {
          const wrapper = document.createElement("div");
          wrapper.className = styles.pageContainer;
          wrapper.appendChild(canvas);
          container.appendChild(wrapper);
        });

        setRendered(true);
      } catch (e) {
        console.error("ScrollView rendering error:", e);
        setError("დაფიქსირდა შეცდომა PDF-ის ჩვენებისას");
      }
    })();
  }, [pdfDoc, width]);

  return <>
    {!rendered && !error && (
      <div className={styles.loading}>
        <LoadingText />
      </div>
    )}
    {error && <div className={styles.error}>{error}</div>}
    <div className={styles.viewerWrapper}>
      <div ref={containerRef} className={styles.container} />
    </div>
  </>;
}
