import React, { useEffect, useState } from "react";
import "../assets/css/CreateNewProfile.css";
import { NewSubAccountValidator, setFirstNameInput, setLastNameInput } from "../scripts/handleInputs";
import { useCookies } from "react-cookie";
import { ActiveeButton } from "./ActiveeButton.jsx";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import { ActiveeDisclaimer } from "./ActiveeDisclaimer.jsx";
import { useNavigate } from "react-router-dom";
import { handleCookieChange } from "../scripts/handleCookieChange";
import { backendUrl } from "../index.jsx";

/**
 * Popup-Komponente, in welcher "participant"-Nutzer ein neues Unterprofil erstellen könne.
 * @param isCreateSubAccountVisible
 * @param setCreateSubAccountVisible
 * @param firstName
 * @param lastName
 * @param address
 * @param email
 * @returns {JSX.Element}
 * @constructor
 */
export function CreateNewProfile({ isCreateSubAccountVisible, setCreateSubAccountVisible, firstName, lastName, address, email }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [disclaimer, setDisclaimer] = useState("Error");
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [newProfileInfo, setNewProfileInfo] = useState({
    first_name: "",
    last_name: lastName,
    type: cookies.userType,
    tier: "child",
    parent_email: email,
    related_accounts: [cookies.userId],
    club: null,
    phone_number: null,
    birthday: null,
    address: address,
    distance: null,
  });
  const [inputValidation, setInputValidation] = useState(NewSubAccountValidator);

  // Verhindert Scrolling des ganzen Viewports, solange Modal offen ist
  useEffect(() => {
    if (isCreateSubAccountVisible) {
      document.body.style.overflow = "hidden";
    }
    return function revertOverflow() {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Erstellt nach Validierung der Eingaben ein neues Profil mit Verbindung zum Account, welches es erstellt hat.
  // Nach Erstellung wird zu diesem Profil gewechselt
  const createNewProfile = () => {
    for (const [key, value] of Object.entries(inputValidation)) {
      if (value === false) {
        setDisclaimer("Überprüfe deine Angaben");
        setIsDisclaimerVisible(true);
        return;
      }
    }
    const url = backendUrl + "/account/create-profile";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify(newProfileInfo),
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 201) {
        response
          .json()
          .then((data) => handleCookieChange(setCookie, data.token, data.id, data.type, data.tier))
          .then(() => navigate("/profile"));
      } else if (response.status === 503) {
        setDisclaimer("Das Hinzufügen oder Verändern von Daten ist aufgrund von datenschutzrechtlichen Gründen deaktiviert");
        return setIsDisclaimerVisible(true);
      } else {
        setIsDisclaimerVisible(true);
        setDisclaimer("Profil konnte nicht gelöscht werden");
      }
    });
  };

  return (
    <>
      <div className="create-sub-account-modal">
        <div className="create-sub-account-container">
          <div className="create-sub-account-header">
            <span>Neues Profil erstellen</span>
            <img
              className="create-sub-account-exit"
              src={CancelIconBlack}
              onClick={() => setCreateSubAccountVisible(false)}
              alt="Cancel"
            />
          </div>
          <ActiveeDisclaimer isDisclaimerVisible={isDisclaimerVisible} type="fixed">
            {disclaimer}
          </ActiveeDisclaimer>
          <div className="create-sub-account-names">
            <input
              className={inputValidation.first_name ? "create-sub-account-input" : "create-sub-account-input warning"}
              defaultValue={newProfileInfo.first_name}
              placeholder="Vorname"
              onChange={(e) =>
                setFirstNameInput(e.target.value, newProfileInfo, setNewProfileInfo, inputValidation, setInputValidation)
              }
            />
            <input
              className={inputValidation.last_name ? "create-sub-account-input" : "create-sub-account-input warning"}
              defaultValue={newProfileInfo.last_name}
              placeholder="Nachname"
              onChange={(e) =>
                setLastNameInput(e.target.value, newProfileInfo, setNewProfileInfo, inputValidation, setInputValidation)
              }
            />
          </div>
          <div className="create-sub-account-options">
            <ActiveeButton
              buttonType="primary"
              onClick={() => {
                createNewProfile();
              }}>
              Erstellen
            </ActiveeButton>
          </div>
        </div>
      </div>
      <div className="modal-background" onClick={() => setCreateSubAccountVisible(false)}></div>
    </>
  );
}
