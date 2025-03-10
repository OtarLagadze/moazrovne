import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";
import TestsComponent from "@/components/tests/TestsComponent";

export const revalidate = 30;

export const metadata = {
  title: "მოაზროვნეს ოლიმპიადა",
  description:
    "მოემზადე მოაზროვნეს ოლიმპიადებისთვის",
};

async function getData() {
  const query = `
    *[_type == 'tests'] | order(title desc) {
      subject,
        grade,
        title,
        "test": tests.asset->url
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function TestsPage() {
  const tests = await getData();

  return (
    <div>
      <h1 className={classes.mainHeading}>მოემზადე მოაზროვნეს ოლიმპიადებისთვის</h1>
      <TestsComponent tests={tests} />
    </div>
  );
}
