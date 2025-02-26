import Link from "next/link";
import classes from "./not-found.module.css";

export const metadata = {
  title: "404 - გვერდი არ არსებობს",
};

export default function NotFound() {
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>404</h1>
      <p className={classes.paragraph}>მითითებული გვერდი არ არსებობს</p>
      <div className={classes.wrapper}>
        <Link href="/" className={classes.link}>
          <span>მთავარ გვერდზე დაბრუნება</span>
        </Link>
      </div>
    </div>
  );
}
