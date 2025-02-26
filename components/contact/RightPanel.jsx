import { useEffect } from "react";
import classes from "./Contact.module.css";

export default function RightPanel({
  shouldDisplayPanel,
  handleClose,
  isSuccessful,
}) {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  return (
    <>
      <div
        className={`${classes.panel} ${
          shouldDisplayPanel ? classes.showPanel : classes.hidePanel
        }`}
      >
        <h2 className={classes.panelHeading}>დაგვიკავშირდით</h2>
        <hr className={classes.panelDivide} />

        {isSuccessful ? (
          <>
            <div className={classes.panelContentWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                style={{ width: "200px", height: "200px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            <p className={classes.successTextHeading}>
              მადლობა დაკავშირებისთვის!
            </p>
            <p className={classes.successText}>
              თქვენი შეტყობინება მიღებულია და ჩვენც მალევე დაგვიკავშირდებით
            </p>
          </>
        ) : (
          <>
            <div className={classes.panelContentWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={classes.errorSvg}
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className={classes.errorTextHeading}>
              რაღაც არასწორად წავიდა :(
            </p>
            <p className={classes.errorText}>
              გთხოვთ სცადოთ თავიდან გამოგზავნოთ შეტყობინება ან დაგვიკავშირდით
              ტელეფონის ნომერზე ან მოგვწერეთ ფეისბუქზე
            </p>
          </>
        )}

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close panel"
          className={classes.closeButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "24px", height: "24px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button
          onClick={handleClose}
          className={classes.closePanelButton}
          type="button"
          aria-label="Close panel"
        >
          დახურვა
        </button>
      </div>
      {shouldDisplayPanel && (
        <div
          onClick={handleClose}
          aria-label="Close panel"
          className={classes.panelBackground}
        ></div>
      )}
    </>
  );
}
