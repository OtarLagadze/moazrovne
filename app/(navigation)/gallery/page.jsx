import Wave from "@/components/ui/wave";
import classes from "./GalleryPage.module.css";
import { client, urlFor } from "@/app/libs/sanity";
import GalleryCard from "@/components/gallery/GalleryCard";

export const revalidate = 30;

export const metadata = {
  title: "გალერია",
  description: "იხილეთ სურათები ოლიმპიადა მოაზროვნედან.",
};

async function getData() {
  const query = `
    *[_type == 'gallery'] {
      titleImage,
        title,
        slug   
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function GalleryPage() {
  const data = await getData();

  return (
    <>
      <section>
        <h1 className={classes.mainHeading}>
          გალერია
          <Wave color="var(--background-light-color)" xCord="0" yCord="10px" />
        </h1>
        <div className={classes.galleryCardWrapper}>
          {data.map((el, i) => (
            <GalleryCard
              key={el.title + i}
              title={el.title}
              link={el.slug.current}
              img={
                el?.titleImage
                  ? urlFor(el.titleImage).url()
                  : "/placeholder.webp"
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
