"use client";

import classes from "./error.module.css";
import Wave from "@/components/ui/wave";

export default function Error() {
  return (
    <section>
      <h1 className={classes.mainHeading}>
        რაღაც არასწორად წავიდა, <br /> გთხოვთ, სცადოთ მოგვიანებით
        <Wave color="var(--background-light-color)" xCord="0" yCord="10px" />
      </h1>
    </section>
  );
}
