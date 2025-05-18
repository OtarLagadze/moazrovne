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
          იმისთვის, რომ მოსწავლე დარეგისტრირდეს ოლიმპიადის პირველ ტურზე, გთხოვთ, თანხის გადმორიცხვის დროს
        </h2>
        <li className={classes.importantMessage}>
          დანიშნულებაში მიუთითოთ ოლიმპიადაში მონაწილე მოსწავლის კოდი რომელიც მას მიენიჭა www.moazrovne.edu.ge საიტზე რეგისტრაციის დროს.
        </li>
        <h2 style={{textAlign: 'center', marginTop: '25px'}}>ან</h2>
        <li className={classes.importantMessage}>
          დანიშნულებაში მიუთითოთ ოლიმპიადაში მონაწილე მოსწავლის სახელი, გვარი, კლასი, პირადი ნომერი (მოსწავლის ან მშობლის) და ქალაქის სახელი, სადაც გსურთ მონაწილეობის მიღება (თბილისი, ბათუმი, რუსთავი, ქუთაისი, ზუგდიდი).
        </li>
        <div className={classes.cardWrapper}>
          <div className={classes.card}>
            <Image
              style={{ margin: "12px 0" }}
              src={bogLogo}
              alt="საქართველოს ბანკი"
            />
            <p className={classes.bankName}>BG/საქართველოს ბანკი</p>
            <p className={classes.bankNumber}>GE30BG0000000590370400GEL</p>
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
