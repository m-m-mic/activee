import React from "react";
import "../assets/css/SearchHeader.css";
import "../assets/css/Header.css";
import BackButtonBlack from "../assets/svgs/back_icon_black.svg";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "./ActiveeButton";

export function SearchHeader({ searchInput, onChange, onButtonPress }) {
  const navigate = useNavigate();
  return (
    <div id="search-header">
      <div className="header-button" onClick={() => navigate(-1)}>
        <img className="header-icon" src={BackButtonBlack} alt="Back button" />
      </div>
      <input value={searchInput} onChange={(event) => onChange(event)} id="search-input" placeholder="Suchbegriff eingeben..." />
      <ActiveeButton onClick={onButtonPress} buttonType="primary">
        Search
      </ActiveeButton>
    </div>
  );
}
