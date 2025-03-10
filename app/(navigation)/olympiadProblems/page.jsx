import OlympiadProblemsComponent from "@/components/olympiadProblems/OlympiadProblemsComponent";
import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";
import { OlympiadProblemsPagination } from "@/components/olympiadProblems/OlympiadProblemsPagination";

export const revalidate = 30;

export const metadata = {
  title: "საერთაშორისო ოლიმპიადები",
  description: "მოემზადე მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის",
};

async function getData() {
  const query = `
    *[_type == 'problems' && "საოლიმპიადო" in tags[]] | order(taskId desc) {
      taskId,
      statement,
      grade,
      tags,
      hints,
      hintPhotos,
      comments,
      commentPhotos,
      solution,
      solutionPhotos,
      photos,
      "currentSlug": slug.current
    }
  `;
  return await client.fetch(query);
}

export default async function OlympiadProblemsPage({ searchParams }) {
  const currentPage = searchParams.page && Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;
  const problems = await getData();

  return (
    <>
      <h1 className={classes.mainHeading}>მოემზადე  მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის</h1>
      <OlympiadProblemsComponent problems={problems} currentPage={currentPage} />
      <OlympiadProblemsPagination activePage={currentPage} totalItems={problems.length} />
    </>
  );
}

