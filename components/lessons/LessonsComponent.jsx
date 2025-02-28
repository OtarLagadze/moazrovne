"use client";

import dynamic from "next/dynamic";
const Filter = dynamic(() => import("@/components/lessons/Filter"), {
  ssr: false,
});
import classes from "@/app/(navigation)/tests/page.module.css";
import { useState } from "react";

const classOptions = [
  { value: "union", label: "გაერთიანებული" },
  { value: "12", label: "12" },
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

const subfieldOptions = [
  { value: "algebra", label: "ალგებრა" },
  { value: "geometry", label: "გეომეტრია" },
];

export default function LessonsComponent({ lessons }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubfield, setSelectedSubfield] = useState(null);

  const filteredLessons = lessons.filter((lesson) => {
    const gradeFilter =
      !selectedGrade ||
      selectedGrade.length === 0 ||
      selectedGrade.some((grade) => lesson.grade === grade.value);
    const subfieldFilter =
      !selectedSubfield ||
      selectedSubfield.length === 0 ||
      selectedSubfield.some((subfield) => lesson.subfield === subfield.value);

    return gradeFilter && subfieldFilter;
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
          options={subfieldOptions}
          placeholder={"აირჩიეთ განხრა"}
          onChange={setSelectedSubfield}
        />
      </div>
      <div className={classes.testWrapper}>
        {filteredLessons.length === 0 && (
          <p className={classes.noTestText}>
            მოცემული ფილტრით გაკვეთილი არ მოიძებნა
          </p>
        )}

        {filteredLessons.map((lesson, i) => (
          <a
            href={lesson.lesson}
            key={lesson.lesson + i}
            className={classes.test}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lesson.title}
            { lesson.grade !== "union" && 
              <div className={classes.testLabel}>
                {lesson.grade}
              </div>
            }
          </a>
        ))}
      </div>
    </>
  );
}
