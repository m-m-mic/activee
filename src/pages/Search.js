import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { SearchItem } from "../components/SearchItem";
import "../assets/css/Search.css";

export function Search({ searchResults }) {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken"]);
  if (cookies.userToken) {
    if (!searchResults) {
      return (
        <>
          <h1>Empfohlene Aktivitäten</h1>
        </>
      );
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
