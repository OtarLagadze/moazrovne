import classes from "./Contact.module.css";

export default function ContactInformation() {
  return (
    <div>
      <h1 className={classes.contactHeading}>
        საკონტაქტო <br /> ინფორმაცია
      </h1>
      <p className={classes.contactParagraph}>
        დაგვიკავშირდით ფეისბუქზე ან დაგვირეკეთ
      </p>
      <div className={classes.contactContainer}>
        <a href="tel:+995557987897" className={classes.contactLink}>
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
          557 987 897{" "}
        </a>
        <hr style={{ color: "rgb(0,0,0,0.1)" }} />
        <a
          className={classes.contactLink}
          href="https://www.facebook.com/moazrovne2023"
          // target="_blank"
          rel="noreferrer"
        >
          <svg
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
  );
}
