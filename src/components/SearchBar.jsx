import React from "react";
import "../assets/css/SearchBar.css";
import SearchIconWhite from "../assets/svgs/search_icon_white.svg";

/**
 * Suchleiste von Search.jsx
 * @param inputValue
 * @param onChange
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export function SearchBar({ inputValue, onChange, onClick }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={inputValue}
        onChange={(event) => onChange(event)}
        className="search-input"
        placeholder="Suchbegriff eingeben..."
      />
      <button className="search-button" onClick={onClick}>
        <img className="search-button-image" src={SearchIconWhite} alt="search" />
      </button>
    </div>
  );
}
