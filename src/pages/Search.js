import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import React, { useEffect, useState } from "react";
import "../assets/css/Search.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Subtitle } from "../components/Subtitle";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { ActiveeButton } from "../components/ActiveeButton";
import { isVariableOnlySpaces } from "../scripts/isVariableOnlySpaces";
import { backendUrl } from "../index";
import NotFoundSmiley from "../assets/svgs/404_smiley_black.svg";

/**
 * Seite, auf welcher Nutzer nach Aktivität suchen können
 * @returns {JSX.Element}
 * @constructor
 */
export function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["userToken", "userType"]);
  // Nutzereingabe im Suchfeld
  const [searchInput, setSearchInput] = useState("");
  // Query Parameter in der URL
  const [urlQuery, setUrlQuery] = useState(null);
  // Ergebnisse des Fetch-Requests (Search, Recommendations oder Club Activities)
  const [results, setResults] = useState([]);
  // Aktuelle Seitenanzahl für längere Ergebnisse
  const [page, setPage] = useState(0);
  // Ob noch mehr Seiten geladen werden können
  const [isLastPage, setIsLastPage] = useState(true);
  // Status, ob Seite momentan geladen wird
  const [loading, setLoading] = useState(true);

  // Zwei unterschiedliche useEffects, da sie verschiedene dependencies haben
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    setUrlQuery(query);
    setResults([]);
    setPage(0);
    if (query) {
      getSearchResults(query, 0, []);
    } else {
      getRecommendations(0, []);
    }
  }, [location.search]);

  useEffect(() => {
    document.addEventListener("keydown", confirmSearch);
    return () => {
      document.removeEventListener("keydown", confirmSearch);
    };
  }, [searchInput]);

  // Löst Such-Request aus, wenn Enter gedrückt wurde
  const confirmSearch = (e) => {
    if (e.key === "Enter") executeSearch();
  };

  const executeSearch = () => {
    document.querySelectorAll("[type=search]").forEach((element) => element.blur());
    return navigate(`/search?query=${searchInput}`);
  };

  // Liefert Suchergebnisse anhand von Suchbegriff zurück
  const getSearchResults = (enteredQuery, page, results) => {
    setLoading(true);
    if (enteredQuery === "" || isVariableOnlySpaces(enteredQuery)) {
      // Leere Eingaben sind nicht valide für die Suche
      setResults(null);
    } else {
      const url = backendUrl + "/search/" + enteredQuery + "?page=" + page;
      let requestOptions;
      if (cookies.userToken) {
        // Request für angemeldete Nutzer
        requestOptions = {
          method: "GET",
          headers: { Authorization: `Bearer ${cookies.userToken}` },
        };
      } else {
        // Request für nicht angemeldete Nutzer
        requestOptions = { method: "GET" };
      }
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setResults(results.concat(data.activities));
          setPage(page + 1);
          setIsLastPage(data.last_page);
          setLoading(false);
        });
    }
    // TODO: error-handling
  };

  // Liefert Empfehlungen bzw. die anderen Aktivitäten des Vereins zurück
  const getRecommendations = (page, results) => {
    setLoading(true);
    let url;
    if (cookies.userType === "organisation") {
      // Andere URL für Übungsleiter
      url = backendUrl + "/activity/club?page=" + page;
    } else {
      url = backendUrl + "/activity/recommendations?page=" + page;
    }
    let requestOptions;
    if (cookies.userToken) {
      requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${cookies.userToken}` },
      };
    } else {
      requestOptions = { method: "GET" };
    }
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setResults(results.concat(data.activities));
        setPage(page + 1);
        setIsLastPage(data.last_page);
        setLoading(false);
      });
    // TODO: error-handling
  };

  return (
    <>
      <SearchBar
        inputValue={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
        onClick={() => executeSearch()}
      />
      {urlQuery ? (
        <>
          <h1>Suchergebnisse</h1>
          <Subtitle>für "{urlQuery}"</Subtitle>
          <SearchResults searchResults={results} />
          {results.length > 0 && !isLastPage && (
            <ActiveeButton buttonType="primary" onClick={() => getSearchResults(urlQuery, page, results)}>
              Mehr Laden
            </ActiveeButton>
          )}
        </>
      ) : (
        <>
          <h1>{cookies.userType === "organisation" ? "Aktivitäten von Deinem Verein" : "Empfehlungen"}</h1>
          <SearchResults searchResults={results} />
          {results.length > 0 && !isLastPage && (
            <ActiveeButton buttonType="primary" onClick={() => getRecommendations(page, results)}>
              Mehr Laden
            </ActiveeButton>
          )}
        </>
      )}
      {!loading && results.length === 0 && (
        <div className="search-no-results">
          <img className="search-no-results-image" src={NotFoundSmiley} alt="not found smiley" />
          Es konnten keine Ergebnisse gefunden werden.
        </div>
      )}
      {loading && <LoadingAnimation />}
    </>
  );
}
