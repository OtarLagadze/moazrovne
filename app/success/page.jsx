import Link from "next/link";
import classes from "./page.module.css";

export const metadata = {
  title: "შეტყობინება წარმატებით გაიგზავნა!",
};

export default function SuccessPage() {
  return (
    <section className={classes.section}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={classes.icon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <h1 className={classes.heading}>შეტყობინება წარმატებით გაიგზავნა!</h1>
      <p className={classes.paragraph}>
        მადლობა! შეტყობინება წარმატებით გაიგზავნა. <br /> მალე გიპასუხებთ!
      </p>
      <Link className={classes.link} href="/contact">
        უკან დაბრუნება
      </Link>
    </section>
  );
}
