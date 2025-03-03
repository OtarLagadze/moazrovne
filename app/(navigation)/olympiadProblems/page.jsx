import OlympiadProblemsComponent from "@/components/olympiadProblems/OlympiadProblemsComponent";
import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";

export const revalidate = 30;

export const metadata = {
  title: "საერთაშორისო ოლიმპიადები",
  description: "მოემზადე მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის"
};

async function getData() {
  const query = `
    *[_type == 'olympiad_problems'] | order(date desc) {
      subfield,
      grade,
      title,
      "problem": olympiad_problems.asset->url
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function OlympiadProblemsPage() {
  const problems = await getData();
  return (
    <div>
      <h1 className={classes.mainHeading}>მოემზადე  მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის</h1>
      <OlympiadProblemsComponent problems={problems} />
    </div>
  );
}
