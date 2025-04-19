"use client";

import { useEffect, useState, use } from "react";
import LoadingText from "@/app/loadingText";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(
  () => import("@/components/pdfViewer/PdfViewer"), { 
    ssr: false,
    loading: () => <LoadingText />
  }
);

export default function PdfViewerPage({ params }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { slug } = use(params);

  useEffect(() => {
    if (!slug) return;

    const fetchPDF = async () => {
      try {
        const fileUrl = `https://cdn.sanity.io/files/8390afyw/production/${slug}.pdf`;
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        console.error("Failed to fetch PDF:", err);
      }
    };

    fetchPDF();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [slug]);

  if (!pdfUrl) return <LoadingText />

  return <PdfViewer file={pdfUrl} />;
}