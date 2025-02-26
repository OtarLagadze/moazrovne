import { client } from "@/app/libs/sanity";
import classes from "./BlogPagination.module.css";
import Link from "next/link";

async function getDataLength() {
  const query = `
    count(*[_type == 'blog'])
  `;

  const length = await client.fetch(query);
  return length;
}

export async function BlogPagination({ activePage }) {
  const dataLength = await getDataLength();

  const startPaginationIndex = Math.floor((activePage - 1) / 5) * 5 + 1;

  let currentPaginationNumbers = [
    startPaginationIndex,
    startPaginationIndex + 1,
    startPaginationIndex + 2,
    startPaginationIndex + 3,
    startPaginationIndex + 4,
  ];

  return (
    <div className={classes.pagination}>
      <ul className={classes.paginationUl}>
        {!(startPaginationIndex === 1 && activePage === 1) ? (
          <Link
            href={`?page=${activePage - 1}`}
            className={`${classes.paginationLi} ${classes.previous}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={classes.icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            წინა
          </Link>
        ) : (
          <div
            className={`${classes.paginationLi} ${classes.previous} ${classes.disabled}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={classes.icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            წინა
          </div>
        )}
        {currentPaginationNumbers.map((el) =>
          !(el <= Math.ceil(dataLength / 6)) ? (
            <div
              key={el}
              className={`${classes.paginationLi} ${classes.disabled}`}
            >
              {el}
            </div>
          ) : (
            <Link
              href={`?page=${el}`}
              key={el}
              className={`${classes.paginationLi} ${
                +activePage === +el ? classes.active : ""
              }`}
            >
              {el}
            </Link>
          )
        )}
        {activePage < Math.ceil(dataLength / 6) ? (
          <Link
            href={`?page=${activePage + 1}`}
            className={`${classes.paginationLi} ${classes.next}`}
          >
            შემდეგი
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={classes.icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        ) : (
          <div
            className={`${classes.paginationLi} ${classes.next} ${classes.disabled}`}
          >
            შემდეგი
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={classes.icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        )}
      </ul>
    </div>
  );
}
