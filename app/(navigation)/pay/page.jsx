import Wave from "@/components/ui/wave";
import classes from "./Page.module.css";
import Image from "next/image";
import bogLogo from "@/public/banks/bog.jpg";
import tbcLogo from "@/public/banks/tbc.png";

export const metadata = {
  title: "გადახდა",
  description:
    "გადაიხადეთ ოლიმპიადის საფასური საქართველოსა და თიბისის ანგარიშებზე",
};

export default function GalleryPage() {
  return (
    <>
      <section>
        <h1 className={classes.mainHeading}>
          გადახდა
          <Wave color="var(--background-light-color)" xCord="0" yCord="10px" />
        </h1>
        <h2 className={classes.secondHeading}>
          ოლიმპიადაში მონაწილეობის თანხა გადმორიცხეთ საბანკო ანგარიშებზე:
        </h2>
        <p className={classes.importantMessage}>
          * საბანკო გადარიცხვისას, გთხოვთ, დანიშნულებაში მიუთითეთ მოსწავლის
          სახელი, გვარი და მშობლის სახელი.
        </p>
        <div className={classes.cardWrapper}>
          <div className={classes.card}>
            <Image
              style={{ margin: "12px 0" }}
              src={bogLogo}
              alt="საქართველოს ბანკი"
            />
            <p className={classes.bankName}>BG/ საქართველოს ბანკი</p>
            <p className={classes.bankNumber}>GE30BG0000000590370400</p>
            <p className={classes.bankReceiver}>მიმღები: შპს მოაზროვნე</p>
          </div>
          <div className={classes.card}>
            <Image src={tbcLogo} alt="თიბისი ბანკი" />
            <p className={classes.bankName}>TBC/თიბისი ბანკი </p>
            <p className={classes.bankNumber}>GE25TB7739036020100010</p>
            <p className={classes.bankReceiver}>მიმღები: შპს მოაზროვნე</p>
          </div>
        </div>
      </section>
    </>
  );
}
