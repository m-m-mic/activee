import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getSearchResults } from "../scripts/fetchRequests";

export function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlQuery, setUrlQuery] = useState();
  const [searchResults, setSearchResults] = useState();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("query");
    setUrlQuery(urlQuery);
    if (urlQuery) {
      getSearchResults(cookies.userToken, urlQuery, setSearchResults);
    } else {
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

  if (cookies.userToken) {
    return (
      <>
        <SearchBar inputValue={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        {searchResults ? (
          <>
            <h1>Suchergebnisse</h1>
            <h2>Exact</h2>
            <SearchResults searchResults={searchResults.filtered} />
            <h2>Other</h2>
            <SearchResults searchResults={searchResults.other} />
          </>
        ) : (
          <h1>Empfehlungen</h1>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
