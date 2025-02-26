import Image from "next/image";
import classes from "./Images.module.css";

export default function Images({ data, onClick }) {
  const handleClickImage = (index) => {
    onClick(index);
  };

  return (
    <div className={classes.imagesContainer}>
      {data.map((slide, index) => (
        <div
          onClick={() => handleClickImage(index)}
          key={index}
          className={classes.image}
        >
          <Image
            width={376}
            height={240}
            src={slide.src}
            alt={slide.description || "მოაზროვნე"}
          />
        </div>
      ))}
    </div>
  );
}
