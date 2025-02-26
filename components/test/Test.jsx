"use client";

import Wave from "@/components/ui/wave";
import classes from "./Test.module.css";
import Fallback from "@/components/ui/Fallback";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
const TestTimer = dynamic(() => import("../ui/timer/TestTimer"), {
  ssr: false,
});

export default function Test({ heading, searchParams, testLink }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const selectedSubject = () => {
    if (searchParams.subject === "math") {
      return "მათემატიკის";
    } else if (searchParams.subject === "georgian") {
      return "ქართულის";
    } else if (searchParams.subject === "english") {
      return "ინგლისურის";
    } else {
      return "მათემატიკის";
    }
  };

  const selectedGrade = () => {
    const grade = Number(searchParams.grade);
    if (grade === 1) return "პირველი";
    else return `მე-${grade}`;
  };

  useEffect(() => {
    if (!testLink) {
      setIsLoaded(true);
    }
  }, [testLink]);

  return (
    <section>
      <div className={classes.headingWrapper}>
        <h1 className={classes.heading}>{heading}</h1>
        <Wave
          color="var(--background-light-color)"
          xCord="0"
          yCord={testLink ? "150px" : "40px"}
        />
        {testLink && <TestTimer />}
      </div>
      <div
        className={`${classes.formsWrapper} 
        ${isLoaded ? "" : classes.hidden}
        `}
      >
        {testLink ? (
          <iframe
            src={testLink}
            width="940"
            height="1350"
            frameBorder="0"
            onLoad={() => {
              setIsLoaded(true);
            }}
          ></iframe>
        ) : (
          <div className={classes.fallbackWrapper}>
            <h2>
              სამწუხაროდ, {selectedSubject()} {selectedGrade()} კლასის ტესტი ჯერ
              არ არის დამატებული
            </h2>
            <p>
              გთხოვთ, გადაამოწმოთ{" "}
              <Link href={"/first-round"}>სხვა ტესტები</Link>
            </p>
          </div>
        )}
      </div>
      {!isLoaded && (
        <div className={classes.spinner}>
          <Fallback />
        </div>
      )}
    </section>
  );
}
