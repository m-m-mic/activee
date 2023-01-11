// Templates für neue Account oder Activity Objekte, welche beim Erstellen initialisiert werden

export const accountTemplate = {
  email: "",
  password: "",
  type: "participant",
  tier: "parent",
  first_name: "",
  last_name: "",
  club: null,
  phone_number: null,
  birthday: null,
  address: { street: "", house_number: "", zip_code: "", city: "" },
  languages: [],
  genders: [],
  sports: [],
  transport: [],
  distance: 0,
  times: [],
  children_accounts: [],
};

export const dateTemplate = {
  day: { value: null, label: null },
  starting_time: "12:00",
  ending_time: "13:00",
};

export const activityTemplate = {
  name: "",
  club: null,
  sport: null,
  gender: null,
  age: {
    age: null,
    isOlderThan: false,
  },
  league: "",
  languages: [],
  maximum_participants: 100,
  requirements: "",
  required_items: [],
  additional_info: "",
  membership_fee: "",
  address: { street: "", house_number: "", zip_code: "", city: "" },
  trainers: [],
  participants: [],
  only_logged_in: false,
};

// React-select preselects für ModifyActivity.js, welche nicht im Backend gespeichert werden

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
