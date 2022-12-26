import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import { EditControls } from "../components/EditControls";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { TimeTable } from "../components/TimeTable";
import { GenderSelection } from "../components/GenderSelection";
import { TransportSelection } from "../components/TransportSelection";
import { SportSelection } from "../components/SportSelection";
import {
  ProfileInputValidator,
  setBirthday,
  setDistanceInput,
  setFirstNameInput,
  setLastNameInput,
  setPhoneNumber,
} from "../scripts/handleInputs";
import { AddressPicker } from "../components/AddressPicker";
import { WarningDisclaimer } from "../components/WarningDisclaimer";

export function EditProfile() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState();
  const [inputValidation, setInputValidation] = useState(ProfileInputValidator);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  useEffect(() => {
    getAccountInfo();
    document.title = "Dein Profil - activee";
  }, []);
  const getAccountInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:3033/account/info", requestOptions)
      .then((response) => response.json())
      .then((data) => setAccountInfo(data));
  };
  const updateAccountInfo = () => {
    for (const [key, value] of Object.entries(inputValidation)) {
      if (value === false) {
        setIsDisclaimerVisible(true);
        return;
      }
    }
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify(accountInfo),
    };
    fetch("http://localhost:3033/account/info", requestOptions).then((response) => {
      if (response.status === 200) {
        navigate("/profile");
      } else {
        console.log("Error while updating profile.");
      }
    });
  };
  if (cookies.userToken) {
    if (!accountInfo) {
      return null;
    }
    return (
      <>
        <WarningDisclaimer isDisclaimerVisible={isDisclaimerVisible}>Bitte überprüfe deine Angaben</WarningDisclaimer>
        <EditControls onConfirmClick={() => updateAccountInfo()} />
        <div className="profile-user-info">
          <img
            className="profile-user-picture"
            src={`http://localhost:3033/images/profiles/${cookies.userId}.jpg`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "http://localhost:3033/images/profiles/default_account_icon.svg";
            }}
            alt="Profile"
          />
          <span className="profile-user-credentials">
            <div className="profile-user-name flex">
              <input
                className={inputValidation.first_name ? "profile-input-name" : "profile-input-name warning"}
                defaultValue={accountInfo.first_name}
                placeholder="Vorname"
                onChange={(e) =>
                  setFirstNameInput(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)
                }
              />
              <input
                className={inputValidation.last_name ? "profile-input-name" : "profile-input-name warning"}
                defaultValue={accountInfo.last_name}
                placeholder="Nachname"
                onChange={(e) =>
                  setLastNameInput(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)
                }
              />
            </div>
            <div className="profile-user-email">
              {accountInfo.email} {!accountInfo.email && <>Unterprofil</>}
            </div>
          </span>
        </div>
        {cookies.userType === "organisation" && <div className="profile-club-name"> {accountInfo.club} </div>}
        <h2>Deine Angaben</h2>
        <div className="profile-general-info">
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Geboren am</span>
            <span className="profile-general-info-data">
              <input
                className={inputValidation.birthday ? "profile-input" : "profile-input warning"}
                type="date"
                defaultValue={accountInfo.birthday}
                onChange={(e) => setBirthday(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)}
              />
            </span>
          </div>
          {cookies.userType === "organisation" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Telefonnummer</span>
              <span className="profile-general-info-data">
                <input
                  type="tel"
                  className={inputValidation.phone_number ? "profile-input phone-input" : "profile-input phone-input warning"}
                  placeholder="Telefonnummer"
                  defaultValue={accountInfo.phone_number}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)
                  }
                />
              </span>
            </div>
          )}
          {cookies.userType === "participant" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Adresse</span>
              <AddressPicker
                data={accountInfo}
                setData={setAccountInfo}
                validation={inputValidation}
                setValidation={setInputValidation}
              />
            </div>
          )}
          <div className="profile-general-info-container language">
            <span className="profile-general-info-name">Sprachen</span>
            <span className="profile-general-info-data">
              {accountInfo.languages.map((item, key) => (
                <img
                  className="profile-general-info-language-icon"
                  src={`http://localhost:3033/flags/${item._id}_flag.jpg`}
                  alt="language icon"
                  key={key}
                />
              ))}
            </span>
          </div>
        </div>
        {cookies.userType === "participant" && (
          <>
            <h2>Präferenzen</h2>
            <GenderSelection data={accountInfo} setData={setAccountInfo} isEditMode />
            <h3>Sportarten</h3>
            <SportSelection data={accountInfo} setData={setAccountInfo} isEditMode />
            <h3>Anfahrt</h3>
            <TransportSelection data={accountInfo} setData={setAccountInfo} isEditMode />
            <div className="profile-general-info">
              <div className="profile-general-info-container">
                <span className="profile-general-info-name">Distanz</span>
                <span className="profile-general-info-data">
                  <input
                    className={inputValidation.distance ? "profile-input-distance" : "profile-input-distance warning"}
                    defaultValue={accountInfo.distance}
                    onChange={(e) =>
                      setDistanceInput(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)
                    }
                  />{" "}
                  km
                </span>
              </div>
            </div>
            {accountInfo.times > 0 && (
              <>
                <h3>Zeiten</h3>
                <TimeTable data={accountInfo.times}></TimeTable>
              </>
            )}
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
