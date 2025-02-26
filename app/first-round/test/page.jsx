import Test from "@/components/test/Test";
import classes from "./page.module.css";
import { client } from "@/app/libs/sanity";

export const metadata = {
  title: "პირველი ტური - ტესტი",
  description:
    "მოაზროვნის ოლიმპიადის პირველი ტური, დაწერე ტესტი შემდეგ ეტაპზე გადასასვლელად",
};

async function getTest(grade, subject) {
  const query = `*[
          _type == "olympics" &&
          grade == "${grade}" &&
          subject == "${subject}"
        ]`;

  const data = await client.fetch(query);
  return data;
}

export default async function TestPage({ searchParams }) {
  const test = await getTest(searchParams.grade, searchParams.subject);
  const testLink = test[0]?.tests;

  const selectedSubject = () => {
    if (searchParams.subject === "math") {
      return "მათემატიკა";
    } else if (searchParams.subject === "georgian") {
      return "ქართული";
    } else if (searchParams.subject === "english") {
      return "ინგლისური";
    } else {
      return "მათემატიკა";
    }
  };

  let selectedGrade = Number(searchParams.grade);

  if (
    !Number.isInteger(selectedGrade) ||
    selectedGrade < 1 ||
    selectedGrade > 12
  ) {
    selectedGrade = 1;
  }

  return (
    <>
      <Test
        searchParams={searchParams}
        testLink={testLink}
        heading={`${selectedSubject()} ${selectedGrade} კლასი`}
      />
      ;
    </>
  );
}
