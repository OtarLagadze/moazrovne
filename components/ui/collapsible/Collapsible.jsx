import { useState } from "react";
import classes from "./Collapsible.module.css"

export default function Collapsible({ title, children, shift }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.collapsible}>
      <button className={classes.collapsibleButton} onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div className={classes.collapsibleContent} style={{paddingLeft: (shift ? '5%' : '')}}>{children}</div>}
    </div>
  );
}
