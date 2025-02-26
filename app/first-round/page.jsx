import Link from "next/link";
import classes from "./page.module.css";
import GradeWrapper from "@/components/grade/GradeWrapper";
import StartButton from "@/components/grade/StartButton";

export const metadata = {
  title: "პირველი ტური",
  description:
    "მოაზროვნის ოლიმპიადის პირველი ტური, დაწერე ტესტი შემდეგ ეტაპზე გადასასვლელად",
};

export default function ChoosePage({ searchParams }) {
  const selectedSubject = searchParams.subject;
  const selectedGrade = Number(searchParams.grade);

  return (
    <section className={classes.section}>
      <h1 className={classes.heading}>აირჩიე საგანი</h1>
      <div className={classes.linkWrapper}>
        <Link
          scroll={false}
          href={`?${new URLSearchParams({
            subject: "math",
            grade: selectedGrade,
          })}`}
          className={`${classes.subjectLink} ${
            selectedSubject === "math" && classes.active
          }`}
        >
          მათემატიკა
        </Link>
        <Link
          scroll={false}
          href={`?${new URLSearchParams({
            subject: "georgian",
            grade: selectedGrade,
          })}`}
          className={`${classes.subjectLink} ${
            selectedSubject === "georgian" && classes.active
          }`}
        >
          ქართული
        </Link>
        <Link
          scroll={false}
          href={`?${new URLSearchParams({
            subject: "english",
            grade: selectedGrade,
          })}`}
          className={`${classes.subjectLink} ${
            selectedSubject === "english" && classes.active
          }`}
        >
          ინგლისური
        </Link>
      </div>
      <h2 className={classes.subHeading}>აირჩიე კლასი</h2>
      <GradeWrapper selectedGrade={selectedGrade} subject={selectedSubject} />
      <div className={classes.startWrapper}>
        <StartButton
          selectedSubject={selectedSubject}
          selectedGrade={selectedGrade}
          searchParams={searchParams}
        />
      </div>
    </section>
  );
}
