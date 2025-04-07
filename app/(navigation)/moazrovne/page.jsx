import Link from "next/link";
import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";
import HeaderComponent from "@/components/ui/header/HeaderComponent";

export const revalidate = 30;

export const metadata = {
  title: "მოაზროვნეს ოლიმპიადა",
  description: "მოაზროვნეს ოლიმპიადა. მოაზროვნეს სავარჯიშო ტესტები და ამოცანები",
};

async function getBook() {
  const query = `
    *[_type == 'practiceBook'] | order(date, asc) {
        "link": practiceBook.asset->url
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function EntrantsPage() {
  const book = await getBook();

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
        <a
          href={book[1].link}
          key={book[1].link}
          className={classes.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          მოსამზადებელი კრებული
        </a>
      </div>
    </>
  );
}
