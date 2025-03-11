import Link from "next/link";
import classes from "./page.module.css";
import HeaderComponent from "@/components/ui/header/HeaderComponent";

export const revalidate = 30;

export const metadata = {
  title: "მოაზროვნეს ოლიმპიადა",
  description: "მოაზროვნეს ოლიმპიადა. მოაზროვნეს სავარჯიშო ტესტები და ამოცანები",
};

export default async function EntrantsPage() {

  const cardData = [
    { text: "ამოცანები", link: "moazrovne/problemset" },
    { text: "ტესტები", link: "moazrovne/tests" }
  ];

  return (
    <>
      <HeaderComponent text={'მოაზროვნეს ოლიმპიადა'}/>
      <div className={classes.cardsWrapper}>
        {cardData.map((card, index) => (
          <Link key={index} href={card.link} className={classes.card}>
            {card.text}
          </Link>
        ))}
      </div>
    </>
  );
}
