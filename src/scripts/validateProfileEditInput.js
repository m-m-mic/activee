import React from "react";
const namePattern = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
export const setFirstNameInput = (input, data, setData) => {
  if (input.length >= 2 && !input.match(namePattern)) {
    setData({ ...data, first_name: input });
    return true;
  } else {
    return false;
  }
};
export const setLastNameInput = (input, data, setData) => {
  if (input.length >= 2 && !input.match(namePattern)) {
    setData({ ...data, last_name: input });
    return true;
  } else {
    return false;
  }
};
export const setBirthday = (input, data, setData) => {
  if (input.match(datePattern)) {
    setData({ ...data, birthday: input });
    return true;
  } else {
    return false;
  }
};
export const setAddressStreetInput = (input, data, setData) => {
  if (input.length <= 20 && !input.match(namePattern)) {
    setData({ ...data, address: { ...data.address, street: input } });
    return true;
  } else {
    return false;
  }
};
