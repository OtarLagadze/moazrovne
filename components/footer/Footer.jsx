import Link from "next/link";

import classes from "./Footer.module.css";
import FooterWave from "./FooterWave";
import navigationData from "@/data/navigation.json";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerWrapper}>
        <div>
          <h3 className={classes.footerHeading}>მენიუ</h3>
          <ul>
            {navigationData.map((el, i) => (
              <li className={classes.footerLi} key={el.href + i}>
                <Link className={classes.footerLink} href={el.href}>
                  {el.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={classes.footerHeading}>დაგვიკავშირდით</h3>
          <div className={classes.contactContainer}>
            <a href="tel:+995555100033" className={classes.footerLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classes.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              555 100 033
            </a>
            <a
              className={classes.footerLink}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/moazrovne2023"
            >
              <svg
                className={classes.fbLogo}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <linearGradient
                  id="Ld6sqrtcxMyckEl6xeDdMa"
                  x1="9.993"
                  x2="40.615"
                  y1="9.993"
                  y2="40.615"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#2aa4f4" />
                  <stop offset="1" stopColor="#007ad9" />
                </linearGradient>
                <path
                  fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
                  d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                />
                <path
                  fill="#fff"
                  d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                />
              </svg>
              მოგვწერეთ
            </a>
          </div>
        </div>
        <div>
          <h3 className={classes.footerHeading}>სხვა</h3>
          <ul>
            <li className={classes.footerLi}>
              <Link href="/faq" className={classes.footerLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={classes.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                ხშირად დასმული კითხვები
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className={classes.copyright}>
        ყველა უფლება დაცულია © მოაზროვნე {new Date().getFullYear()}.
      </p>
      <FooterWave />
    </footer>
  );
}
