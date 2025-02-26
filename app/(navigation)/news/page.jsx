import { client, urlFor } from "@/app/libs/sanity";
import { Suspense } from "react";
import NewsElement from "@/components/news/NewsElement";
import getDate from "@/app/libs/getDate";
import classes from "./page.module.css";
import Wave from "@/components/ui/wave";
import { BlogPagination } from "@/components/news/BlogPagination";

export const revalidate = 30;

export const metadata = {
  title: "სიახლეები / news",
  description:
    "ნახეთ მოაზროვნე-ს უახლესი სიახლეები და მიიღეთ ინფორმაცია ოლიმპიადის შესახებ",
};
async function getData(currentPage) {
  // if currentPage === 1, it returns 5, if it is 2, it returns 11. I want it to create this kind of array [0, 5] for quering
  let endIndex = currentPage * 5 + (currentPage - 1);

  const query = `
    *[_type == 'blog'] | order(date desc) {
      title,
        smallDescription,
        "currentSlug": slug.current,
        date,
        titleImage
    }[${endIndex - 5}..${endIndex}]
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function NewsPage({ searchParams }) {
  const currentPage =
    searchParams.page && Number(searchParams.page) > 0
      ? Number(searchParams.page)
      : 1;

  const data = await getData(currentPage);

  return (
    <>
      <h1 className={classes.mainHeading}>
        სიახლეები{" "}
        <Wave color="var(--background-light-color)" xCord="0" yCord="10px" />
      </h1>
      <div className={classes.newsWrapper}>
        <Suspense fallback={<div>იტვირთება...</div>}>
          {data.map((post, i) => (
            <NewsElement
              key={post?.currentSlug}
              alt={post?.title}
              imageSrc={
                post.titleImage
                  ? urlFor(post?.titleImage).url()
                  : "/placeholder.webp"
              }
              text={post?.title}
              date={getDate(post?.date)}
              link={`/news/${post?.currentSlug}`}
            />
          ))}
        </Suspense>
      </div>
      <BlogPagination activePage={currentPage} />
    </>
  );
}
