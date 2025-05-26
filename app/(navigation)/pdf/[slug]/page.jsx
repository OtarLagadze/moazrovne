"use client";

import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LoadingText from "@/app/loadingText";
import PdfIframe from "@/components/pdfViewer/PdfIframe";

const PdfViewer = dynamic(
  () => import("@/components/pdfViewer/PdfViewer"),
  { ssr: false, loading: () => <LoadingText /> }
);

export default function PdfViewerPage({ params }) {
  const { slug } = use(params);

  const [pdfUrl, setPdfUrl]       = useState(null);
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const proxyUrl = `/api/pdf?slug=${encodeURIComponent(slug)}`;
    setPdfUrl(proxyUrl);

    // pdfjs breaks for ios < 18
    const ua = navigator.userAgent;
    const match = ua.match(/OS (\d+)_/);
    const iOSver = match ? parseInt(match[1], 10) : null;
    const isOldiOS = iOSver !== null && iOSver < 18;

    if (isOldiOS) {
      setUseIframe(true);
      return;
    }

    let objectUrl;
    fetch(proxyUrl)
      .then(res => {
        if (!res.ok) throw new Error("Network response not OK");
        return res.blob();
      })
      .then(blob => {
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      })
      .catch(err => {
        console.error("Failed to fetch PDF:", err);
        setUseIframe(true);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [slug]);

  if (!pdfUrl) {
    return <LoadingText />;
  }

  return useIframe
    ? <PdfIframe src={pdfUrl} />
    : <PdfViewer file={pdfUrl} />;
}
