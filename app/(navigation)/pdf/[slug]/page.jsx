"use client"

import { use } from "react";
import dynamic from "next/dynamic";
import LoadingText from "@/app/loadingText";

const PdfViewer = dynamic(() => import('@/components/pdfViewer/PdfViewer'), {
  ssr: false,
  loading: () => <LoadingText />,
});

export default function PdfViewerPage({ params }) {
  const { slug } = use(params);

  if (!slug) return null;

  const fileUrl = `https://cdn.sanity.io/files/8390afyw/production/${slug}.pdf`;

  return (
    <PdfViewer file={fileUrl} />
  );
}
