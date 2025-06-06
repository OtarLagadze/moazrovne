import { client } from "@/app/libs/sanity";
import HeaderComponent from "@/components/ui/header/HeaderComponent";
import gradeOptions from "@/data/filterOptions/gradeOptions.json";
import mathSubfields from "@/data/filterOptions/mathSubfields.json";
import difficultyOptions from "@/data/filterOptions/difficultyOptions.json";
import topicOptions from "@/data/filterOptions/topicOptions.json";
import FilterableList from "@/components/filterableList/FilterableList";
import ProblemComponent from "@/components/problem/ProblemComponent";

export const revalidate = 30;

export const metadata = {
  title: "საერთაშორისო ოლიმპიადები",
  description: "მოემზადე მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის. მათემატიკის საერთაშორისო და საოლიმპიადო ამოცანები",
};

async function getData() {
  const query = `
    *[_type == 'problems'] | order(taskId desc) {
      taskId, statement, grade, difficulty, tags, hints, hintPhotos, comments, commentPhotos, solution, solutionPhotos, photos,
      "currentSlug": slug.current
    }
  `;
  return await client.fetch(query);
}

export default async function OlympiadProblemsPage({ searchParams }) {
  const problems = await getData();
  const resolvedSearchParams = await searchParams;

  const filters = [
    { key: "grade", options: gradeOptions, placeholder: "აირჩიეთ კლასი" },
    { key: "subfield", options: mathSubfields, placeholder: "აირჩიეთ განხრა" },
    { key: "topic", options: topicOptions, placeholder: "აირჩიეთ თემა" },
    { key: "difficulty", options: difficultyOptions, placeholder: "აირჩიეთ სირთულე" }
  ];

  return (
    <>
      <HeaderComponent text={'მოემზადე  მათემატიკის ეროვნული და საერთაშორისო ოლიმპიადებისთვის'}/>
      <FilterableList 
        searchParams={resolvedSearchParams} 
        data={problems}
        itemsPerPage={10}
        filters={filters}
        RenderComponent={ProblemComponent}
      />
    </>
  );
}