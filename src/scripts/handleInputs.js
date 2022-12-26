// Validator Objekte, welche verwendet werden, um die Validität von Nutzereingaben auf Create und Edit Pages zu prüfen.
// Sämtliche Keys in den Objekten müssen auf true stehen, damit der POST oder PATCH Request ausgeführt werden kann.
export const ProfileInputValidator = {
  first_name: true,
  last_name: true,
  birthday: true,
  phone_number: true,
  street: true,
  house_number: true,
  zip_code: true,
  city: true,
  distance: true,
};

export const NewSubAccountValidator = {
  first_name: false,
  last_name: true,
};

export const newActivityInputValidator = {
  name: false,
  sport: false,
  gender: false,
  age: false,
  league: true,
  languages: false,
  maximum_participants: true,
  requirements: true,
  required_items: true,
  additional_info: true,
  membership_fee: true,
  dates: false,
  street: false,
  house_number: false,
  zip_code: false,
  city: false,
};

// PATTERNS für Eingabevalidierung
const specialCharacterPattern = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const phoneNumberPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
const numberPattern = /^[0-9]*$/;
const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

// Input Handling- und Validator-Funktionen

// Für EditProfile.js

// FirstName & LastName müssen mindestens ein Zeichen und maximal 20 Zeichen enthalten und dürfen keine Sonderzeichen
// enthalten.
export const setFirstNameInput = (input, data, setData, validation, setValidation) => {
  if (input.length >= 1 && input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, first_name: input });
    return setValidation({ ...validation, first_name: true });
  } else {
    return setValidation({ ...validation, first_name: false });
  }
};

export const setLastNameInput = (input, data, setData, validation, setValidation) => {
  if (input.length >= 1 && input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, last_name: input });
    return setValidation({ ...validation, last_name: true });
  } else {
    return setValidation({ ...validation, last_name: false });
  }
};

// Birthday muss HTML Datumformat von dd-mm-yyyy entsprechen. Leeres Feld erlaubt.
export const setBirthday = (input, data, setData, validation, setValidation) => {
  if (input === "") {
    setData({ ...data, birthday: input });
    return setValidation({ ...validation, birthday: true });
  }
  if (input.match(datePattern)) {
    setData({ ...data, birthday: input });
    return setValidation({ ...validation, birthday: true });
  } else {
    return setValidation({ ...validation, birthday: false });
  }
};

// Phone Number muss Telefonnummerformat entsprechen. Leeres Feld erlaubt.
export const setPhoneNumber = (input, data, setData, validation, setValidation) => {
  if (input === "") {
    setData({ ...data, phone_number: input });
    return setValidation({ ...validation, phone_number: true });
  }
  if (input.match(phoneNumberPattern)) {
    setData({ ...data, phone_number: input });
    return setValidation({ ...validation, phone_number: true });
  } else {
    return setValidation({ ...validation, phone_number: false });
  }
};

// Distance darf maximal 300 sein. Leeres Feld erlaubt.
export const setDistanceInput = (input, data, setData, validation, setValidation) => {
  if (Number(input) <= 300 && input.match(numberPattern)) {
    setData({ ...data, distance: Number(input) });
    return setValidation({ ...validation, distance: true });
  } else {
    return setValidation({ ...validation, distance: false });
  }
};

// Für ModifyActivity.js

// Name muss mindestens 1 Zeichen oder 30 Zeichen lang sein und darf keine Sonderzeichen enthalten.
export const setNameInput = (input, data, setData, validation, setValidation) => {
  if (input.length >= 1 && input.length <= 30 && !input.match(specialCharacterPattern)) {
    setData({ ...data, name: input });
    return setValidation({ ...validation, name: true });
  } else {
    return setValidation({ ...validation, name: false });
  }
};

// Age darf minimal 1 und maximal 120 sein und darf nur Nummern enthalten.
export const setAgeInput = (input, data, setData, validation, setValidation) => {
  if (Number(input) >= 1 && Number(input) <= 120 && input.match(numberPattern)) {
    setData({ ...data, age: { ...data.age, age: Number(input) } });
    return setValidation({ ...validation, age: true });
  } else {
    return setValidation({ ...validation, age: false });
  }
};

