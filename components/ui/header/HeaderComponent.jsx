import classes from "./HeaderComponent.module.css";

export default async function HeaderComponent({ text }) {
  return (
    <h1 className={classes.mainHeading}>{ text }</h1>
  );
}