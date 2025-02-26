import Image from "next/image";
import Link from "next/link";
import classes from "./Gallery.module.css";

export default function GalleryCard({ link, title, img }) {
  return (
    <Link className={classes.galleryCard} href={`/gallery/${link}`}>
      <Image src={img} alt={title} width="300" height="300" />
      <p>{title}</p>
    </Link>
  );
}