// Keine Validierung für AgeDirection notwendig. Funktion setzt isOlderThan entsprechend nach Auswahl
export const setAgeDirectionInput = (input, data, setData) => {
  if (input.value === "youngerThan") {
    setData({ ...data, age: { ...data.age, isOlderThan: false } });
  } else if (input.value === "olderThan") {
    setData({ ...data, age: { ...data.age, isOlderThan: true } });
  }
};

// Keine Validierung für Sport notwendig. Funktion fügt ausgewählte Sportart in ActivityInfo ein.
export const setSportInput = (input, data, setData, validation, setValidation) => {
  setData({ ...data, sport: { _id: input.value, name: input.label } });
  return setValidation({ ...validation, sport: true });
};

// Keine Validierung für Gender notwendig. Funktion fügt ausgewähltes Geschlecht in ActivityInfo ein.
export const setGenderInput = (input, data, setData, validation, setValidation) => {
  setData({ ...data, gender: { _id: input.value, name: input.label } });
  return setValidation({ ...validation, gender: true });
};

// Keine Validierung für Languages notwendig. Funktion erstellt aus den ausgewählten Sprachen eine Liste, welche dann
// in ActivityInfo geschrieben wird.
export const setLanguagesInput = (input, data, setData, validation, setValidation) => {
  const convertedArray = [];
  for (const language of input) {
    convertedArray.push({ _id: language.value, name: language.label });
  }
  setData({ ...data, languages: convertedArray });
  if (convertedArray.length > 0) {
    return setValidation({ ...validation, languages: true });
  } else {
    return setValidation({ ...validation, languages: false });
  }
};

// League darf maximal 20 Zeichen lang sein. Leeres Feld ist erlaubt.
export const setLeagueInput = (input, data, setData, validation, setValidation) => {
  if (!input) {
    setData({ ...data, league: input });
    return setValidation({ ...validation, league: true });
  }
  if (input.length <= 20) {
    setData({ ...data, league: input });
    return setValidation({ ...validation, league: true });
  } else {
    return setValidation({ ...validation, league: false });
  }
};

//
export const setMaximumParticipantsInput = (input, data, setData, validation, setValidation) => {
  if (!input) {
    setData({ ...data, maximum_participants: 100 });
    return setValidation({ ...validation, maximum_participants: true });
  }
  if (Number(input) >= 1 && Number(input) <= 100 && input.match(numberPattern)) {
    setData({ ...data, maximum_participants: Number(input) });
    return setValidation({ ...validation, maximum_participants: true });
  } else {
    return setValidation({ ...validation, maximum_participants: false });
  }
};

// Requirements darf maximal 150 Zeichen lang sein. Leeres Feld ist erlaubt.
export const setRequirementsInput = (input, data, setData, validation, setValidation) => {
  if (!input) {
    setData({ ...data, requirements: input });
    return setValidation({ ...validation, requirements: true });
  }
  if (input.length <= 150) {
    setData({ ...data, requirements: input });
    return setValidation({ ...validation, requirements: true });
  } else {
    return setValidation({ ...validation, requirements: false });
  }
};

// AdditionalInfo darf maximal 150 Zeichen lang sein. Leeres Feld ist erlaubt.
export const setAdditionalInfoInput = (input, data, setData, validation, setValidation) => {
  if (!input) {
    setData({ ...data, additional_info: input });
    return setValidation({ ...validation, additional_info: true });
  }
  if (input.length <= 150) {
    setData({ ...data, additional_info: input });
    return setValidation({ ...validation, additional_info: true });
  } else {
    return setValidation({ ...validation, additional_info: false });
  }
};

// MembershipFee darf maximal 60 Zeichen lang sein. Leeres Feld ist erlaubt.
export const setMembershipFeeInput = (input, data, setData, validation, setValidation) => {
  if (!input) {
    setData({ ...data, membership_fee: input });
    return setValidation({ ...validation, membership_fee: true });
  }
  if (input.length <= 60) {
    setData({ ...data, membership_fee: input });
    return setValidation({ ...validation, membership_fee: true });
  } else {
    return setValidation({ ...validation, membership_fee: false });
  }
};

