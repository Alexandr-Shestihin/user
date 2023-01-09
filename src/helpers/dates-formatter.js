export const convertDate = (date, defaultDate = "2022-05-25") => {
  const options = {
    year: "2-digit",
    month: "short",
    day: "numeric",
    //  hour: "2-digit", minute: "2-digit"
  };
  defaultDate = new Date(defaultDate).toLocaleDateString(
    navigator.language,
    options
  );
  const convertedDate = new Date(date).toLocaleDateString(
    navigator.language,
    options
  );

  if (!date || convertedDate == "Invalid Date") return defaultDate;

  return convertedDate;
};
