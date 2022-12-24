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
