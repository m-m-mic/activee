import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/css/Header.css";
import ActiveeLogo from "../assets/pngs/40px_activee_logo.png";
import SearchIconBlack from "../assets/svgs/search_icon_black.svg";
import { useScrollDirection } from "../scripts/useScrollDirection";
import { MenuPopup } from "./MenuPopup";
import { useCookies } from "react-cookie";
import { ProfileSelection } from "./ProfileSelection";
import { backendUrl } from "../index";

export function Header({ welcome = false }) {
  let location = useLocation();
  const [cookies, setCookies] = useCookies(["userId", "userType"]);
  const scrollDirection = useScrollDirection();
  const [isCiVisible, setIsCiVisible] = useState(false);
  const [isOptionsPopupVisible, setIsOptionsPopupVisible] = useState(false);
  const [isProfileSelectionVisible, setIsProfileSelectionVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setIsProfileSelectionVisible(false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  // Funktion für den Header auf der LandingPage, welcher sich beim Herunterscrollen verändert
  const handleScroll = () => {
    setIsOptionsPopupVisible(false);
    setIsCiVisible((isVisible) => {
      const minHeight = 200; // Höhe, ab wann das activee Logo im Header auftaucht bzw. verschwindet
      if (!isVisible && (document.body.scrollTop > minHeight || document.documentElement.scrollTop > minHeight)) {
        return true;
      }
      if (isVisible && document.body.scrollTop < minHeight && document.documentElement.scrollTop < minHeight) {
        return false;
      }
      return isVisible;
    });
  };
  if (welcome) {
    return (
      <div className={isCiVisible ? "header" : "header no-background"}>
        <div className={isCiVisible ? "activee-ci" : "activee-ci hide"}>
          <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
          <span className="activee-name">activee</span>
        </div>
        <div id="header-options">
          <NavLink id="search-link" to={`/search`}>
            <img id="search-icon" className="header-icon" src={SearchIconBlack} alt="SearchResults icon" />
          </NavLink>
          <span id="languages-popup-button" className="header-button">
            <img id="language-icon" className="header-icon" src={`${backendUrl}/flags/german_flag.jpg`} alt="Language icon" />
          </span>
        </div>
      </div>
    );
  }
  if (cookies.userType === "participant" || cookies.userType === "organisation") {
    return (
      <div className={`header ${scrollDirection === "down" ? "hide" : "show"}`}>
        <NavLink id="home-link" to={`/`}>
          <img id="activee-logo" src={ActiveeLogo} alt="activee Logo" />
        </NavLink>
        <div id="header-options">
          <NavLink id="search-link" to={`/search`}>
            <img id="search-icon" className="header-icon" src={SearchIconBlack} alt="SearchResults icon" />
          </NavLink>
          <span id="languages-popup-button" className="header-button">
            <img id="language-icon" className="header-icon" src={`${backendUrl}/flags/german_flag.jpg`} alt="Language icon" />
          </span>
          <span
            id="options-popup-button"
            className="header-button"
            onClick={() => {
              setIsOptionsPopupVisible(!isOptionsPopupVisible);
            }}>
            <img
              id="account-icon"
              className="header-icon"
              src={`${backendUrl}/images/profiles/${cookies.userId}.jpg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `${backendUrl}/images/profiles/default_account_icon.svg`;
              }}
              alt="Account icon"
            />
          </span>
        </div>
        {isOptionsPopupVisible && (
          <>
            <MenuPopup
              userType={cookies.userType}
              setOptionsPopupVisible={setIsOptionsPopupVisible}
              setIsProfileSelectionVisible={setIsProfileSelectionVisible}
            />
            <div
              className="popup-backdrop"
              onClick={() => {
                setIsOptionsPopupVisible(false);
              }}></div>
          </>
        )}
        {isProfileSelectionVisible && (
          <>
            <ProfileSelection
              ProfileSelectionVisible={isProfileSelectionVisible}
              setProfileSelectionVisible={setIsProfileSelectionVisible}
            />
            <div
              className="popup-backdrop darken"
              onClick={() => {
                setIsProfileSelectionVisible(false);
              }}></div>
          </>
        )}
      </div>
    );
  } else {
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
}
