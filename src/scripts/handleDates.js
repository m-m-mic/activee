export const shortenDates = (dates, setShortenedDate) => {
  let updatedDates = [];
  for (const date of dates) {
    let updatedStart = Number(date.starting_time.split(":")[0]);
    let updatedEnd = Number(date.ending_time.split(":")[0]);
    if (updatedStart % 2 !== 0) updatedStart--;
    if (updatedEnd % 2 !== 0) updatedEnd--;
    updatedDates.push({ day: date.day, starting_hour: updatedStart });
    if (Number(date.ending_time.split(":")[1]) !== 0) updatedDates.push({ day: date.day, starting_hour: updatedEnd });
  }
  setShortenedDate(updatedDates);
};

export const translateWeekday = (day) => {
  if (day === "mo") {
    return "Montag";
  } else if (day === "tu") {
    return "Dienstag";
  } else if (day === "we") {
    return "Mittwoch";
  } else if (day === "th") {
    return "Donnerstag";
  } else if (day === "fr") {
    return "Freitag";
  } else if (day === "sa") {
    return "Samstag";
  } else if (day === "su") {
    return "Sonntag";
  }
};

export const getBirthYear = (age) => {
  const currentYear = new Date().getFullYear();
  return Number(currentYear) - Number(age);
};
