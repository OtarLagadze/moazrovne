import Link from "next/link";
import { client, urlFor } from "@/app/libs/sanity";
import getDate from "@/app/libs/getDate";
import NewsElement from "./NewsElement";
import classes from "./BlogContent.module.css";

export const revalidate = 30;

export async function getData() {
  const query = `
    *[_type == 'blog'] | order(date desc) {
      title,
        smallDescription,
        "currentSlug": slug.current,
        date,
        titleImage
    }[0..2]
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogContent() {
  const data = await getData();

  return (
    <section className={classes.article}>
      <h2 className={classes.secondHeading}>სიახლეები</h2>
      <div className={classes.newsWrapper}>
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
      </div>

      <Link href="/news" className={classes.newsBtn}>
        ყველა სიახლე
      </Link>
    </section>
  );
}
