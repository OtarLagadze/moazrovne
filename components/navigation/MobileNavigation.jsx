import Link from "next/link";
import classes from "./Navigation.module.css";
import navigationData from "@/data/navigation.json";
import { usePathname } from "next/navigation";

export default function MobileNavigation({ showMenu, onClick }) {
  const path = usePathname();
  return (
    <nav className={`${classes.mobileNav} ${showMenu ? classes.show : ""}`}>
      <ul className={classes.mobileUl}>
          {navigationData.map((el, i) => (
            <Link
              onClick={onClick}
              href={el.href}
              key={el.href + i}
              className={`${classes.link} ${
                path === el.href ? classes.active : ""
              }`}>
              <img src={`/svg/${el.icon}.svg`} className='icon'/>
              <p>{el.text}</p>
            </Link>
          ))}
      </ul>
    </nav>
  );
}
