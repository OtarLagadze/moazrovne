import getDate from "@/app/libs/getDate";
import { client, urlFor } from "@/app/libs/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import classes from "./page.module.css";

export const revalidate = 30;

export async function generateStaticParams() {
  const query = `*[_type == "instruction"]{ "slug": slug.current }`;
  const data = await client.fetch(query);

  return data.map(item => ({
    slug: item.slug
  }));
}

async function getData(slug) {
  const query = `
    *[_type == 'instruction' && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      title,
      content,
      titleImage,
    }[0]
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function InstructionArticle({ params }) {
  const { slug } = await Promise.resolve(params);
  const data = await getData(slug);

  return (
    <section className={classes.section}>
      <h1 className={classes.title}>{data?.title}</h1>
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
