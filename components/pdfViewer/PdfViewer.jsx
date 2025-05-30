"use client";

import { useEffect, useState } from "react";
import LoadingText from "@/app/loadingText";
import ScrollView from "./ScrollView";
import PaginatedView from "./PaginatedView";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.js";

export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(0);
  const [pdfDoc, setPdfDoc]     = useState(null);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (!file) return;

    setError("");
    pdfjsLib
      .getDocument(file)
      .promise.then((doc) => {
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      })
      .catch((err) => {
        console.error("PDF.js load error:", err);
        setError("Failed to load PDF");
      });
  }, [file]);

  if (error) return <div className={classes.error}>{error}</div>;
  if (!pdfDoc) return <LoadingText />;

  return numPages <= 20
    ? <ScrollView pdfDoc={pdfDoc} />
    : <PaginatedView pdfDoc={pdfDoc} />;
}
