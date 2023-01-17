import React, { useState, useEffect } from "react";
import { backendUrl } from "../index";
import "../assets/css/ManageActivityPopUp.css";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import AcceptIconBlack from "../assets/svgs/accept_icon_black.svg";
import { ActiveeButton } from "./ActiveeButton";
import { CautionDisclaimer } from "./CautionDisclaimer";

/**
 * Pop-up für Aktivitäten merken auf Activity.js. Nutzer können unter all ihren Profilen auswählen,
 * für wen die Aktivität gemerkt werden soll
 * @param userToken
 * @param id
 * @param getActivityInfo
 * @param participants
 * @param ProfileSelectionVisible
 * @param setProfileSelectionVisible
 * @param setIsDisclaimerVisible
 * @returns {JSX.Element}
 * @constructor
 */
export function ManageActivityPopUp({
  userToken,
  id,
  getActivityInfo,
  participants,
  ProfileSelectionVisible,
  setProfileSelectionVisible,
  setIsDisclaimerVisible,
}) {
  // Liste an Profilen des Accounts
  const [profileList, setProfileList] = useState([]);
  // Liste an Profilen, welche bei der Aktivität angemeldet sind
  const [checkedAccounts, setCheckedAccounts] = useState([]);
  // Liste an Profilen, dessen Beziehung zu der Aktivität verändert werden soll
  const [toBeChangedAccounts, setToBeChangedAccounts] = useState([]);
  // Workaround, damit die Komponente sich richtig re-rendered bei Änderungen
  const [mutate, setMutate] = useState(false);

  // Fetch request wird nur beim ersten Aufruf der Komponente ausgelöst, unabhängig von anderen re-renders
  useEffect(() => {
    getProfileList();
  }, []);

  useEffect(() => {
    if (ProfileSelectionVisible) {
      // Damit die Liste an gemerkten Nutzern sich nach der Aktualisierung des Nutzers auch aktualisiert,
      // werden hier erneut die gemerkten Nutzer ermittelt
      if (profileList.length > 0) getCheckedAccounts(profileList);
      // Sperrt Scrolling des Bildschirms, solange Popup offen ist
      document.body.style.overflow = "hidden";
    }
    return function cleanup() {
      // Entfernt Scrolling-Sperre
      document.body.style.overflow = "unset";
    };
  }, [ProfileSelectionVisible]);

  // Ruft alle Unterprofile des Nutzers ab
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
      });
    // TODO: error-handling
  };

  // Speichert die gemerkten Nutzer in die Aktivität
  const saveChanges = () => {
    // Wird nur durchgeführt, falls der Nutzer wirklich Änderungen gemacht hat
    if (toBeChangedAccounts.length > 0) {
      const url = backendUrl + "/activity/" + id + "/save";
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({ accounts: toBeChangedAccounts }),
      };
      fetch(url, requestOptions).then((response) => {
        if (response.status === 200) {
          // Erneuter fetch der ActivityInfo und Schließung des Popups
          setToBeChangedAccounts([]);
          setCheckedAccounts([]);
          getActivityInfo();
          setProfileSelectionVisible(false);
          setIsDisclaimerVisible(true);
        } // TODO: error-handling
      });
    } else {
      // Bei keinen Änderungen schließt sich das Popup lediglich
      setProfileSelectionVisible(false);
    }
  };

  // Überprüft, welche Profile des Nutzers bereits bei der Aktivität angemeldet sind und schreibt diese in
  // eine Liste
  const getCheckedAccounts = (profileList) => {
    const checkedProfiles = [];
    for (const profile of profileList) {
      if (participants.includes(profile._id)) {
        checkedProfiles.push(profile._id);
      }
    }
    if (checkedProfiles.length === 0 && profileList.length === 1) {
      checkedProfiles.push(profileList[0]._id);
      setToBeChangedAccounts([...toBeChangedAccounts, profileList[0]._id]);
    }
    setCheckedAccounts(checkedProfiles);
  };

  // Schreibt einen Nutzer in die toBeChanged Liste, falls dessen Beziehung zu der Aktivität (also gemerkt/nicht gemerkt)
  // verändert werden soll
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
      <div className={`manage-activity-pop-up ${!ProfileSelectionVisible && "hidden"}`}>
        <div className="manage-activity-pop-up-container">
          <div className="manage-activity-pop-up-header">
            <span className="manage-activity-pop-up-title">Aktivität merken für...</span>
            <img
              className="manage-activity-pop-up-exit"
              src={CancelIconBlack}
              onClick={() => setProfileSelectionVisible(false)}
              alt="Cancel"
            />
          </div>
          <div className="manage-activity-pop-up-list">
            {profileList.map((item, key) => (
              <div key={item._id}>
                <button
                  className="manage-activity-pop-up-item"
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
                {key + 1 < profileList.length && <hr className="light" />}
              </div>
            ))}
          </div>
          <div className="manage-activity-pop-up-options">
            <ActiveeButton buttonType="primary" onClick={() => saveChanges()}>
              Speichern
            </ActiveeButton>
          </div>
        </div>
      </div>
      {ProfileSelectionVisible && <div className="modal-background" onClick={() => setProfileSelectionVisible(false)}></div>}
    </>
  );
}
