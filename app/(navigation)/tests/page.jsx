import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";
import TestsComponent from "@/components/tests/TestsComponent";

export const revalidate = 30;

export const metadata = {
  title: "ტესტები",
  description:
    "მათემატიკის, ინგლისურისა და ქართულის ტესტები მოაზროვნის ოლიმპიადიდან",
};

async function getData() {
  const query = `
    *[_type == 'tests'] | order(date desc) {
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
      <h1 className={classes.mainHeading}>ტესტები</h1>
      <TestsComponent tests={tests} />
    </div>
  );
}
