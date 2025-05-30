"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import LoadingText from "@/app/loadingText";
import PdfIframe from "@/components/pdfViewer/PdfIframe";

const PdfViewer = dynamic(() => import("@/components/pdfViewer/PdfViewer"), {
  ssr: false,
  loading: () => <LoadingText />,
});

export default function PdfViewerPage() {
  const { slug } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const proxyUrl = `/api/pdf?slug=${encodeURIComponent(slug)}`;
    let objectUrl;

    fetch(proxyUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not OK");
        return res.blob();
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      })
      .catch((err) => {
        console.error("PDF.js load failed:", err);
        setPdfUrl(proxyUrl);
        setUseIframe(true);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [slug]);

  if (!pdfUrl) return <LoadingText />;

  return useIframe ? <PdfIframe src={pdfUrl} /> : <PdfViewer file={pdfUrl} />;
}
