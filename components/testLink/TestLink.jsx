"use client";

import Link from "next/link";
import classes from './TestLink.module.css'

export default function TestLink({ data }) {
  if (!data) return null;
  const { file, title } = data;

  const pdfSlug = file.split('/').pop().split('.')[0];
  
  return (
    <Link href={`/pdf/${pdfSlug}`} className={classes.test} target='_blank'>
      {title}
      <div className={classes.testLabel}>
        <img src='/svg/test.svg' alt="test icon" style={{width: "30px", height: "30px"}}/>
      </div>
    </Link>
  );
}
