import React, { useState, useEffect } from "react";
import { backendUrl } from "../index";
import "../assets/css/ManageActivityPopUp.css";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import AcceptIconBlack from "../assets/svgs/accept_icon_black.svg";
import { ActiveeButton } from "./ActiveeButton";

export function ManageActivityPopUp({
  userToken,
  id,
  getActivityInfo,
  participants,
  ProfileSelectionVisible,
  setProfileSelectionVisible,
}) {
  const [profileList, setProfileList] = useState([]);
  const [checkedAccounts, setCheckedAccounts] = useState([]);
  const [toBeChangedAccounts, setToBeChangedAccounts] = useState([]);
  const [mutate, setMutate] = useState(false);

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

  // Save Fetch Request
  const saveChanges = () => {
    const url = backendUrl + "/activity/" + id + "/save";
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ accounts: toBeChangedAccounts }),
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        setToBeChangedAccounts([]);
        setCheckedAccounts([]);
        getActivityInfo();
        setProfileSelectionVisible(false);
      }
    });
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
    setMutate(!mutate);
    setCheckedAccounts(checkedAccountsList);
    setToBeChangedAccounts(changedAccountsList);
  };
  return (
    <>
      <div className="manage-activity-pop-up">
        <div className="manage-activity-pop-up-container">
          <div className="manage-activity-pop-up-header">
            <span className="manage-activity-pop-up-title">Aktivität merken</span>
            <img
              className="manage-activity-pop-up-exit"
              src={CancelIconBlack}
              onClick={() => setProfileSelectionVisible(false)}
              alt="Cancel"
            />
          </div>
          <div className="manage-activity-pop-up-list">
            {profileList.map((item, key) => (
              <button
                className="manage-activity-pop-up-item"
                key={item._id}
                onClick={() => {
                  setCheckedAndChangedAccountLists(item._id);
                }}>
                <img
                  className="manage-activity-pop-up-item-image"
                  src={`${backendUrl}/images/profiles/${item._id}.jpg`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${backendUrl}/images/profiles/default_account_icon.svg`;
                  }}
                  alt="Account icon"
                />
                <span className="manage-activity-pop-up-item-container">
                  <div className="manage-activity-pop-up-item-name">
                    {item.first_name} {item.last_name}
                  </div>
                  <div className="manage-activity-pop-up-item-type">{item.main_profile ? "Hauptprofil" : "Unterprofil"}</div>
                </span>
                <img
                  className={
                    checkedAccounts.includes(item._id)
                      ? "manage-activity-pop-up-item-icon"
                      : "manage-activity-pop-up-item-icon hidden"
                  }
                  src={AcceptIconBlack}
                  alt="Active Icon"
                />
              </button>
            ))}
          </div>
          <div className="manage-activity-pop-up-options">
            <ActiveeButton buttonType="primary" onClick={() => saveChanges()}>
              Speichern
            </ActiveeButton>
          </div>
        </div>
      </div>
      <div className="modal-background" onClick={() => setProfileSelectionVisible(false)}></div>
    </>
  );
}