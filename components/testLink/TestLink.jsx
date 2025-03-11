"use client"

import classes from './TestLink.module.css'

export default function TestLink({ data }) {
  if (!data) return;
  const { file, title } = data;
  return (
    <a
      href={file}
      key={file}
      className={classes.test}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
      <div className={classes.testLabel}>
        <img src='/svg/test.svg' alt="test icon" style={{width: "30px", height: "30px"}}/>
      </div>
    </a>
  )
}