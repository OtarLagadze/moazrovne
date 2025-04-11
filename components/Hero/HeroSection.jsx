import classes from "./HeroSection.module.css";
import Wave from "@/components/ui/wave";
import Link from "next/link";
import LandingImage from "@/components/ui/LandingImage";

export default function HeroSection() {
  return (
    <section className={classes.heroSection}>
      <header className={classes.header}>
        <div className={classes.headerWrapper}>
          <div className={classes.imgWrapper}>
            <LandingImage />
          </div>
          <div className={classes.headerTextWrapper}>
            <h1 className={classes.heading}>
              ჩაერთე ოლიმპიადაში, იაზროვნე, მოიგე ბარსელონას საგზური და ფასიანი საჩუქრები! 
            </h1>
            {/* <p className={classes.headerParagraph}>
              გამარჯვებულებს ასევე ელოდებათ მოაზროვნეს ბანაკში ფასდაკლების ვაუჩერები!
            </p> */}
            <Link href="/moazrovne" className={classes.roundLink}>
              მოემზადე I ტურისათვის
            </Link>
            <Link href="/instruction" className={classes.roundLink}>
              როგორ ჩავერთო ოლიმპიადაში
            </Link>
          </div>
        </div>
        <Wave color="var(--background-light-color)" xCord="0" yCord="50px" />
      </header>
    </section>
  );
}
