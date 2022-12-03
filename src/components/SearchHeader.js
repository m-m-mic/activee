import React from "react";
import "../assets/css/SearchHeader.css";
import "../assets/css/Header.css";
import BackButtonBlack from "../assets/svgs/back_button_black.svg";
import { useNavigate } from "react-router-dom";

export function SearchHeader() {
  const navigate = useNavigate();
  return (
    <div id="search-header">
      <div className="header-button" onClick={() => navigate(-1)}>
        <img className="header-icon" src={BackButtonBlack} alt="Back button" />
      </div>
      <input id="search-input" placeholder="Suchbegriff eingeben..." />
    </div>
  );
}
