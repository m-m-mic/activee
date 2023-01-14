// Kürzt 00:00 Uhrzeitformat auf die Stundenanzahl, damit TimeTable damit umgehen kann
export const shortenDates = (dates, setShortenedDate) => {
  let updatedDates = [];
  for (const date of dates) {
    let wasEndingHourReduced = false;
    // Auslesen der Startzeit + Reduktion um eins, falls sie ungerade ist
    let startingHour = Number(date.starting_time.split(":")[0]);
    if (startingHour % 2 !== 0) startingHour--;
    // Auslesen der Endzeit + Reduktion um eins, falls sie ungerade ist, wasEndingHourReduced wird dann auch auf true gesetzt
    let endingHour = Number(date.ending_time.split(":")[0]);
    if (endingHour % 2 !== 0) {
      endingHour--;
      wasEndingHourReduced = true;
    }
    // Bei Abstand über 1 wird durchiteriert, um alle Zwischenblöcke auch zu markieren
    if (endingHour - startingHour > 1) {
      for (let i = endingHour; i > startingHour; i - 2) {
        i = i - 2;
        updatedDates.push({ day: date.day.value, hour: i });
      }
    }
    // Block der Endzeit wird hinzugefügt, falls die Minutenzahl über null ist oder sie reduziert wurde
    if (Number(date.ending_time.split(":")[1]) !== 0 || wasEndingHourReduced)
      updatedDates.push({ day: date.day.value, hour: endingHour });
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
