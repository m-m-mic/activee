// Entfernt oder fügt Gender in accountInfo.genders hinzu
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

// Entfernt oder fügt Transport in accountInfo.transport hinzu
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
