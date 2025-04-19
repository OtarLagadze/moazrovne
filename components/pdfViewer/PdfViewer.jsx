"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingText from "@/app/loadingText";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PaginatedView = dynamic(() => import('@/components/pdfViewer/PaginatedView'), {
  ssr: false,
  loading: () => <LoadingText />,
});

const ScrollView = dynamic(() => import('@/components/pdfViewer/ScrollView'), {
  ssr: false,
  loading: () => <LoadingText />,
});

export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const pdf = await pdfjs.getDocument(file).promise;
        setNumPages(pdf.numPages);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF");
      }
    };

    loadPDF();
  }, [file]);

  if (error) return <div className={classes.error}>{error}</div>
  if (!numPages) return <LoadingText />

  return numPages <= 20 ? <ScrollView file={file} /> : <PaginatedView file={file} />;
}