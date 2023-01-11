import React from "react";
import { SearchItem } from "./SearchItem";
import "../assets/css/Search.css";

export function SearchResults({ searchResults }) {
  return (
    <>
      <div className="search-results">
        {searchResults.map((item, key) => (
          <SearchItem item={item} key={key} />
        ))}
      </div>
    </>
  );
}
