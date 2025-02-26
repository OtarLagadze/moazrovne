import Wave from "@/components/ui/wave";
import { client } from "@/app/libs/sanity";
import classes from "./page.module.css";
import Accordion from "@/components/ui/accordion/Accordion";

export const revalidate = 30;

export const metadata = {
  title: "ხშირად დასმული კითხვები",
  description: "მოაზროვნის ოლიმპიადის შესახებ ხშირად დასმული კითხვები",
};

async function getData() {
  const query = `
    *[_type == 'faq'] | order(_updatedAt desc) {
      faq,
        answer
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function FAQPage() {
  const faq = await getData();

  return (
    <div>
      <h1 className={classes.mainHeading}>
        ხშირად დასმული კითხვები
        <Wave color="var(--background-light-color)" xCord="0" yCord="10px" />
      </h1>
      <Accordion content={faq} />
    </div>
  );
}
