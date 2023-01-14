import { backendUrl } from "../index";
import { isVariableOnlySpaces } from "./isVariableOnlySpaces";
import { createSelectArray } from "./createSelectArray";
import { handleCookieChange } from "./handleCookieChange";

// Fetch Requests an activee-Backend

// Registriert neuen Nutzer und loggt ihn ein
// Zuerst wird die Validität der Nutzereingaben überprüft. Sind diese valide, wird ein neuer Account erstellt und
// ein Token, sowie andere wichtige Informationen zurückgegeben
export const registerAccount = (accountInfo, validation, setCookie, navigate, setWarningVisibility, setWarning) => {
  for (const [key, value] of Object.entries(validation)) {
    if (value === false) {
      setWarning("Bitte überprüfe deine Angaben.");
      setWarningVisibility(true);
      return;
    }
  }
  console.log(accountInfo);
  const url = backendUrl + "/account/register";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accountInfo),
  };
  fetch(url, requestOptions).then((response) => {
    if (response.status === 201) {
      setWarningVisibility(false);
      response
        .json()
        .then((data) => handleCookieChange(setCookie, data.token, data.id, data.type, data.tier))
        .then(() => navigate("/"));
    } else {
      // TODO: spezifisches Handling, wenn E-Mail schon existiert
      setWarning("Es ist ein Fehler beim Erstellen des Accounts aufgetreten.");
      return setWarningVisibility(true);
    }
  });
};

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
  // TODO: error-handling
};

// Liefert empfohlene Aktivitäten anhand von Nutzerpräferenzen zurück
export const getShortenedRecommendations = (token, setRecommendations) => {
  const url = backendUrl + "/activity/recommendations/shortened";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setRecommendations(data));
  // TODO: error-handling
};

export const getRecommendations = (token, setRecommendations) => {
  const url = backendUrl + "/activity/recommendations";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setRecommendations(data));
  // TODO: error-handling
};

export const getClubActivities = (token, setRecommendations) => {
  const url = backendUrl + "/activity/club";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setRecommendations(data));
  // TODO: error-handling
};

export const getShortenedClubActivities = (token, setRecommendations) => {
  const url = backendUrl + "/activity/club/shortened";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setRecommendations(data));
  // TODO: error-handling
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
  // TODO: error-handling
};

// Liefert vier Sportarten (die eigenen + potenziell Empfehlungen) zurück
export const getCuratedSports = (token, setSports) => {
  const url = backendUrl + "/curated/sport";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setSports(data));
  // TODO: error-handling
};

// Liefert Suchergebnisse anhand von Suchbegriff zurück
export const getSearchResults = (token, enteredQuery, setSearchResults) => {
  if (enteredQuery === "" || isVariableOnlySpaces(enteredQuery)) {
    setSearchResults(null);
  } else {
    const url = backendUrl + "/search/" + enteredQuery;
    let requestOptions;
    if (token) {
      requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      };
    } else {
      requestOptions = { method: "GET" };
    }
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  }
  // TODO: error-handling
};

// Fetched alle Preselect Collections (Language, RequiredItems, Sports) und verwandelt sie in Select Arrays
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
  // TODO: error-handling
};
