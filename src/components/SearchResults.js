import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { SearchItem } from "./SearchItem";
import "../assets/css/Search.css";
import { LoadingAnimation } from "./LoadingAnimation";

export function SearchResults({ searchResults }) {
  const [cookies, setCookies] = useCookies(["userToken"]);
  if (cookies.userToken) {
    if (!searchResults) {
      return <LoadingAnimation />;
    }
    return (
      <>
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
