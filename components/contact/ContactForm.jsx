"use client";

import { useState } from "react";
import classes from "./Contact.module.css";
import RightPanel from "./RightPanel";
import Fallback from "../ui/Fallback";

export default function ContactForm() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldDisplayPanel, setShouldDisplayPanel] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  function giveLabelToField(field) {
    const labels = {
      name: "სახელის",
      email: "ელ-ფოსტის",
      message: "შეტყობინების",
    };
    return labels[field];
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  function validateForm(data) {
    const newErrorMessages = {
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
    };
    for (const key in data) {
      // Handles email validation
      if (key === "email" && !validateEmail(data[key])) {
        newErrorMessages[key] = "გთხოვთ შეიყვანეთ რეალური ელფოსტა";
      }

      if (data[key] === "") {
        const georgianLabel = giveLabelToField(key);
        newErrorMessages[key] = `${georgianLabel} ველი ცარიელია`;
      }
    }
    return newErrorMessages;
  }

  // Validates form on every keystroke
  function handleInputChange(field, value) {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [field]: value };

      if (!isSubmitted) {
        return updatedFormData;
      }

      setErrorMessage(validateForm(updatedFormData));
      return updatedFormData;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isSubmitted) {
      setErrorMessage(validateForm(formData)); // Checks if fields are correct for the first time
    }

    setIsSubmitted(true); // Sets submitted to true, so now error messages will appear on every keystroke

    const errors = validateForm(formData); // validateForm should return the error messages for the current form data
    const hasError = Object.values(errors).some((error) => error !== "");

    if (hasError) {
      return;
    }

    setLoading(true);

    // Create a new FormData object
    const form = new FormData();

    // Append key/value pairs to the FormData object
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    const response = await fetch("/api/contactForm", {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    if (data.success) {
      setLoading(false);
      setIsSuccessful(true);
      setShouldDisplayPanel(true);
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      setLoading(false);
      setIsSuccessful(false);
      setShouldDisplayPanel(true);
      console.log("Error", data);
    }
  }

  function handleClose() {
    setShouldDisplayPanel(false);
  }

  return (
    <div className={classes.formWrapper}>
      <h2 className={classes.heading}>დაგვიკავშირდით</h2>
      <form
        onSubmit={handleSubmit}
        name="contact-form"
        action={""}
        className={classes.form}
        noValidate
      >
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="name">
            სახელი*
          </label>
          <input
            className={classes.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            autoComplete="name"
            placeholder="გიორგი წერეთელი"
          />
          {errorMessage.name !== "" && (
            <span className={classes.errorMessage}>{errorMessage.name}</span>
          )}
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="email">
            ელ-ფოსტა*
          </label>
          <input
            className={classes.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            autoComplete="email"
            placeholder="example@domain.com"
          />
          {errorMessage.email !== "" && (
            <span className={classes.errorMessage}>{errorMessage.email}</span>
          )}
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="message">
            შეტყობინება*
          </label>
          <textarea
            name="message"
            className={`${classes.input} ${classes.messageInput}`}
            id="message"
            rows="5"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />
          {errorMessage.message !== "" && (
            <span className={classes.errorMessage}>{errorMessage.message}</span>
          )}
        </div>
        <div className={classes.btnWrapper}>
          <button
            aria-label="Submit the form"
            type="submit"
            className={classes.submit}
          >
            <span className={classes.transition}></span>
            <span className={classes.gradient}></span>
            <span className={classes.label}>გაგზავნა</span>
          </button>
        </div>

        {loading && (
          <div className={classes.loading}>
            <Fallback />
          </div>
        )}

        <RightPanel
          isSuccessful={isSuccessful}
          handleClose={handleClose}
          shouldDisplayPanel={shouldDisplayPanel}
        />
      </form>
    </div>
  );
}
