import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/Header.css";
import ActiveeLogo from "../assets/pngs/40px_activee_logo.png";
import SearchIconBlack from "../assets/svgs/search_icon_black.svg";
import AccountIconBlack from "../assets/svgs/account_icon_black.svg";
import GermanIcon from "../assets/svgs/german_icon.svg";
import { useScrollDirection } from "../scripts/useScrollDirection";
import { MenuPopup } from "./MenuPopup";

export function Header(userId) {
  const scrollDirection = useScrollDirection();
  const [isOptionsPopupVisible, setOptionsPopupVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const handleScroll = () => {
    setOptionsPopupVisible(false);
  };
  return (
    <div className={`header ${scrollDirection === "down" ? "hide" : "show"}`}>
      <NavLink id="home-link" to="/">
        <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
      </NavLink>
      <div id="header-options">
        <NavLink id="search-link" to="/search">
          <img id="search-icon" className="header-icon" src={SearchIconBlack} alt="Search icon" />
        </NavLink>
        <span id="languages-popup-button" className="header-button">
          <img id="language-icon" className="header-icon" src={GermanIcon} alt="Language icon" />
        </span>
        <span
          id="options-popup-button"
          className="header-button"
          onClick={() => {
            setOptionsPopupVisible(!isOptionsPopupVisible);
          }}>
          <img id="account-icon" className="header-icon" src={AccountIconBlack} alt="Account icon" />
        </span>
      </div>
      {isOptionsPopupVisible && (
        <>
          <MenuPopup />
          <div
            id="popup-backdrop"
            onClick={() => {
              setOptionsPopupVisible(false);
            }}></div>
        </>
      )}
    </div>
  );
}
