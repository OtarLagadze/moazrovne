"use client";

import { PortableText } from "next-sanity";
import classes from "./Accordion.module.css";
import { useState } from "react";

export default function AccordionElement({ content }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive((prev) => !prev);
  }
  return (
    <div
      className={`${classes.contentWrapper} ${isActive ? classes.active : ""}`}
    >
      <button onClick={handleClick} className={classes.contentHeading}>
        {content?.faq}
        <span
          className={`${classes.arrowDownClose} ${
            isActive ? classes.open : ""
          }`}
        ></span>
      </button>
      <div className={`${classes.content} prose`}>
        <PortableText value={content?.answer} />
      </div>
    </div>
  );
}
