import React from "react";
import { SearchItem } from "./SearchItem.jsx";
import "../assets/css/Search.css";

/**
 * Liste an Suchergebnissen
 * @param searchResults
 * @returns {JSX.Element}
 * @constructor
 */
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
