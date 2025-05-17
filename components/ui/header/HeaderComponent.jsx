"use client"

import classes from "./HeaderComponent.module.css";

export default function HeaderComponent({ text }) {
  return (
    <h1 className={classes.mainHeading}>{ text }</h1>
  );
}