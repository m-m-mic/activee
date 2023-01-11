import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getSearchResults } from "../scripts/fetchRequests";
import { Subtitle } from "../components/Subtitle";
import { LoadingAnimation } from "../components/LoadingAnimation";

export function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["userToken", "userType"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlQuery, setUrlQuery] = useState();
  const [searchResults, setSearchResults] = useState();

  // Zwei unterschiedliche useEffects, da sie verschiedene dependencies haben
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("query");
    setUrlQuery(urlQuery);
    if (urlQuery) {
      getSearchResults(cookies.userToken, urlQuery, setSearchResults);
    } else {
      if (cookies.userType !== "organisation") {
      } else {
      }
      setSearchResults(null);
    }
  }, [location.search]);

  useEffect(() => {
    document.addEventListener("keydown", confirmSearch);
    return () => {
      document.removeEventListener("keydown", confirmSearch);
    };
  }, [searchQuery]);

  const confirmSearch = (e) => {
    if (e.key === "Enter") navigate(`/search?query=${searchQuery}`);
  };
  return (
    <>
      <SearchBar inputValue={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      <h1>
        {urlQuery ? "Suchergebnisse" : cookies.userToken !== "organisation" ? "Empfehlungen" : "Aktivität von deinem Verein"}
      </h1>
      {urlQuery && <Subtitle>für "{urlQuery}"</Subtitle>}
      {searchResults ? (
        <>{searchResults.length > 0 ? <SearchResults searchResults={searchResults} /> : <div>Keine Ergebnisse gefunden</div>}</>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
}
