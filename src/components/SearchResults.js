import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { SearchItem } from "./SearchItem";
import "../assets/css/Search.css";
import { LoadingAnimation } from "./LoadingAnimation";

export function SearchResults({ searchResults, query }) {
  const [cookies, setCookies] = useCookies(["userToken"]);
  if (cookies.userToken) {
    if (!query) {
      return (
        <>
          <h1>Empfohlene Aktivitäten</h1>
        </>
      );
    }
    if (!searchResults) {
      return <LoadingAnimation />;
    }
    return (
      <>
        <h1>Suchergebnisse</h1>
        <div className="search-results">
          {searchResults.map((item, key) => (
            <SearchItem item={item} key={key} />
          ))}
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
