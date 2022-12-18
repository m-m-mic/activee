import React, { useEffect, useState } from "react";
import "../assets/css/CreateNewProfile.css";
import { NewSubAccountValidator, setFirstNameInput, setLastNameInput } from "../scripts/validateInputs";
import { useCookies } from "react-cookie";
import { ActiveeButton } from "./ActiveeButton";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import { WarningDisclaimer } from "./WarningDisclaimer";
import { useNavigate } from "react-router-dom";

export function CreateNewProfile({ isCreateSubAccountVisible, setCreateSubAccountVisible, firstName, lastName, address }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [newProfileInfo, setNewProfileInfo] = useState({
    first_name: "",
    last_name: lastName,
    type: cookies.userType,
    tier: "child",
    related_accounts: [{ _id: cookies.userId, first_name: firstName, last_name: lastName }],
    club: null,
    phone_number: null,
    birthday: null,
    address: address,
    distance: null,
  });
  const [inputValidation, setInputValidation] = useState(NewSubAccountValidator);
  useEffect(() => {
    if (isCreateSubAccountVisible) {
      document.body.style.overflow = "hidden";
    }
    return function cleanup() {
      document.body.style.overflow = "unset";
    };
  }, []);
  const createNewProfile = () => {
    for (const [key, value] of Object.entries(inputValidation)) {
      if (value === false) {
        setIsDisclaimerVisible(true);
        return;
      }
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify(newProfileInfo),
    };
    fetch("http://localhost:3033/account/create-profile", requestOptions)
      .then((response) => response.json())
      .then((data) => handleCookies(data.token, data.id, data.type, data.tier))
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
  console.log(newProfileInfo);
  return (
    <div className="create-sub-account-modal">
      <div className="create-sub-account-container">
        <div className="create-sub-account-header">
          <span className="profile-selection-title">Neues Profil erstellen</span>
          <img
            className="create-sub-account-exit"
            src={CancelIconBlack}
            onClick={() => setCreateSubAccountVisible(false)}
            alt="Cancel"
          />
        </div>
        <WarningDisclaimer isDisclaimerVisible={isDisclaimerVisible}>Bitte überprüfe deine Angaben</WarningDisclaimer>
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
  );
}
