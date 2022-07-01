import { format, parseISO } from "date-fns";

export const formatDate = (inputDate, outputFormat) => {
  try {
    if (inputDate === null) return "N/A";
    var date = parseISO(new Date(inputDate).toISOString());
    if (typeof outputFormat === "undefined") outputFormat = "dd/MM/yyyy";
    return format(date, outputFormat);
  } catch (error) {
    return "N/A";
  }
};

export const parseDate = (inputDate) => {
  let parseDate = inputDate.split("/");
  return new Date(parseDate[2], parseDate[1] - 1, parseDate[0]);
};
