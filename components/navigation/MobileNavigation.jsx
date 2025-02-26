import Link from "next/link";
import classes from "./Navigation.module.css";
import navigationData from "@/data/navigation.json";

export default function MobileNavigation({ showMenu, onClick }) {
  return (
    <nav className={`${classes.mobileNav} ${showMenu ? classes.show : ""}`}>
      <ul className={classes.mobileUl}>
        {navigationData.map((el, i) => (
          <li key={el.href + i}>
            <Link onClick={onClick} className={classes.link} href={el.href}>
              {el.text}
            </Link>
          </li>
        ))}

        <li>
          <Link
            onClick={onClick}
            className={classes.mobileContact}
            href="/contact"
          >
            კონტაქტი
          </Link>
        </li>
      </ul>
    </nav>
  );
}
