import { client, urlFor } from "@/app/libs/sanity";
import Wave from "@/components/ui/wave";
import Image from "next/image";
import classes from "./page.module.css";
import Gallery from "@/components/gallery/Gallery";

export const revalidate = 30;

async function getData(slug) {
  const query = `
    *[_type == 'gallery' && slug.current == '${slug}'] {
      galleryImages,
        titleImage,
        title,
        slug
    }[0]
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function GalleryContentPage({ params }) {
  const data = await getData(params.slug);

  const transformToSlides = (inputArray) =>
    inputArray.map((item) => ({
      src: urlFor(item).url(),
    }));

  const slides = transformToSlides(data.galleryImages);

  return (
    <>
      <section>
        <h1 className={classes.mainHeading}>
          {data.title}
          <Wave color="var(--background-light-color)" xCord="0" yCord="10px" />
        </h1>
        <Gallery slides={slides} />
      </section>
    </>
  );
}
