import { client } from "@/app/libs/sanity";
import HeaderComponent from "@/components/ui/header/HeaderComponent";
import TestLink from "@/components/testLink/TestLink";
import FilterableList from "@/components/filterableList/FilterableList";

export const revalidate = 30;

async function getData(type) {
  const query = `
    *[_type == '${type}'] | order(title desc) {
      title,
      "file": ${type}.asset->url
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function EntrantsSlug({ params, searchParams }) {
  const { slug } = await params;
  const data = await getData(slug);

  return (
    <>
      <HeaderComponent text={slug === 'nationalExams' ? 'ეროვნული გამოცდების ტესტები მითითებებით და პასუხებით' : 'სავარჯიშო ტესტები პასუხებით'}/>
      <FilterableList 
        searchParams={searchParams} 
        data={data}
        itemsPerPage={slug === 'nationalExams' ? 50 : 1000}
        RenderComponent={TestLink}
      />
    </>
  );
}
