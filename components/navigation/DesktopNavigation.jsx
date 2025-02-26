import Link from "next/link";
import classes from "./Navigation.module.css";
import { usePathname } from "next/navigation";
import navigationData from "@/data/navigation.json";

export default function DesktopNavigation() {
  const path = usePathname();

  return (
    <>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          {navigationData.map((el, i) => (
            <li key={el.href + i}>
              <Link
                href={el.href}
                className={`${classes.link} ${
                  path === el.href ? classes.active : ""
                }`}
              >
                {el.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link href="/contact" className={classes.contact}>
        კონტაქტი
      </Link>
    </>
  );
}
