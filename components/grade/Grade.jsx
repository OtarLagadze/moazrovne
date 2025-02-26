import Link from "next/link";
import classes from "./Grade.module.css";

export default function Grade({
  grade,
  selectedGrade,
  color,
  hover,
  subject,
  activeColor = "#ffe2e2",
}) {
  return (
    <Link
      scroll={false}
      href={`?${new URLSearchParams({
        subject,
        grade,
      })}`}
      style={{
        "--grade-color": `${color}`,
        "--grade-hover-color": `${hover}`,
      }}
      className={`${classes.grade} ${
        +selectedGrade === +grade ? classes.active : ""
      }`}
    >
      <h3>{grade} კლასი</h3>
      <div className={classes.gradeHighlight}>{grade}</div>
    </Link>
  );
}
