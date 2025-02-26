import Image from "next/image";
import classes from "./page.module.css";
import { client, urlFor } from "@/app/libs/sanity";
import Wave from "@/components/ui/wave";
import { PortableText } from "next-sanity";

export const revalidate = 30;

export const metadata = {
  title: "ჩვენს შესახებ",
  description:
    "ოლიმპიადის მიზანია მოსწავლეებში სწავლის ინტერესის გაღვივება, განსაკუთრებული ნიჭითა და მონდომებით გამორჩეული მოსწავლეების გამოვლენა და წახალისება.",
};

async function getData() {
  const query = `
    *[_type == 'about'] {
      title,
        titleImage,
        content,
    }[0]
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function AboutPage() {
  const data = await getData();

  return (
    <section>
      <h1 className={classes.mainHeading}>
        {data.title}
        <Wave color="var(--background-light-color)" xCord="0" yCord="200px" />
      </h1>
      <div className={classes.imageWrapper}>
        <Image
          alt={data?.title}
          className={classes.aboutImage}
          width={600}
          height={450}
          src={
            data?.titleImage
              ? urlFor(data.titleImage).url()
              : "/placeholder.webp"
          }
          priority
        />
      </div>

      <div className={`prose ${classes.contentWrapper}`}>
        <PortableText
          value={data?.content}
          components={{
            types: {
              image: ({ value }) => (
                <Image
                  className={classes.postImage}
                  width={600}
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
