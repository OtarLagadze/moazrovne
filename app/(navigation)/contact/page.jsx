import ContactInformation from "@/components/contact/ContactInformation";
import classes from "./page.module.css";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "კონტაქტი",
  description: "დაგვირეკეთ ნომერზე 599 999 999 ან დაგვიკავშირდით ფეისბუქზე",
};

export default function Contact() {
  return (
    <div className={classes.contactWrapper}>
      <ContactInformation />
      <ContactForm />
    </div>
  );
}
