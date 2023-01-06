import { backendUrl } from "../index";
import { isVariableOnlySpaces } from "./isVariableOnlySpaces";
import {createSelectArray} from "./createSelectArray";

// Fetch Requests an activee-Backend

// Liefert alle Informationen des Nutzeraccounts zurück
export const getAccountInfo = (token, setAccountInfo) => {
  const url = backendUrl + "/account/info";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setAccountInfo(data));
};

// Liefert empfohlene Aktivitäten anhand von Nutzerpräferenzen zurück
export const getRecommendations = (token, setRecommendations) => {
  const url = backendUrl + "/activity/filtered";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setRecommendations(data));
};

// Liefert alle vorhandenen Sportarten zurück
export const getSports = (token, setSports) => {
  const url = backendUrl + "/sport";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setSports(data));
};

// Liefert Suchergebnisse anhand von Suchbegriff zurück
export const getSearchResults = (token, enteredQuery, setSearchResults) => {
  if (enteredQuery === "" || isVariableOnlySpaces(enteredQuery)) {
    setSearchResults(null);
  } else {
    const url = backendUrl + "/search/" + enteredQuery;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  }
};


export const getPreselectOptions = (token, setLanguages, setRequiredItems, setSports) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  if (setLanguages) {
    fetch(`${backendUrl}/language`, requestOptions)
        .then((response) => response.json())
        .then((data) => setLanguages(createSelectArray(data)));
  }
  if (setRequiredItems) {
    fetch(`${backendUrl}/required-item`, requestOptions)
        .then((response) => response.json())
        .then((data) => setRequiredItems(createSelectArray(data)));
  }
  if (setSports) {
    fetch(`${backendUrl}/sport`, requestOptions)
        .then((response) => response.json())
        .then((data) => setSports(createSelectArray(data)));
  }
};