import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/Header.css";
import ActiveeLogo from "../assets/pngs/40px_activee_logo.png";
import SearchIconBlack from "../assets/svgs/search_icon_black.svg";
import AccountIconBlack from "../assets/svgs/account_icon_black.svg";
import GermanIcon from "../assets/svgs/german_icon.svg";
import { useScrollDirection } from "../scripts/useScrollDirection";
import { MenuPopup } from "./MenuPopup";

export function Header({ userType }) {
  const scrollDirection = useScrollDirection();
  const [isShrunk, setShrunk] = useState(false);
  const [isOptionsPopupVisible, setOptionsPopupVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const handleScroll = () => {
    setOptionsPopupVisible(false);
    setShrunk((isShrunk) => {
      if (!isShrunk && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
        return true;
      }

      if (isShrunk && document.body.scrollTop < 4 && document.documentElement.scrollTop < 4) {
        return false;
      }

      return isShrunk;
    });
  };
  if (userType === "participant" || userType === "organisation") {
    return (
      <div className={`header ${scrollDirection === "down" ? "hide" : "show"}`}>
        <NavLink id="home-link" to={`/?user=${userType}`}>
          <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
        </NavLink>
        <div id="header-options">
          <NavLink id="search-link" to={`/search?user=${userType}`}>
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
            <MenuPopup userType={userType} />
            <div
              id="popup-backdrop"
              onClick={() => {
                setOptionsPopupVisible(false);
              }}></div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className={isShrunk ? "header" : "header maximized-header"}>
        <div id="activee-ci">
          <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
          <span className="activee-name">activee</span>
        </div>
        <span id="languages-popup-button" className="header-button-absolute">
          <img id="language-icon" className="header-icon" src={GermanIcon} alt="Language icon" />
        </span>
      </div>
    );
  }
}
