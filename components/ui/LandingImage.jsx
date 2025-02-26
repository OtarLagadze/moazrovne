"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./LandingImage.module.css";

import welcome1 from "@/public/welcome-photos/welcome-1.webp";
import welcome2 from "@/public/welcome-photos/welcome-2.webp";
import welcome3 from "@/public/welcome-photos/welcome-3.webp";

export default function LandingImage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 2;
        if (prev === 2) return 0;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Image
        className={`${classes.heroImage} ${
          currentIndex === 0 ? classes.show : classes.hide
        }`}
        src={welcome1}
        alt="School children, who are happy in class room and are writing test"
        priority={true}
      />
      <Image
        className={`${classes.heroImage} ${
          currentIndex === 1 ? classes.show : classes.hide
        }`}
        src={welcome2}
        alt="Student who is writing homework"
      />
      <Image
        className={`${classes.heroImage} ${
          currentIndex === 2 ? classes.show : classes.hide
        }`}
        src={welcome3}
        alt="Students are happy and are writing homework"
      />
    </>
  );
}
