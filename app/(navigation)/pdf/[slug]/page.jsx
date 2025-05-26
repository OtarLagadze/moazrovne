"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import LoadingText from "@/app/loadingText";
import PdfIframe from "@/components/pdfViewer/PdfIframe";
import { Box, Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const PdfViewer = dynamic(() => import("@/components/pdfViewer/PdfViewer"), {
  ssr: false,
  loading: () => <LoadingText />,
});

export default function PdfViewerPage() {
  const { slug } = useParams();

  const [pdfUrl, setPdfUrl]             = useState(null);
  const [useIframe, setUseIframe]       = useState(false);
  const [forceDownload, setForceDownload] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const proxyUrl = `/api/pdf?slug=${encodeURIComponent(slug)}`;
    const ua = navigator.userAgent;

    // iOS detection
    const isAppleMobile = /iP(hone|od|ad)/.test(navigator.platform);
    let iOSver = null;
    if (isAppleMobile) {
      const m = ua.match(/OS (\d+)(?:[._]\d+)*/);
      if (m) iOSver = parseInt(m[1], 10);
    }

    // Android detection
    const androidMatch = ua.match(/Android (\d+)(?:\.(\d+))?/);
    const androidVer = androidMatch ? parseInt(androidMatch[1], 10) : null;

    // Decide viewer path:
    // 1) iOS < 15 → download
    if (iOSver !== null && iOSver < 15) {
      setPdfUrl(proxyUrl);
      setForceDownload(true);
      // immediately hand off to QuickLook
      window.location.href = proxyUrl;
      return;
    }

    // 2) Android < 8 OR (iOS 15–17) → iframe
    if ((androidVer !== null && androidVer < 8) ||
        (iOSver !== null && iOSver >= 15 && iOSver < 18)) {
      setPdfUrl(proxyUrl);
      setUseIframe(true);
      return;
    }

    // 3) All others (Android ≥ 8, iOS ≥ 18, desktop) → PDF.js
    setPdfUrl(proxyUrl);
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
        console.error("PDF.js load failed:", err);
        // fallback to iframe on error
        setUseIframe(true);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [slug]);

  // loading state
  if (!pdfUrl) {
    return <LoadingText />;
  }

  // DOWNLOAD‐FALLBACK (iOS < 15)
  if (forceDownload) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Typography variant="body1" gutterBottom>
          თქვენს მოწყობილობას არ შეუძლია PDF-ის სატიში ჩვენება.<br/>
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={() => window.open(pdfUrl, "_blank")}
        >
          გადმოწერა
        </Button>
      </Box>
    );
  }

  // IFRAME‐FALLBACK (Android < 8, iOS 15–17)
  if (useIframe) {
    return <PdfIframe src={pdfUrl} />;
  }

  // PDF.JS VIEWER (Android ≥ 8, iOS ≥ 18, desktop)
  return <PdfViewer file={pdfUrl} />;
}
