"use client";

import { useRouter } from "next/navigation";
import classes from "./StartButton.module.css";
import { useEffect, useState } from "react";
import Alert from "@/components/ui/alert/Alert";

export default function StartButton({
  selectedSubject,
  selectedGrade,
  searchParams,
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [shouldNavigateToTest, setShouldNavigateToTest] = useState(false);

  function handleAlertOpen() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  function handleAlertClose() {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    function listenKeys(e) {
      if (e.key === "Escape") {
        handleAlertClose();
      }
    }

    window.addEventListener("keydown", listenKeys);

    return () => {
      window.removeEventListener("keydown", listenKeys);
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleStart() {
    // validate selectedSubject and selectedGrade in order to prevent the user from starting the test without selecting a subject or a grade, or manipulating the URL
    if (
      (!selectedSubject && !selectedGrade) ||
      (!(
        +selectedGrade > 0 &&
        +selectedGrade < 13 &&
        Number.isInteger(selectedGrade)
      ) &&
        selectedSubject !== "math" &&
        selectedSubject !== "georgian" &&
        selectedSubject !== "english")
    ) {
      handleAlertOpen();
      setErrorMessage("გთხოვთ აირჩიოთ საგანი და კლასი");
      setShouldNavigateToTest(false);
    } else if (
      !(
        +selectedGrade > 0 &&
        +selectedGrade < 13 &&
        Number.isInteger(selectedGrade)
      ) &&
      (selectedSubject === "math" ||
        selectedSubject === "georgian" ||
        selectedSubject === "english")
    ) {
      handleAlertOpen();
      setErrorMessage("გთხოვთ აირჩიოთ კლასი");
      setShouldNavigateToTest(false);
    } else if (
      selectedSubject !== "math" &&
      selectedSubject !== "georgian" &&
      selectedSubject !== "english" &&
      +selectedGrade > 0 &&
      +selectedGrade < 13 &&
      Number.isInteger(selectedGrade)
    ) {
      handleAlertOpen();
      setErrorMessage("გთხოვთ აირჩიოთ საგანი");
      setShouldNavigateToTest(false);
    } else {
      setErrorMessage(
        "ტესტის დაწყების შემდეგ უნდა შეავსოთ შემდეგი ინფორმაცია: მოსწავლის სახელი, გვარი; მშობლის სახელი, გვარი; მშობლის ტელეფონის ნომერი; ელ-ფოსტა; სკოლა. წინასწარ მოამზადეთ მოცემული ინფორმაცია, რადგან ტესტის დაწყებისთანავე დრო ჩაირთვება!"
      );
      setShouldNavigateToTest(true);
      handleAlertOpen();
      // router.push(`/first-round/test?${new URLSearchParams(searchParams)}`);
    }
  }

  return (
    <>
      <button onClick={handleStart} className={classes.start}>
        ტესტის დაწყება
      </button>
      {isOpen && (
        <Alert
          onAlertClose={handleAlertClose}
          text={errorMessage}
          shouldNavigateToTest={shouldNavigateToTest}
          url={
            shouldNavigateToTest
              ? `/first-round/test?${new URLSearchParams(searchParams)}`
              : null
          }
        />
      )}
    </>
  );
}
