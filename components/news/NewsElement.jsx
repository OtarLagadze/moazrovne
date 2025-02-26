import Link from "next/link";
import classes from "./NewsElement.module.css";
import Image from "next/image";

export default function NewsElement({ imageSrc, alt, text, link, date }) {
  return (
    <Link href={link} className={classes.news}>
      <Image
        className={classes.newsImage}
        width={400}
        height={250}
        src={imageSrc}
        alt={alt || "მოაზროვნე სიახლე"}
      />
      <p className={classes.date}>{date}</p>
      <p className={classes.content}>{text || "სიახლე"}</p>
    </Link>
  );
}
