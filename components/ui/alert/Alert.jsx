"use client";

import Link from "next/link";
import classes from "./Alert.module.css";

export default function Alert({
  text,
  onAlertClose,
  shouldNavigateToTest = false,
  url,
}) {
  return (
    <>
      <div className={classes.alert}>
        <p
          className={classes.p}
          style={
            shouldNavigateToTest
              ? { fontSize: "18px", fontWeight: "400" }
              : { fontSize: "32px", fontWeight: "600" }
          }
        >
          {text}
        </p>
        {shouldNavigateToTest ? (
          <Link className={classes.start} href={url}>
            ტესტის დაწყება
          </Link>
        ) : (
          <button onClick={onAlertClose} className={classes.button}>
            გასაგებია
          </button>
        )}
      </div>
      <div onClick={onAlertClose} className={classes.background}></div>
    </>
  );
}
