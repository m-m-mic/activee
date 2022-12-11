import React from "react";
const specialCharacterPattern = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const phoneNumberPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
const numberPattern = /^[0-9]*$/;
export const setFirstNameInput = (input, data, setData) => {
  if (input.length >= 1 && input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, first_name: input });
    return true;
  } else {
    return false;
  }
};
export const setLastNameInput = (input, data, setData) => {
  if (input.length >= 1 && input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, last_name: input });
    return true;
  } else {
    return false;
  }
};
export const setBirthday = (input, data, setData) => {
  if (input === "") {
    setData({ ...data, birthday: input });
    return true;
  }
  if (input.match(datePattern)) {
    setData({ ...data, birthday: input });
    return true;
  } else {
    return false;
  }
};
export const setPhoneNumber = (input, data, setData) => {
  if (input === "") {
    setData({ ...data, phone_number: input });
    return true;
  }
  if (input.match(phoneNumberPattern)) {
    setData({ ...data, phone_number: input });
    return true;
  } else {
    return false;
  }
};
export const setAddressStreetInput = (input, data, setData) => {
  if (input === "") {
    setData({ ...data, address: { ...data.address, street: input } });
    return true;
  }
  if (input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, address: { ...data.address, street: input } });
    return true;
  } else {
    return false;
  }
};
export const setAddressHouseNumberInput = (input, data, setData) => {
  if (input.length <= 4 && input.match(numberPattern)) {
    setData({ ...data, address: { ...data.address, house_number: input } });
    return true;
  } else {
    return false;
  }
};

export const setAddressZipCodeInput = (input, data, setData) => {
  if (input.length <= 5 && input.match(numberPattern)) {
    setData({ ...data, address: { ...data.address, zip_code: input } });
    return true;
  } else {
    return false;
  }
};

export const setAddressCityInput = (input, data, setData) => {
  if (input === "") {
    setData({ ...data, address: { ...data.address, city: input } });
    return true;
  }
  if (input.length <= 20 && !input.match(specialCharacterPattern)) {
    setData({ ...data, address: { ...data.address, city: input } });
    return true;
  } else {
    return false;
  }
};
export const setDistanceInput = (input, data, setData) => {
  if (input.length <= 3 && input.match(numberPattern)) {
    setData({ ...data, distance: Number(input) });
    return true;
  } else {
    return false;
  }
};
