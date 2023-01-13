import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import { EditControls } from "../components/EditControls";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { TimeTable } from "../components/TimeTable";
import { GenderSelection } from "../components/GenderSelection";
import { TransportSelection } from "../components/TransportSelection";
import {
  ProfileInputValidator,
  setBirthdayInput,
  setDistanceInput,
  setFirstNameInput,
  setLastNameInput,
  setPhoneNumberInput,
  setProfileLanguagesInput,
  setProfileSportsInput,
} from "../scripts/handleInputs";
import { AddressPicker } from "../components/AddressPicker";
import { ActiveeDisclaimer } from "../components/ActiveeDisclaimer";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";
import Select from "react-select";
import { getPreselectOptions } from "../scripts/fetchRequests";
import { createSelectArray } from "../scripts/createSelectArray";
import { MultiValueLanguage, MultiValueSport, MultiValueStyles } from "../scripts/reactSelect";
import { CautionDisclaimer } from "../components/CautionDisclaimer";

export function EditProfile() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState();
  const [inputValidation, setInputValidation] = useState(ProfileInputValidator);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [languages, setLanguages] = useState();
  const [sports, setSports] = useState();
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (cookies.userToken) {
      getPreselectOptions(cookies.userToken, setLanguages, null, setSports);
      getAccountInfo();
      document.title = "Dein Profil - activee";
    }
  }, []);

  // Fetched AccountInfo
  const getAccountInfo = () => {
    const url = backendUrl + "/account/info";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAccountInfo(data);
        transformDefaultValues(data);
      });
  };

  // Aktualisiert die AccountInfo des Nutzers
  const updateAccountInfo = () => {
    for (const [key, value] of Object.entries(inputValidation)) {
      if (value === false) {
        setIsDisclaimerVisible(true);
        return;
      }
    }
    const url = backendUrl + "/account/info";
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify(accountInfo),
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        navigate("/profile");
      } else {
        console.log("Error while updating profile.");
      }
    });
  };

  // Wandelt Sport und Language Auswahl des Nutzers in SelectArrays um, damit diese als Standardwerte angezeigt werden
  // können
  const transformDefaultValues = (data) => {
    const defaultInfo = structuredClone(data);
    let transformedValues = {
      sports: createSelectArray(defaultInfo.sports),
      languages: createSelectArray(defaultInfo.languages),
    };
    setDefaultValues(transformedValues);
  };

  if (cookies.userToken) {
    if (!accountInfo) {
      return <LoadingAnimation />;
    }
    return (
      <>
        <ActiveeDisclaimer
          isDisclaimerVisible={isDisclaimerVisible}
          setIsDisclaimerVisible={setIsDisclaimerVisible}
          type="closable">
          Bitte überprüfe deine Angaben
        </ActiveeDisclaimer>
        <div className="profile-user-info edit">
          <img
            className="profile-user-picture"
            src={`${backendUrl}/images/profiles/${cookies.userId}.jpg`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = `${backendUrl}/images/profiles/default_account_icon.svg`;
            }}
            alt="Profile"
          />
          <span className="profile-user-credentials">
            <div className="profile-user-name flex">
              <input
                className={inputValidation.first_name ? "profile-input name" : "profile-input name warning"}
                defaultValue={accountInfo.first_name}
                placeholder="Vorname"
                onChange={(e) =>
                  setFirstNameInput(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)
                }
              />
              <input
                className={inputValidation.last_name ? "profile-input name" : "profile-input name warning"}
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
                className={inputValidation.birthday ? "profile-input birthday" : "profile-input birthday warning"}
                type="date"
                defaultValue={accountInfo.birthday}
                onChange={(e) =>
                  setBirthdayInput(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)
                }
              />
            </span>
          </div>
          {cookies.userType === "organisation" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Telefonnummer</span>
              <span className="profile-general-info-data">
                <input
                  type="tel"
                  className={inputValidation.phone_number ? "profile-input phone" : "profile-input phone warning"}
                  placeholder="Telefonnummer"
                  defaultValue={accountInfo.phone_number}
                  onChange={(e) =>
                    setPhoneNumberInput(e.target.value, accountInfo, setAccountInfo, inputValidation, setInputValidation)
                  }
                />
              </span>
            </div>
          )}
          {cookies.userType === "participant" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Adresse</span>
              <div className="profile-general-address">
                <AddressPicker
                  data={accountInfo}
                  setData={setAccountInfo}
                  validation={inputValidation}
                  setValidation={setInputValidation}
                />
                {(accountInfo.address.street === "" ||
                  accountInfo.address.house_number === "" ||
                  accountInfo.address.zip_code === "" ||
                  accountInfo.address.city === "") && (
                  <CautionDisclaimer>Keine Distanzrechnung mit diesen Angaben möglich.</CautionDisclaimer>
                )}
              </div>
            </div>
          )}
          <div className="profile-general-info-container language">
            <span className="profile-general-info-name">Sprachen</span>
            <span className="profile-general-info-data">
              <Select
                className="react-select profile-select languages"
                placeholder="Sprachen..."
                defaultValue={defaultValues.languages}
                components={{ MultiValue: MultiValueLanguage }}
                isMulti
                styles={MultiValueStyles}
                options={languages}
                onChange={(option) => setProfileLanguagesInput(option, accountInfo, setAccountInfo)}
                isOptionDisabled={() => accountInfo.languages.length >= 5}
              />
            </span>
          </div>
        </div>
        {cookies.userType === "participant" && (
          <>
            <h2>Präferenzen</h2>
            <GenderSelection data={accountInfo} setData={setAccountInfo} isEditMode />
            <h3>Sportarten</h3>
            <Select
              className="react-select profile-select sports"
              placeholder="Sportarten..."
              defaultValue={defaultValues.sports}
              isMulti
              components={{ MultiValue: MultiValueSport }}
              styles={MultiValueStyles}
              options={sports}
              onChange={(option) => setProfileSportsInput(option, accountInfo, setAccountInfo)}
              isOptionDisabled={() => accountInfo.sports.length >= 6}
            />
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
        <EditControls onConfirmClick={() => updateAccountInfo()} />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
