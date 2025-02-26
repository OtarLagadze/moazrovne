export default function getDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (date) {
    return new Date(date).toLocaleDateString("ka-GE", options);
  } else {
    return new Date().toLocaleDateString("ka-GE", options);
  }
}
