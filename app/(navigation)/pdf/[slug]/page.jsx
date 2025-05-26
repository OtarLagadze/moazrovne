"use client";

import { useEffect, useState } from "react";
import { useParams }         from "next/navigation";
import dynamic                from "next/dynamic";
import LoadingText            from "@/app/loadingText";
import PdfIframe             from "@/components/pdfViewer/PdfIframe";
import { Box, Button, Typography } from "@mui/material";

const PdfViewer = dynamic(
  () => import("@/components/pdfViewer/PdfViewer"),
  { ssr: false, loading: () => <LoadingText /> }
);

export default function PdfViewerPage() {
  const { slug } = useParams();
  const [pdfUrl, setPdfUrl]         = useState(null);
  const [useIframe, setUseIframe]   = useState(false);
  const [forceDownload, setForceDownload] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const proxyUrl = `/api/pdf?slug=${encodeURIComponent(slug)}`;

    const ua = navigator.userAgent;
    // more robust iOS version detection:
    const iOSmatch = ua.match(/OS (\d+)(?:[._]\d+)*/);
    const iOSver   = iOSmatch ? parseInt(iOSmatch[1], 10) : null;
    const isTooOldiOS  = iOSver !== null && iOSver < 15;

    // Android < 8 still needs an iframe
    const androidMatch = ua.match(/Android (\d+)(?:\.(\d+))?/);
    const androidVer   = androidMatch ? parseInt(androidMatch[1], 10) : null;
    const isOldAndroid = androidVer !== null && androidVer < 8;

    // 1) iOS < 15: redirect immediately into QuickLook
    if (isTooOldiOS) {
      window.location.href = proxyUrl;
      // also set a state in case manual fallback is needed
      setPdfUrl(proxyUrl);
      setForceDownload(true);
      return;
    }

    // 2) Android < 8: use <iframe>
    if (isOldAndroid) {
      setPdfUrl(proxyUrl);
      setUseIframe(true);
      return;
    }

    // 3) all other “modern” browsers: PDF.js
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
        console.error(err);
        setPdfUrl(proxyUrl);
        setUseIframe(true);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [slug]);

  if (!pdfUrl) return <LoadingText />;

  // DOWNLOAD / QUICKLOOK‐FALLBACK for iOS <15
  if (forceDownload) {
    return (
      <Box textAlign="center" p={8}>
        <Typography gutterBottom>
          თქვენს ბრაუზერს არ შეუძლია PDF-ის საიტში ჩვენება.<br/>
          თუ ფაილი ავტომატურად ვერ გაიხსნა, დააჭირეთ:
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.open(pdfUrl, "_blank")}
        >
          გახსნა
        </Button>
      </Box>
    );
  }

  // IFRAME‐fallback (Android <8)
  if (useIframe) {
    return <PdfIframe src={pdfUrl} />;
  }

  // PDF.js (modern)
  return <PdfViewer file={pdfUrl} />;
}
