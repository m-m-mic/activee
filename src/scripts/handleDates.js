// Kürzt 00:00 Uhrzeitformat auf die Stundenanzahl, damit TimeTable damit umgehen kann
export const shortenDates = (dates, setShortenedDate) => {
  let updatedDates = [];
  for (const date of dates) {
    let updatedStart = Number(date.starting_time.split(":")[0]);
    let updatedEnd = Number(date.ending_time.split(":")[0]);
    if (updatedStart % 2 !== 0) updatedStart--;
    if (updatedEnd % 2 !== 0) updatedEnd--;
    updatedDates.push({ day: date.day.value, starting_hour: updatedStart });
    if (Number(date.ending_time.split(":")[1]) !== 0) updatedDates.push({ day: date.day.value, starting_hour: updatedEnd });
  }
  setShortenedDate(updatedDates);
};

// Wandelt eine Liste an Uhrzeiten um
export const collectAndShortenDates = (activities, setShortenedDate) => {
  let initialDates = [];
  for (const activity of activities) {
    initialDates = initialDates.concat(activity.dates);
  }
  shortenDates(initialDates, setShortenedDate);
};

// Gibt Geburtsdatum des angegebenen Alters zurück
export const getBirthYear = (age) => {
  const currentYear = new Date().getFullYear();
  return Number(currentYear) - Number(age);
};
