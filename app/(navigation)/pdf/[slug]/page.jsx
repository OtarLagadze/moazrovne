"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LoadingText from "@/app/loadingText";
import PdfIframe from "@/components/pdfViewer/PdfIframe";
import { useParams } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

const PdfViewer = dynamic(() => import("@/components/pdfViewer/PdfViewer"), {
  ssr: false,
  loading: () => <LoadingText />,
});

export default function PdfViewerPage() {
  const { slug } = useParams();

  const [pdfUrl, setPdfUrl]           = useState(null);
  const [useIframe, setUseIframe]     = useState(false);
  const [forceDownload, setForceDownload] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const proxyUrl = `/api/pdf?slug=${encodeURIComponent(slug)}`;
    setPdfUrl(proxyUrl);

    const ua = navigator.userAgent;

    const iOSmatch     = ua.match(/OS (\d+)_/);
    const iOSver       = iOSmatch ? parseInt(iOSmatch[1], 10) : null;
    const isTooOldiOS  = iOSver !== null && iOSver < 15;
    const isOldiOS     = iOSver !== null && iOSver < 18;

    const androidMatch = ua.match(/Android (\d+)(?:\.(\d+))?/);
    const androidVer   = androidMatch ? parseInt(androidMatch[1], 10) : null;
    const isOldAndroid = androidVer !== null && androidVer < 8;

    // 1) iOS < 15: force download
    if (isTooOldiOS || isOldAndroid) {
      setForceDownload(true);
      return;
    }

    // 2) Android < 8: iframe
    if (isOldiOS) {
      setUseIframe(true);
      return;
    }

    // 3) Modern browsers (incl. Android ≥ 8): PDF.js
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

  // DOWNLOAD-FALLBACK (Android < 8, iOS < 15)
  if (forceDownload) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Typography variant="body1" gutterBottom>
          თქვენს მოწყობილობას არ შეუძლია PDF ფაილების საიტზე ჩამონტაჟება.
        </Typography>
        <Button
          variant="contained"
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          გადმოწერა
        </Button>
      </Box>
    );
  }

  // IFRAME-FALLBACK (iOS 15–17)
  if (useIframe) {
    return <PdfIframe src={pdfUrl} />
  }

  // PDF.JS VIEWER (modern browsers)
  return <PdfViewer file={pdfUrl} />;
}
