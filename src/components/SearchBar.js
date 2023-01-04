import React from "react";
import "../assets/css/SearchBar.css";

export function SearchBar({ inputValue, onChange }) {
  return (
    <div id="search-bar">
      <input value={inputValue} onChange={(event) => onChange(event)} id="search-input" placeholder="Suchbegriff eingeben..." />
    </div>
  );
}
