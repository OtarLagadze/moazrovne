import Grade from "./Grade";
import classes from "./GradeWrapper.module.css";
import gradeData from "@/data/grade.json";

export default function GradeWrapper({ subject, selectedGrade }) {
  return (
    <div className={classes.gradeWrapper}>
      {gradeData.map((grade) => (
        <Grade
          key={grade.grade}
          subject={subject}
          selectedGrade={selectedGrade}
          grade={grade.grade}
          color={grade.color}
          hover={grade.hover}
        />
      ))}
    </div>
  );
}
