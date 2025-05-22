import { format } from "date-fns";
import { ka } from "date-fns/locale";

export default function getDate(date, omitYear = false) {
  const dt = date ? new Date(date) : new Date();
  if (omitYear) {
    return format(dt, "d MMMM", { locale: ka });
  }
  return format(dt, "d MMMM, yyyy", { locale: ka });
}
