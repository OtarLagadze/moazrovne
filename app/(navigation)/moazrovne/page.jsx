import Link from "next/link";
import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";
import HeaderComponent from "@/components/ui/header/HeaderComponent";
import gradeData from "@/data/grade.json";

export const revalidate = 30;

export const metadata = {
  title: "მოაზროვნეს ოლიმპიადა",
  description: "მოაზროვნეს ოლიმპიადა. მოაზროვნეს სავარჯიშო ტესტები და ამოცანები",
};

async function getBooks() {
  const query = `
    *[_type == 'practiceBook'] | order(date, asc) {
        title,
        "link": practiceBook.asset->url
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function EntrantsPage() {
  const books = await getBooks();

  console.log(books);

  const cardData = [
    { text: "სავარჯიშო ამოცანები II-III-IV-V-VI კლასები", link: "moazrovne/problemset" },
    { text: "სავარჯიშო ტესტები II-III-IV-V-VI კლასები", link: "moazrovne/tests" }
  ];

  return (
    <>
      <HeaderComponent text={'მოაზროვნეს ოლიმპიადა'}/>
      <div className={classes.cardsWrapper}>
        {cardData.map((card, index) => (
          <Link key={index} href={card.link} className={classes.card} style={{backgroundColor: `${gradeData[11 - index].color}`}}>
            {card.text}
          </Link>
        ))}
        <a
          href={books[2].link}
          className={classes.card}
          target="_blank"
          rel="noopener noreferrer"
          style={{backgroundColor: `${gradeData[9].color}`}}
        >
          {books[2].title}
        </a>
        <a
          href={books[1].link}
          className={classes.card}
          target="_blank"
          rel="noopener noreferrer"
          style={{backgroundColor: `${gradeData[8].color}`}}
        >
          მოსამზადებელი კრებული V-VI კლასი
        </a>
        <a
          href={'gallery/onlain-gakvetilebi-5-6-klasis-mostsavleebistvis'}
          className={classes.card}
          rel="noopener noreferrer"
          style={{backgroundColor: `${gradeData[7].color}`}}
        >
          ონლაინ გაკვეთილები V-VI კლასის მოსწავლეებისთვის
        </a>
      </div>
    </>
  );
}
