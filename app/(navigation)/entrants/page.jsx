import Link from "next/link";
import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";
import HeaderComponent from "@/components/ui/header/HeaderComponent";

export const revalidate = 30;

export const metadata = {
  title: "აბიტურიენტის გვერდი",
  description: "აბიტურიენტის გვერდი, ეროვნული გამოცდების ტესტები მითითებებით და პასუხებით, სავარჯიშო ტესტები პასუხებით, მოსამზადებელი კრებული",
};

async function getBook() {
  const query = `
    *[_type == 'practiceBook'] {
        "link": practiceBook.asset->url
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function EntrantsPage() {
  const book = await getBook();

  const cardData = [
    { text: "ეროვნული გამოცდების ტესტები მითითებებით და პასუხებით", link: "entrants/nationalExams" },
    { text: "სავარჯიშო ტესტები პასუხებით", link: "entrants/practiceTests" }
  ];

  return (
    <>
      <HeaderComponent text={'აბიტურიენტის გვერდი'}/>
      <div className={classes.galleryCardWrapper}>
        {cardData.map((card, index) => (
          <Link key={index} href={card.link} className={classes.card}>
            {card.text}
          </Link>
        ))}
        <a
          href={book[0].link}
          key={book[0].link}
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
