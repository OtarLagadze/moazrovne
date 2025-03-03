import Link from "next/link";
import classes from "./Navigation.module.css";
import { usePathname } from "next/navigation";
import navigationData from "@/data/navigation.json";

export default function DesktopNavigation() {
  const path = usePathname();

  return (
    <div className={classes.navHolder}>
      <nav className={classes.nav}>
        <ul>
          {navigationData.map((el, i) => (
            <Link
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
    </div>
  );
}
