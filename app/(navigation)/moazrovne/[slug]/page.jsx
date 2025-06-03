import { client } from "@/app/libs/sanity";
import HeaderComponent from "@/components/ui/header/HeaderComponent";
import FilterableList from "@/components/filterableList/FilterableList";
import gradeOptions from "@/data/filterOptions/gradeOptions.json";
import ProblemComponent from "@/components/problem/ProblemComponent";
import TestLink from "@/components/testLink/TestLink";

export const revalidate = 30;

async function getData(slug) {
  let query;

  if (slug === "problemset") {
    query = `
      *[_type == 'moazrovneProblems'] | order(taskId desc) {
        taskId,
        statement,
        grade,
        tags,
        solution,
        solutionPhotos,
        hints,
        hintPhotos,
        answer,
        answerPhotos,
        photos,
        "currentSlug": slug.current
      }
    `;
  } else if (slug === "tests") {
    query = `
      *[_type == 'tests'] | order(testId desc) {
        title,
        grade,
        "file": tests.asset->url
      }
    `;
  } else if (slug === "eventTests") {
    query = `
      *[_type == 'eventTests'] | order(testId desc) {
        title,
        grade,
        "file": tests.asset->url
      }
    `;
  } else {
    return [];
  }

  return client.fetch(query);
}

export default async function MoazrovneSlug({ params, searchParams }) {
  const { slug } = params; 
  const resolvedSearchParams = await searchParams;
  const data = await getData(slug);

  const filters = [
    { key: "grade", options: gradeOptions, placeholder: "აირჩიეთ კლასი" }
  ];

  const isProblemSet = slug === "problemset";
  const isTest       = slug === "tests" || slug === "eventTests";
  const headerText   = isProblemSet
    ? "სავარჯიშო ამოცანები"
    : slug === "tests"
    ? "სავარჯიშო ტესტები"
    : "ოლიმპიადაზე გამოყენებული ტესტები";

  const itemsPerPage = isProblemSet ? 15 : 20;
  const RenderComp   = isProblemSet ? ProblemComponent : TestLink;

  return (
    <>
      <HeaderComponent text={headerText} />
      <FilterableList
        searchParams={resolvedSearchParams}
        data={data}
        itemsPerPage={itemsPerPage}
        filters={filters}
        RenderComponent={RenderComp}
      />
    </>
  );
}
