import getDate from "@/app/libs/getDate";
import { client, urlFor } from "@/app/libs/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import classes from "./page.module.css";

export const revalidate = 30;

async function getData(slug) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
      "currentSlug": slug.current,
        smallDescription,
        title,
        content,
        titleImage,
        date
    }[0]
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({ params }) {
  const data = await getData(params.slug);

  return (
    <section className={classes.section}>
      <p className={classes.date}>{getDate(data?.date)}</p>
      <h1 className={classes.title}>{data?.title}</h1>
      <Image
        className={classes.postImage}
        width={636}
        height={400}
        alt={data?.title}
        src={
          data?.titleImage ? urlFor(data.titleImage).url() : "/placeholder.webp"
        }
        priority
      />
      <div className="prose">
        <PortableText
          value={data?.content}
          components={{
            types: {
              image: ({ value }) => (
                <Image
                  className={classes.postImage}
                  width={636}
                  height={450}
                  alt={value?.alt || data.title}
                  src={value ? urlFor(value).url() : "/placeholder.webp"}
                />
              ),
            },
          }}
        />
      </div>
    </section>
  );
}
