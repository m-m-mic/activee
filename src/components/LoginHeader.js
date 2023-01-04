import React from "react";
import "../assets/css/Header.css";
import ActiveeLogo from "../assets/pngs/40px_activee_logo.png";
import { NavLink } from "react-router-dom";
import { backendUrl } from "../index";

export function LoginHeader() {
  return (
    <div className="header">
      <NavLink className="activee-ci" to="/">
        <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
        <span className="activee-name">activee</span>
      </NavLink>
      <span id="languages-popup-button" className="header-button">
        <img id="language-icon" className="header-icon" src={`${backendUrl}/flags/german_flag.jpg`} alt="Language icon" />
      </span>
    </div>
  );
}
