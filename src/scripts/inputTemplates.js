export const dateTemplate = {
  day: { value: null, label: null },
  starting_time: "",
  ending_time: "",
};
export const activityTemplate = {
  name: null,
  club: null,
  sport: null,
  gender: null,
  age: {
    age: null,
    isOlderThan: false,
  },
  league: null,
  languages: [],
  maximum_participants: 100,
  requirements: null,
  required_items: [],
  additional_info: null,
  membership_fee: null,
  dates: [dateTemplate],
  address: { street: null, house_number: null, zip_code: null, city: null },
  trainers: [],
  participants: [],
};
export const agePreselect = [
  { value: "youngerThan", label: "oder jünger" },
  { value: "olderThan", label: "oder älter" },
];

export const genderPreselect = [
  { value: "female", label: "weiblich" },
  { value: "male", label: "männlich" },
  { value: "mix", label: "mix" },
];

export const weekdayPreselect = [
  { value: "mo", label: "Montag" },
  { value: "tu", label: "Dienstag" },
  { value: "we", label: "Mittwoch" },
  { value: "th", label: "Donnerstag" },
  { value: "fr", label: "Freitag" },
  { value: "sa", label: "Samstag" },
  { value: "su", label: "Sonntag" },
];
