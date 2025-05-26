"use client";
import { use, useEffect, useState } from "react";
import LoadingText from "@/app/loadingText";
import dynamic from "next/dynamic";
import PdfIframe from "@/components/pdfViewer/PdfIframe";

const PdfViewer = dynamic(
  () => import("@/components/pdfViewer/PdfViewer"),
  { ssr: false, loading: () => <LoadingText /> }
);

export default function PdfViewerPage({ params }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [unsupported, setUnsupported] = useState(false);
  const { slug } = use(params);

  useEffect(() => {
    if (!slug) return;
    const fileUrl = `https://cdn.sanity.io/files/8390afyw/production/${slug}.pdf`;

    if (!window.URL || !window.URL.createObjectURL) {
      setUnsupported(true);
      setPdfUrl(fileUrl);
      return;
    }

    fetch(fileUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not OK");
        return res.blob();
      })
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
      })
      .catch((err) => {
        console.error("Failed to fetch PDF:", err);
        setUnsupported(true);
        setPdfUrl(fileUrl);
      });

    return () => {
      if (pdfUrl && !unsupported) URL.revokeObjectURL(pdfUrl);
    };
  }, [slug]);
  if (!pdfUrl) return <LoadingText />;

  if (unsupported) {
    return <PdfIframe src={pdfUrl}/>
  }

  return <PdfViewer file={pdfUrl} />;
}