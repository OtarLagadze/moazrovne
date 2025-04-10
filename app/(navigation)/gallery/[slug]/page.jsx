import { client, urlFor } from "@/app/libs/sanity";
import Wave from "@/components/ui/wave";
import Gallery from "@/components/gallery/Gallery";
import classes from "./page.module.css";

export const revalidate = 30;

async function getData(slug) {
  const query = `
    *[_type == 'gallery' && slug.current == $slug][0] {
      galleryImages,
      titleImage,
      title,
      links,
      slug
    }
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function GalleryContentPage({ params }) {
  const data = await getData(params.slug);

  if (!data) {
    return <p className={classes.error}>მონაცემები არ მოიძებნა</p>;
  }

  const transformToSlides = (inputArray) =>
    inputArray?.map((item) => ({
      src: urlFor(item).url(),
    }));

  const slides = transformToSlides(data.galleryImages);

  return (
    <section>
      <h1 className={classes.mainHeading}>
        {data.title}
        <Wave color="var(--background-light-color)" xCord="0" yCord="10px" />
      </h1>

      <Gallery slides={slides} />

      <div className={classes.videoGrid}>
        {data.links?.map((link, i) => (
          <div key={i} className={classes.videoWrapper}>
            <iframe
              src={link}
              title={`YouTube video ${i + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={classes.video}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
