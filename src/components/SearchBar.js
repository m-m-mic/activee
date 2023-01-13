import React from "react";
import "../assets/css/SearchBar.css";

/**
 * Suchleiste von Search.js
 * @param inputValue
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
export function SearchBar({ inputValue, onChange }) {
  return (
    <div className="search-bar">
      <input value={inputValue} onChange={(event) => onChange(event)} id="search-input" placeholder="Suchbegriff eingeben..." />
      // TODO: confirm button
    </div>
  );
}
