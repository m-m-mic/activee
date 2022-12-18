import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import "../assets/css/ProfileSelection.css";
import AcceptIconBlack from "../assets/svgs/accept_icon_black.svg";
import { ActiveeButton } from "./ActiveeButton";
import { useNavigate } from "react-router-dom";
export function ProfileSelection({ ProfileSelectionVisible, setProfileSelectionVisible }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userTier"]);
  const [profileList, setProfileList] = useState([]);
  const [activeProfile, setActiveProfile] = useState(cookies.userId);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    if (ProfileSelectionVisible) {
      document.body.style.overflow = "hidden";
    }
    getProfileList();
    return function cleanup() {
      document.body.style.overflow = "unset";
    };
  }, []);
  const getProfileList = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:3033/account/account-list", requestOptions)
      .then((response) => response.json())
      .then((data) => handleActiveAccountList(data));
  };
  const changeProfile = () => {
    const url = "http://localhost:3033/account/change-profile";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify({ id: activeProfile }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => handleCookies(data.token, data.id, data.type, data.tier))
      .then(() => setProfileSelectionVisible(false))
      .then(() => navigate("/"));
  };
  const handleCookies = (token, userId, userType, userTier) => {
    setCookie("userToken", token, {
      path: "/",
    });
    setCookie("userId", userId, {
      path: "/",
    });
    setCookie("userType", userType, {
      path: "/",
    });
    setCookie("userTier", userTier, {
      path: "/",
    });
  };
  const handleActiveAccountList = (data) => {
    setProfileList(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === cookies.userId) {
        setActiveIndex(i);
      }
    }
  };
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
                src={`http://localhost:3033/images/profiles/${item._id}.jpg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "http://localhost:3033/images/profiles/default_account_icon.svg";
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
