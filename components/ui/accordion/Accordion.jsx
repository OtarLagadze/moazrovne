"use client";

import classes from "./Accordion.module.css";
import AccordionElement from "./AccordionElement";

export default function Accordion({ content }) {
  return (
    <div className={classes.accordion}>
      <div className={classes.accordionWrapper}>
        {content.map((el, i) => (
          <AccordionElement key={i} content={el} />
        ))}
      </div>
    </div>
  );
}
