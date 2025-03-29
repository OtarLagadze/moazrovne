import { client } from "@/app/libs/sanity";
import HeaderComponent from "@/components/ui/header/HeaderComponent";
import FilterableList from "@/components/filterableList/FilterableList";
import gradeOptions from "@/data/filterOptions/gradeOptions.json";
import ProblemComponent from "@/components/problem/ProblemComponent";
import TestLink from "@/components/testLink/TestLink";

export const revalidate = 30;

async function getData(slug) {
  const query = (slug === 'problemset' ?
    `
      *[_type == 'moazrovneProblems'] | order(taskId desc) {
        taskId,
        statement,
        grade,
        tags,
        solution,
        solutionPhotos,
        hints,
        hintPhotos,
        photos,
        "currentSlug": slug.current
      }
    ` 
    : 
    `
      *[_type == 'tests'] | order(testId desc) {
        title,
        grade,
        "file": tests.asset->url
      }
    `
  );
  return await client.fetch(query);
}

export default async function MoazrovneSlug({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const data = await getData(slug);

  const filters = [
    { key: "grade", options: gradeOptions, placeholder: "აირჩიეთ კლასი" }
  ];

  return (
    <>
      <HeaderComponent text={slug === 'problemset' ? 'სავარჯიშო ამოცანები' : 'სავარჯიშო ტესტები'}/>
      <FilterableList 
        searchParams={resolvedSearchParams} 
        data={data}
        itemsPerPage={slug === 'problemset' ? 10 : 20}
        filters={filters}
        RenderComponent={slug === 'problemset' ? ProblemComponent : TestLink}
      />
    </>
  );
}
