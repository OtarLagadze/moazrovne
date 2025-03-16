import { useState } from "react";
import classes from "./Collapsible.module.css"

export default function Collapsible({ title, children, shift, style }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.collapsible}>
      <button className={classes.collapsibleButton} onClick={() => setIsOpen(!isOpen)} style={style}> 
        {title}
      </button>
      {isOpen && <div className={classes.collapsibleContent} style={{paddingLeft: (shift ? '5%' : '')}}>{children}</div>}
    </div>
  );
}
