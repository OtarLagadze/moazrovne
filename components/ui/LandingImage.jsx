"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./LandingImage.module.css";

import welcome1 from "@/public/welcome-photos/welcome1.jpeg";
import welcome2 from "@/public/welcome-photos/welcome2.jpeg";
import welcome3 from "@/public/welcome-photos/welcome3.jpeg";
import welcome4 from "@/public/welcome-photos/welcome4.jpeg";

export default function LandingImage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 2;
        if (prev === 2) return 3;
        if (prev === 3) return 0;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Image
        className={`${classes.heroImage} ${
          currentIndex === 0 ? classes.show : classes.hide
        }`}
        src={welcome1}
        alt="Photo of Rome"
        priority={true}
      />
      <Image
        className={`${classes.heroImage} ${
          currentIndex === 1 ? classes.show : classes.hide
        }`}
        src={welcome2}
        alt="Photo of Rome"
      />
      <Image
        className={`${classes.heroImage} ${
          currentIndex === 2 ? classes.show : classes.hide
        }`}
        src={welcome3}
        alt="Photo of Rome"
      />
      <Image
        className={`${classes.heroImage} ${
          currentIndex === 3 ? classes.show : classes.hide
        }`}
        src={welcome4}
        alt="Photo of Rome"
      />
    </>
  );
}
