import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getClubActivities, getRecommendations, getSearchResults } from "../scripts/fetchRequests";
import { Subtitle } from "../components/Subtitle";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { ActiveeButton } from "../components/ActiveeButton";

/**
 * Seite, auf welcher Nutzer nach Aktivität suchen können
 * @returns {JSX.Element}
 * @constructor
 */
export function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["userToken", "userType"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlQuery, setUrlQuery] = useState();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [morePages, setMorePages] = useState(true);

  // Zwei unterschiedliche useEffects, da sie verschiedene dependencies haben
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("query");
    setUrlQuery(urlQuery);
    setResults([]);
    if (urlQuery) {
      getSearchResults(cookies.userToken, urlQuery, page, setPage, results, setResults, setMorePages);
    } else {
      if (cookies.userType === "participant") {
        getRecommendations(cookies.userToken, page, setPage, results, setResults, setMorePages);
      } else {
        getClubActivities(cookies.userToken, page, setPage, results, setResults, setMorePages);
      }
    }
  }, [location.search]);

  console.log(page);

  useEffect(() => {
    document.addEventListener("keydown", confirmSearch);
    return () => {
      document.removeEventListener("keydown", confirmSearch);
    };
  }, [searchQuery]);

  // Löst Such-Request aus, wenn Enter gedrückt wurde
  const confirmSearch = (e) => {
    if (e.key === "Enter") executeSearch();
  };

  const executeSearch = () => {
    setPage(0);
    navigate(`/search?query=${searchQuery}`);
  };
  return (
    <>
      <SearchBar
        inputValue={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />
      <h1>{urlQuery ? "Suchergebnisse" : cookies.userType === "participant" ? "Empfehlungen" : "Aktivität von Deinem Verein"}</h1>
      {urlQuery && <Subtitle>für "{urlQuery}"</Subtitle>}
      {results.length > 0 && <SearchResults searchResults={results} />}
      {results.length > 0 && morePages && (
        <ActiveeButton
          buttonType="primary"
          onClick={() => getRecommendations(cookies.userToken, page, setPage, results, setResults, setMorePages)}>
          Mehr Laden
        </ActiveeButton>
      )}
      {results.length === 0 && <LoadingAnimation />}
    </>
  );
}
