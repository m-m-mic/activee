import React from "react";
import { SearchItem } from "./SearchItem";
import "../assets/css/Search.css";

/**
 * Liste an Suchergebnissen
 * @param searchResults
 * @returns {JSX.Element}
 * @constructor
 */
export function SearchResults({ searchResults }) {
  if (searchResults.length > 0) {
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
    return <div>Keine Ergebnisse gefunden.</div>;
  }
}
