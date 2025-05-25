import classes from "./Announcement.module.css";
import Wave from "@/components/ui/wave";
import Link from "next/link";
import LandingImage from "@/components/ui/LandingImage";
import HeaderComponent from "@/components/ui/header/HeaderComponent";
import InstructionList from "@/app/(navigation)/instruction/page";

export default function Announcement() {
  return (
    <section className={classes.heroSection}>
      <HeaderComponent text={"მათემატიკის ოლიმპიადა III-IV-V-VI კლასელებისთვის"}/>
      <div className={classes.instructionWrapper}>
        <InstructionList />
      </div>
      <header className={classes.header}>
        <div className={classes.headerWrapper}>
          <div className={classes.imgWrapper}>
            <LandingImage />
          </div>
          <div className={classes.headerTextWrapper}>
            <h1 className={classes.heading}>
              ჩაერთე ოლიმპიადაში, იაზროვნე, მოიგე რომის საგზური და ფასიანი საჩუქრები!
            </h1>
            <h1 className={classes.subHeading}>
              პირველი ტური ჩატარდება 24 მაისს
            </h1>
            <Link href="/moazrovne" className={classes.roundLink}>
              მოემზადე I ტურისათვის
            </Link>
            {/* <Link href="/instruction" className={classes.roundLink}>
              როგორ ჩავერთო ოლიმპიადაში
            </Link> */}
          </div>
        </div>
        <Wave color="var(--background-light-color)" xCord="0" yCord="20px" />
      </header>
    </section>
  );
}
