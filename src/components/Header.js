import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/Header.css";
import ActiveeLogo from "../assets/pngs/40px_activee_logo.png";
import SearchIconBlack from "../assets/svgs/search_icon_black.svg";
import AccountIconBlack from "../assets/svgs/account_icon_black.svg";
import GermanIcon from "../assets/svgs/german_icon.svg";
import { useScrollDirection } from "../scripts/useScrollDirection";
import { MenuPopup } from "./MenuPopup";
import { useCookies } from "react-cookie";

export function Header() {
  const [cookies, setCookie] = useCookies(["userId", "userType"]);
  const scrollDirection = useScrollDirection();
  const [isCiVisible, setIsCiVisible] = useState(false);
  const [isOptionsPopupVisible, setIsOptionsPopupVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const handleScroll = () => {
    setIsOptionsPopupVisible(false);
    setIsCiVisible((isVisible) => {
      const minimumHeight = 200;
      if (!isVisible && (document.body.scrollTop > minimumHeight || document.documentElement.scrollTop > minimumHeight)) {
        return true;
      }

      if (isVisible && document.body.scrollTop < minimumHeight && document.documentElement.scrollTop < minimumHeight) {
        return false;
      }

      return isVisible;
    });
  };
  if (cookies.userType === "participant" || cookies.userType === "organisation") {
    return (
      <div className={`header ${scrollDirection === "down" ? "hide" : "show"}`}>
        <NavLink id="home-link" to={`/`}>
          <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
        </NavLink>
        <div id="header-options">
          <NavLink id="search-link" to={`/search`}>
            <img id="search-icon" className="header-icon" src={SearchIconBlack} alt="Search icon" />
          </NavLink>
          <span id="languages-popup-button" className="header-button">
            <img id="language-icon" className="header-icon" src={GermanIcon} alt="Language icon" />
          </span>
          <span
            id="options-popup-button"
            className="header-button"
            onClick={() => {
              setIsOptionsPopupVisible(!isOptionsPopupVisible);
            }}>
            <img id="account-icon" className="header-icon" src={AccountIconBlack} alt="Account icon" />
          </span>
        </div>
        {isOptionsPopupVisible && (
          <>
            <MenuPopup userType={cookies.userType} setOptionsPopupVisible={setIsOptionsPopupVisible} />
            <div
              id="popup-backdrop"
              onClick={() => {
                setIsOptionsPopupVisible(false);
              }}></div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className={isCiVisible ? "header" : "header no-background"}>
        <div className={isCiVisible ? "activee-ci" : "activee-ci hide"}>
          <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
          <span className="activee-name">activee</span>
        </div>
        <span id="languages-popup-button" className="header-button">
          <img id="language-icon" className="header-icon" src={GermanIcon} alt="Language icon" />
        </span>
      </div>
    );
  }
}
