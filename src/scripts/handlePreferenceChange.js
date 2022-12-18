export function handleGenderChange(preference, data, setData) {
  let preferenceArray = data.genders;
  if (preferenceArray.includes(preference)) {
    for (let i = 0; i < preferenceArray.length; i++) {
      if (preferenceArray[i] === preference) {
        preferenceArray.splice(i, 1);
      }
    }
  } else {
    preferenceArray.push(preference);
  }
  setData({ ...data, genders: preferenceArray });
}

export function handleTransportChange(preference, data, setData) {
  let preferenceArray = data.transport;
  if (preferenceArray.includes(preference)) {
    for (let i = 0; i < preferenceArray.length; i++) {
      if (preferenceArray[i] === preference) {
        preferenceArray.splice(i, 1);
      }
    }
  } else {
    preferenceArray.push(preference);
  }
  setData({ ...data, transport: preferenceArray });
}
export function handleSportRemoval(preference, data, setData) {
  let preferenceArray = data.sports;
  for (let i = 0; i < preferenceArray.length; i++) {
    if (preferenceArray[i]._id === preference) {
      preferenceArray.splice(i, 1);
    }
  }
  setData({ ...data, sports: preferenceArray });
}
