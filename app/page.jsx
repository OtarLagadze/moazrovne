import BlogContent from "@/components/news/BlogContent";
import HeroSection from "@/components/Hero/HeroSection";

export const metadata = {
  title: "მოაზროვნე / Moazrovne",
  description:
    "დარეგისტრირდით მოაზროვნის ოლიმპიადაზე, მოხვდით მომავლის ბანაკში, მოიგეთ სხვადასხვა პრიზი და მიიღეთ დიპლომი ",
};

export default async function Home() {
  return (
    <>
      <HeroSection />
      <BlogContent />
    </>
  );
}
