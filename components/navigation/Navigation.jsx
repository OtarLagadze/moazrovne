"use client";

import { useState } from "react";

import classes from "./Navigation.module.css";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  function handleMenuClick() {
    setShowMenu((prev) => {
      if (!prev) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
      return !prev;
    });
  }

  function handleClick() {
    setShowMenu(false);
    document.body.style.overflow = "visible";
  }

  return (
    <>
      <DesktopNavigation className={classes.desktopNav}/>
      <button
        aria-label="Open navigation to check other sections"
        className={classes.menuBtn}
      >
        <label className={classes.hamburger}>
          <input
            type="checkbox"
            checked={showMenu}
            name="menu"
            onChange={handleMenuClick}
          />
          <svg viewBox="0 0 32 32">
            <path
              className={`${classes.lineTopBottom} ${classes.line}`}
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className={classes.line} d="M7 16 27 16"></path>
          </svg>
        </label>
      </button>
      <MobileNavigation onClick={handleClick} showMenu={showMenu} />
    </>
  );
}
