import React from "react";
import "../assets/css/Header.css";
import GermanIcon from "../assets/svgs/german_icon.svg";

export function LoginHeader() {
  return (
    <div className="header language-only">
      <span id="languages-popup-button" className="header-button">
        <img id="language-icon" className="header-icon" src={GermanIcon} alt="Language icon" />
      </span>
    </div>
  );
}
