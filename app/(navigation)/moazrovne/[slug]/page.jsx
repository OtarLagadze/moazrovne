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
      *[_type == 'problems' && "მოაზროვნეს" in tags[]] | order(taskId desc) {
        taskId,
        statement,
        grade,
        tags,
        solution,
        solutionPhotos,
        photos,
        "currentSlug": slug.current
      }
    ` 
    : 
    `
      *[_type == 'tests'] | order(title desc) {
        title,
        grade,
        "file": tests.asset->url
      }
    `
  );
  return await client.fetch(query);
}

export default async function MoazrovneSlug({ params, searchParams }) {
  const data = await getData(params.slug);

  const filters = [
    { key: "grade", options: gradeOptions, placeholder: "აირჩიეთ კლასი" }
  ];

  return (
    <>
      <HeaderComponent text={params.slug === 'problemset' ? 'სავარჯიშო ამოცანები' : 'სავარჯიშო ტესტები'}/>
      <FilterableList 
        searchParams={searchParams} 
        data={data}
        itemsPerPage={params.slug === 'problemset' ? 5 : 20}
        filters={filters}
        RenderComponent={params.slug === 'problemset' ? ProblemComponent : TestLink}
      />
    </>
  );
}
