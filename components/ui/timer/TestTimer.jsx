"use client";

import { useTimer } from "react-timer-hook";
import classes from "./TestTimer.module.css";

const totalTime = 7200;

export default function TestTimer() {
  let time = new Date();

  // Keeps time in localStorage, so that it doesn't reset on page refresh
  if (typeof window !== "undefined") {
    const storedTime = Number(JSON.parse(localStorage.getItem("time")));
    if (storedTime) {
      time.setSeconds(time.getSeconds() + storedTime);
    } else {
      time.setSeconds(time.getSeconds() + totalTime);
    }
  }

  return (
    <div className={classes.timerWrapper}>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, totalSeconds } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("time", JSON.stringify(totalSeconds));
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "70px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
