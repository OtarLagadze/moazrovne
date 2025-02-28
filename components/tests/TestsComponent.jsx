"use client";

import dynamic from "next/dynamic";
const Filter = dynamic(() => import("@/components/tests/Filter"), {
  ssr: false,
});
import classes from "@/app/(navigation)/tests/page.module.css";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const classOptions = [
  { value: "union", label: "გაერთიანებული" },
  { value: "12", label: "აბიტურიენტები" },
  { value: "11", label: "11" },
  { value: "10", label: "10" },
  { value: "9", label: "9" },
  { value: "8", label: "8" },
  { value: "7", label: "7" },
  { value: "6", label: "6" },
  { value: "5", label: "5" },
  { value: "4", label: "4" },
  { value: "3", label: "3" },
  { value: "2", label: "2" },
  { value: "1", label: "1" },
];

const subjectOptions = [
  { value: "math", label: "მათემატიკა" },
  { value: "georgian", label: "ქართული" },
  { value: "english", label: "ინგლისური" },
];

export default function TestsComponent({ tests }) {
  const searchParams = useSearchParams();
  const currentGrade = searchParams.get("grade");

  const [selectedGrade, setSelectedGrade] = useState(
    currentGrade === "12" ? [{ value: "12", label: "აბიტურიენტები" }] : null
  );
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredTests = tests.filter((test) => {
    const gradeFilter =
      !selectedGrade ||
      selectedGrade.length === 0 ||
      selectedGrade.some((grade) => test.grade === grade.value);
    const subjectFilter =
      !selectedSubject ||
      selectedSubject.length === 0 ||
      selectedSubject.some((subject) => test.subject === subject.value);

    return gradeFilter && subjectFilter;
  });

  return (
    <>
      <div className={classes.filterWrapper}>
        <Filter
          options={classOptions}
          placeholder={"აირჩიეთ კლასი"}
          onChange={setSelectedGrade}
          defaultValue={selectedGrade}
        />
        <Filter
          options={subjectOptions}
          placeholder={"აირჩიეთ საგანი"}
          onChange={setSelectedSubject}
        />
      </div>
      <div className={classes.testWrapper}>
        {filteredTests.length === 0 && (
          <p className={classes.noTestText}>
            მოცემული ფილტრით ტესტი არ მოიძებნა
          </p>
        )}

        {filteredTests.map((test, i) => (
          <a
            href={test.test}
            key={test.test + i}
            className={classes.test}
            target="_blank"
            rel="noopener noreferrer"
          >
            {test.title}
            <div className={classes.testLabel}>
              {test.grade === "union" ? "U" : test.grade}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
