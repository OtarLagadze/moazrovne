import classes from "@/components/pagination/Pagination.module.css";
import Link from "next/link";

export function Pagination({ activePage, totalItems, itemsPerPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPaginationIndex = Math.floor((activePage - 1) / itemsPerPage) * itemsPerPage + 1;

  let currentPaginationNumbers = Array.from({ length: 5 }, (_, i) => startPaginationIndex + i).filter((num) => num <= totalPages);

  return (
    <div className={classes.pagination}>
      <ul className={classes.paginationUl}>
        {activePage > 1 ? (
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
          <Link
            href={`?page=${el}`}
            key={el}
            className={`${classes.paginationLi} ${
              +activePage === +el ? classes.active : ""
            }`}
          >
            {el}
          </Link>
        )}
        {activePage < totalPages ? (
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
