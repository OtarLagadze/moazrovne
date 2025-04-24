"use client";
import dynamic from "next/dynamic";

const PixelTracker = dynamic(
  () => import("./PixelTracker"), 
  { ssr: false }
);

export default function Pixel() {
  return <PixelTracker />;
}