// Keine Validierung für RequiredItems notwendig. Funktion erstellt aus den ausgewählten Items eine Liste, welche dann
// in ActivityInfo geschrieben wird.
export const setRequiredItemsInput = (input, data, setData, validation, setValidation) => {
  const convertedArray = [];
  for (const item of input) {
    convertedArray.push({ _id: item.value, name: item.label });
  }
  setData({ ...data, required_items: convertedArray });
  return setValidation({ ...validation, required_items: true });
};

// Keine Validierung für ShowEmail notwendig. Funktion dreht den originalen Wert von ShowEmail um.
export const setShowEmailInput = (input, index, data, setData) => {
  const trainerList = data.trainers;
  trainerList.splice(index, 1, { ...data.trainers[index], show_email: !input });
  setData({ ...data, trainers: trainerList });
};

// Keine Validierung für ShowPhoneNumber notwendig. Funktion dreht den originalen Wert von ShowPhoneNumber um.
export const setShowPhoneNumberInput = (input, index, data, setData) => {
  const trainerList = data.trainers;
  trainerList.splice(index, 1, { ...data.trainers[index], show_phone_number: !input });
  setData({ ...data, trainers: trainerList });
};

// DatePicker.js

// Keine Validierung der Eingaben, sie werden nur hinzugefügt. Da eine variable Anzahl an Dates vom Nutzer eingefügt
// werden können, werden diese erst vorm Absenden des Requests geprüft
export const setDateDayInput = (index, input, data, setData) => {
  const dateList = data.dates;
  dateList.splice(index, 1, { ...data.dates[index], day: input });
  setData({ ...data, dates: data.dates });
};

export const setDateStartingTime = (index, input, data, setData) => {
  const dateList = data.dates;
  dateList.splice(index, 1, { ...data.dates[index], starting_time: input });
  setData({ ...data, dates: data.dates });
};

export const setDateEndingTime = (index, input, data, setData) => {
  const dateList = data.dates;
  dateList.splice(index, 1, { ...data.dates[index], ending_time: input });
  setData({ ...data, dates: data.dates });
};

export const validateDate = (date) => {
  console.log(date.starting_time.match(timePattern));
  console.log(date.ending_time.match(timePattern));

  if (date.day.value && date.day.label) {
    if (date.starting_time.match(timePattern)) {
      if (date.ending_time.match(timePattern)) {
        return true;
      }
    }
  } else {
    return false;
  }
};

// AddressPicker.js

export const setAddressStreetInput = (input, data, setData, validation, setValidation) => {
  if (input === "") {
    setData({ ...data, address: { ...data.address, street: input } });
    return setValidation({ ...validation, street: true });
  }
  if (input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, address: { ...data.address, street: input } });
    return setValidation({ ...validation, street: true });
  } else {
    return setValidation({ ...validation, street: false });
  }
};
export const setAddressHouseNumberInput = (input, data, setData, validation, setValidation) => {
  if (input.length <= 4 && input.match(numberPattern)) {
    setData({ ...data, address: { ...data.address, house_number: input } });
    return setValidation({ ...validation, house_number: true });
  } else {
    return setValidation({ ...validation, house_number: false });
  }
};

export const setAddressZipCodeInput = (input, data, setData, validation, setValidation) => {
  if (input.length <= 5 && input.match(numberPattern)) {
    setData({ ...data, address: { ...data.address, zip_code: input } });
    return setValidation({ ...validation, zip_code: true });
  } else {
    return setValidation({ ...validation, zip_code: false });
  }
};

export const setAddressCityInput = (input, data, setData, validation, setValidation) => {
  if (input === "") {
    setData({ ...data, address: { ...data.address, city: input } });
    return setValidation({ ...validation, city: true });
  }
  if (input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, address: { ...data.address, city: input } });
    return setValidation({ ...validation, city: true });
  } else {
    return setValidation({ ...validation, city: false });
  }
};
