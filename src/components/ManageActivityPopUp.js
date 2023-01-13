import React, { useState, useEffect } from "react";
import { backendUrl } from "../index";
import "../assets/css/ManageActivityPopUp.css";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import AcceptIconBlack from "../assets/svgs/accept_icon_black.svg";
import { ActiveeButton } from "./ActiveeButton";

export function ManageActivityPopUp({ userToken, participants, ProfileSelectionVisible, setProfileSelectionVisible }) {
  const [profileList, setProfileList] = useState([]);
  const [checkedAccounts, setCheckedAccounts] = useState([]);
  const [toBeChangedAccounts, setToBeChangedAccounts] = useState([]);

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
    const url = backendUrl + "/account/profile-list";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProfileList(data);
        getCheckedAccounts(data);
      });
  };
  const getCheckedAccounts = (profileList) => {
    const checkedProfiles = [];
    for (const profile of profileList) {
      if (participants.includes(profile._id)) {
        checkedProfiles.push(profile._id);
      }
    }
    setCheckedAccounts(checkedProfiles);
  };

  const setCheckedAndChangedAccountLists = (id) => {
    const checkedAccountsList = checkedAccounts;
    const changedAccountsList = toBeChangedAccounts;
    if (checkedAccountsList.includes(id)) {
      const index = checkedAccountsList.indexOf(id);
      checkedAccountsList.splice(index, 1);
    } else {
      checkedAccountsList.push(id);
    }
    if (changedAccountsList.includes(id)) {
      const index = changedAccountsList.indexOf(id);
      changedAccountsList.splice(index, 1);
    } else {
      changedAccountsList.push(id);
    }
    setCheckedAccounts(checkedAccountsList);
    setToBeChangedAccounts(changedAccountsList);
  };

  console.log(checkedAccounts, toBeChangedAccounts);
  return (
    <div className="manage-activity-pop-up">
      <div className="profile-selection-container">
        <div className="profile-selection-header">
          <span className="profile-selection-title">Aktivität verwalten</span>
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
              onClick={() => setCheckedAndChangedAccountLists(item._id)}>
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
                className={
                  checkedAccounts.includes(item._id) ? "profile-selection-item-icon" : "profile-selection-item-icon hidden"
                }
                src={AcceptIconBlack}
                alt="Active Icon"
              />
            </button>
          ))}
        </div>
        <div className="profile-selection-options">
          <ActiveeButton buttonType="primary">Wechseln</ActiveeButton>
        </div>
      </div>
    </div>
  );
}
