import React from "react";
import { SearchItem } from "./SearchItem";
import "../assets/css/Search.css";

/**
 * Liste an Suchergebnissen
 * @param searchResults
 * @param signedIn
 * @returns {JSX.Element}
 * @constructor
 */
export function SearchResults({ searchResults, signedIn = true }) {
  return (
    <>
      <div className="search-results">
        {searchResults.map((item, key) => (
          <SearchItem item={item} key={key} signedIn={signedIn} />
        ))}
      </div>
    </>
  );
}
