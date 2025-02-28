import LessonsComponent from "@/components/lessons/LessonsComponent";
import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";
import TestsComponent from "@/components/tests/TestsComponent";

export const revalidate = 30;

export const metadata = {
  title: "გაკვეთილები",
  description: "მოემზადე მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის"
};

async function getData() {
  const query = `
    *[_type == 'lessons'] | order(date desc) {
      subfield,
      grade,
      title,
      "lesson": lessons.asset->url
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function LessonsPage() {
  const lessons = await getData();
  return (
    <div>
      <h1 className={classes.mainHeading}>მოემზადე  მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის</h1>
      <LessonsComponent lessons={lessons} />
    </div>
  );
}
