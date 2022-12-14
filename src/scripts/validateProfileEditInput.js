import React from "react";
const specialCharacterPattern = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const phoneNumberPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
const numberPattern = /^[0-9]*$/;
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
export const setDistanceInput = (input, data, setData, validation, setValidation) => {
  if (input.length <= 3 && input.match(numberPattern)) {
    setData({ ...data, distance: Number(input) });
    return setValidation({ ...validation, distance: true });
  } else {
    return setValidation({ ...validation, distance: false });
  }
};

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
