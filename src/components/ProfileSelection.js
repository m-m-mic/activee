import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import "../assets/css/ProfileSelection.css";
import AcceptIconBlack from "../assets/svgs/accept_icon_black.svg";
import { ActiveeButton } from "./ActiveeButton";
import { useNavigate } from "react-router-dom";
import { handleCookieChange } from "../scripts/handleCookieChange";
import { backendUrl } from "../index";

/**
 * Pop-up, mit welchen der Nutzer zwischen Profilen wechseln kann.
 * @param ProfileSelectionVisible
 * @param setProfileSelectionVisible
 * @returns {JSX.Element}
 * @constructor
 */
export function ProfileSelection({ ProfileSelectionVisible, setProfileSelectionVisible }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userTier"]);
  const [profileList, setProfileList] = useState([]);
  const [activeProfile, setActiveProfile] = useState(cookies.userId);
  const [activeIndex, setActiveIndex] = useState(null);

  // Verhindert Scrolling des Bodys, solange Pop-up geöffnet ist
  useEffect(() => {
    if (ProfileSelectionVisible) {
      document.body.style.overflow = "hidden";
    }
    getProfileList();
    return function cleanup() {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Fetched Liste an verbundenen Profilen des Accounts
  const getProfileList = () => {
    const url = backendUrl + "/account/profile-list";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => handleActiveAccountList(data));
    // TODO: error-handling
  };

  // Wechselt zu dem vom Nutzer ausgewählten Profil
  const changeProfile = () => {
    const url = backendUrl + "/account/change-profile";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify({ id: activeProfile }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => handleCookieChange(setCookie, data.token, data.id, data.type, data.tier))
      .then(() => setProfileSelectionVisible(false))
      .then(() => navigate("/"));
    // TODO: error-handling
  };

  // Iteriert durch Liste an Profilen und sucht nach dem Profil, welches momentan angemeldet ist. Der Index dieses Profils
  // wird in den activeIndex-State geschrieben, damit neben diesen ein Haken gesetzt werden kann
  const handleActiveAccountList = (data) => {
    setProfileList(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === cookies.userId) {
        setActiveIndex(i);
      }
    }
  };

  // Ändert den activeIndex zu den, auf welchen der Nutzer geklickt hat
  const handleActiveAccountChange = (id, index) => {
    setActiveProfile(id);
    setActiveIndex(index);
  };

  return (
    <div className="profile-selection">
      <div className="profile-selection-container">
        <div className="profile-selection-header">
          <span className="profile-selection-title">Profile</span>
          <img
            className="profile-selection-exit"
            src={CancelIconBlack}
            onClick={() => setProfileSelectionVisible(false)}
            alt="Cancel"
          />
        </div>
        <div className="profile-selection-list">
          {profileList.map((item, key) => (
            <button
              className="profile-selection-item"
              key={key}
              value={item._id}
              onClick={() => handleActiveAccountChange(item._id, key)}>
              <img
                className="profile-selection-item-image"
                src={`${backendUrl}/images/profiles/${item._id}.jpg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `${backendUrl}/images/profiles/default_account_icon.svg`;
                }}
                alt="Account icon"
              />
              <span className="profile-selection-item-container">
                <div className="profile-selection-item-name">
                  {item.first_name} {item.last_name}
                </div>
                <div className="profile-selection-item-type">{item.main_profile ? "Hauptprofil" : "Unterprofil"}</div>
              </span>
              <img
                className={key === activeIndex ? "profile-selection-item-icon" : "profile-selection-item-icon hidden"}
                src={AcceptIconBlack}
                alt="Active Icon"
              />
            </button>
          ))}
        </div>
        <div className="profile-selection-options">
          {cookies.userTier === "parent" && (
            <ActiveeButton buttonType="outline" onClick={() => navigate("/settings/profiles")}>
              Verwalten
            </ActiveeButton>
          )}
          <ActiveeButton buttonType="primary" onClick={() => changeProfile()}>
            Wechseln
          </ActiveeButton>
        </div>
      </div>
    </div>
  );
}
