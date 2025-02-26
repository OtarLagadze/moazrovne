import Fallback from "@/components/ui/Fallback";
import classes from "./loading.module.css";

export default function Loading() {
  return (
    <div className={classes.spinner}>
      <Fallback />
    </div>
  );
}
