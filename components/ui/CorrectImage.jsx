import Image from "next/image";
import placeholder from "@/public/news/placeholder.webp";

export default function MyImage({ src, ...props }) {
  if (!src) {
    return <Image src={placeholder} {...props} />;
  }

  // Assuming local images start with a slash
  const isLocal =
    src.startsWith("/") ||
    src.includes("scontent.ftbs5-3.fna.fbcdn.net") || // I have these urls defined in next.config.mjs
    src.includes("scontent.ftbs5-2.fna.fbcdn.net") ||
    src.includes("scontent.ftbs5-1.fna.fbcdn.net");

  return isLocal ? (
    <Image src={src} {...props} /> // Use optimized Image for local images
  ) : (
    <img
      loading="lazy"
      src={src}
      style={{
        ...props.style,
        position: "absolute",
        height: "100%",
        width: "100%",
        left: "0",
        top: "0",
        right: "0",
        bottom: "0",
        color: "transparent",
      }}
      alt={props.alt}
    /> // Use regular img for remote images
  );
}
