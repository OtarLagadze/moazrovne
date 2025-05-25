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
        </div>
      </section>
      <header className={classes.header}>
        <div className={classes.headerWrapper}>
          <div className={classes.headerTextWrapper}>
            <h1 className={classes.heading}>
              პირველი ტურის შედეგები გამოქვეყნდება ჩვენ ვებგვერდზე და ფბ გვერდზე 31 მაისამდე.
            </h1>
            <h1 className={classes.heading}>
              შეგახსენებთ, რომ ფინალურ ტურში იასპარეზებს პირველ ტურში მონაწილეთა ნახევარი.
            </h1>
            <h1 className={classes.heading}>
              ფინალური ტურის ჩატარების თარიღი და ადგილები გამოქვეყნდება ოლიმპიადის ჩატარებამდე 10 დღით ადრე.
            </h1>
          </div>
        </div>
      </header>
      <Wave color="var(--background-light-color)" xCord="0" yCord="0px" />
    </section>
  );
}
