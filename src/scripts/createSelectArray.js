// Konvertiert Array aus {_id, name} in {value, label}
export const createSelectArray = (array) => {
  let selectArray = array;
  for (const object of selectArray) {
    object["value"] = object["_id"];
    object["label"] = object["name"];
    delete object["_id"];
    delete object["name"];
    delete object["__v"];
  }
  return selectArray;
};

// Konvertiert Objekt mit {_id, name} in {value, label}
export const createSelectObject = (object) => {
  object["value"] = object["_id"];
  object["label"] = object["name"];
  delete object["_id"];
  delete object["name"];
  delete object["__v"];
  return object;
};
