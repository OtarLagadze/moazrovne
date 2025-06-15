import classes from "./PostEvent.module.css";
import Wave from "@/components/ui/wave";
import Link from "next/link";

export default function PostEvent() {
  return (
    <section className={classes.heroSection}>
      <section className={classes.instructionWrapper}>
        <div className={classes.cardsWrapper}>
          <Link href={`/instruction`} className={classes.card}>
            მათემატიკის ოლიმპიადა III-IV-V-VI კლასელებისთვის
          </Link>
          <Link href={`/moazrovne/eventTests`} className={classes.card}>
            მოაზროვნეს მათემატიკის ოლიმპიადის პირველ ტურზე გამოყენებული ამოცანები
          </Link>
          <Link href={`/pdf/03ac53b0c1eeca9d2a6d3cd0803623fb7c1de969`} className={classes.card}>
            მოაზროვნეს მათემატიკის ოლიმპიადის ფინალში გადასულ მოსწავლეთა სია 
          </Link>
        </div>
      </section>
      <header className={classes.header}>
        <div className={classes.headerWrapper}>
          <div className={classes.headerTextWrapper}>
            <h1 className={classes.heading}>
              მოაზროვნეს მათემატიკის ოლიმპიადის ფინალური ტური გაიმართება 22 ივნისს.
            </h1>
          </div>
        </div>
      </header>
      <Wave color="var(--background-light-color)" xCord="0" yCord="0px" />
    </section>
  );
}
