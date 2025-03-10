"use client";

import { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
const Filter = dynamic(() => import("@/components/olympiadProblems/Filter"), { ssr: false });
import classes from "@/app/(navigation)/tests/page.module.css";
import ProblemComponent from "../problem/ProblemComponent";

const classOptions = [
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
  { value: "ალგებრა", label: "ალგებრა" },
  { value: "გეომეტრია", label: "გეომეტრია" },
];

export default function OlympiadProblemsComponent({ problems, currentPage }) {
  const [selectedGrade, setSelectedGrade] = useState([]);
  const [selectedSubfield, setSelectedSubfield] = useState([]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const selectedGradeValues = (selectedGrade ?? []).map((grade) => parseInt(grade.value, 10));
      const gradeFilter =
        selectedGradeValues.length === 0 ||
        selectedGradeValues.some((grade) => problem.grade.from <= grade && problem.grade.to >= grade);

      const subfieldFilter =
        selectedSubfield.length === 0 ||
        selectedSubfield.some((subfield) => problem.tags.includes(subfield.value));

      return gradeFilter && subfieldFilter;
    });
  }, [problems, selectedGrade, selectedSubfield]);

  const itemsPerPage = 5;
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className={classes.filterWrapper}>
        <Filter options={classOptions} placeholder={"აირჩიეთ კლასი"} onChange={setSelectedGrade} />
        <Filter options={subfieldOptions} placeholder={"აირჩიეთ განხრა"} onChange={setSelectedSubfield} />
      </div>

      <div className={classes.testWrapper} style={{padding: '0px 10px 0px 10px'}}>
        {paginatedProblems.length === 0 && <p className={classes.noTestText}>ამ ფილტრისთვის ამოცანები არ მოიძებნა</p>}
        <Suspense fallback={<div>იტვირთება...</div>}>
          {paginatedProblems.map((problem) => (
            <ProblemComponent key={problem.taskId} problem={problem} />
          ))}
        </Suspense>
      </div>
    </>
  );
}
