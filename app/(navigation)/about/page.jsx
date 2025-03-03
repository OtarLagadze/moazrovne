import Image from "next/image";
import classes from "./page.module.css";
import { client, urlFor } from "@/app/libs/sanity";
import Wave from "@/components/ui/wave";
import { PortableText } from "next-sanity";
import Link from "next/link";

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
      coworkers[] {
        firstName,
        lastName,
        role,
        "cvUrl": cv.asset->url
      }
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

      {data.coworkers?.length > 0 && (
        <section>
          <h2 className={classes.workerHeading}>ჩვენი თანამშრომლები</h2>
          <ul className={classes.workerList}>
            {data.coworkers.map((worker, index) => (
              <li key={index} className={classes.workerItem}>
                <h2 className={classes.workerName}>
                  {worker.firstName} {worker.lastName}
                </h2>
                <p className={classes.workerRole}>{worker.role}</p>
                {worker.cvUrl && (
                  <Link
                    href={worker.cvUrl}
                    className={classes.workerCV}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV-ის ნახვა
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
