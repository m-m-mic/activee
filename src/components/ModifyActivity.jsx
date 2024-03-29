import React, { useEffect, useState } from "react";
import "../assets/css/ModifyActivity.css";
import {
  setAdditionalInfoInput,
  setAgeDirectionInput,
  setAgeInput,
  setGenderInput,
  setLanguagesInput,
  setLeagueInput,
  setMaximumParticipantsInput,
  setMembershipFeeInput,
  setNameInput,
  setRequiredItemsInput,
  setRequirementsInput,
  setShowEmailInput,
  setShowPhoneNumberInput,
  setSportInput,
  isDateValid,
} from "../scripts/handleInputs";
import { useCookies } from "react-cookie";
import { createSelectArray, createSelectObject } from "../scripts/createSelectArray";
import Select from "react-select";
import { agePreselect, genderPreselect } from "../scripts/inputTemplates";
import { DatePicker } from "./DatePicker.jsx";
import { AddressPicker } from "./AddressPicker.jsx";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "./ActiveeButton.jsx";
import { EditControls } from "./EditControls.jsx";
import { backendUrl } from "../index.jsx";
import { Subtitle } from "./Subtitle.jsx";
import { MultiValueLanguage, MultiValueRequiredItems, MultiValueStyles, SingleValueStyles } from "../scripts/reactSelect.jsx";
import { ActiveeCheckbox } from "./ActiveeCheckbox.jsx";
import { WarningModal } from "./WarningModal.jsx";
import { CautionDisclaimer } from "./CautionDisclaimer.jsx";
import { ActiveeDisclaimer } from "./ActiveeDisclaimer.jsx";

/**
 * Das Grundgerüst für das Modifizieren von Aktivitäten, welches in CreateActivity.jsx und EditActivity.jsx verwendet wird
 * @param editMode
 * @param activityInfo
 * @param setActivityInfo
 * @param validation
 * @param setValidation
 * @returns {JSX.Element|null}
 * @constructor
 */
export function ModifyActivity({ editMode = false, activityInfo, setActivityInfo, validation, setValidation }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [disclaimer, setDisclaimer] = useState("Error");
  const [isWarningModalVisible, setWarningModalVisible] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [languages, setLanguages] = useState();
  const [requiredItems, setRequiredItems] = useState();
  const [sports, setSports] = useState();
  const [ageDirection, setAgeDirection] = useState(agePreselect);
  const [genders, setGenders] = useState(genderPreselect);
  const [isIntegrationChecked, setIntegrationChecked] = useState(activityInfo.league === "Integrationskurs");

  /* Preselect-Options und Default-Values werden beim Rendern generiert */
  useEffect(() => {
    getPreselectOptions();
    transformDefaultValues();
  }, []);

  // Fetch Request für das Erstellen/Bearbeiten einer Aktivität
  const modifyActivity = () => {
    let validators = validation;
    // Validieren der Terminangaben, da dies nicht während der Eingabe geregelt werden kann
    for (const date of activityInfo.dates) {
      if (isDateValid(date)) {
        validators.dates = true;
        setValidation({ ...validation, dates: true });
      } else {
        validators.dates = false;
        setValidation({ ...validation, dates: false });
        break;
      }
    }

    // Validiert alle Einträge des validators-States
    for (const [key, value] of Object.entries(validators)) {
      if (value === false) {
        setDisclaimer("Bitte überprüfe deine Angaben");
        return setIsDisclaimerVisible(true);
      }
    }

    // Bei erfolgreicher Validierung wird der fetch-Request durchgeführt
    let url;
    let requestOptions;
    if (editMode) {
      // Für Bearbeiten (PATCH)
      url = backendUrl + "/activity/" + activityInfo._id;
      requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
        body: JSON.stringify(activityInfo),
      };
    } else {
      // Für Erstellen (POST)
      url = backendUrl + "/activity/";
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
        body: JSON.stringify(activityInfo),
      };
    }
    fetch(url, requestOptions).then((response) => {
      if (response.status === 201 || response.status === 200) {
        response.json().then((data) => navigate(`/activity/${data._id}`));
      } else if (response.status === 503) {
        setDisclaimer("Das Hinzufügen oder Verändern von Daten ist aufgrund von datenschutzrechtlichen Gründen deaktiviert");
        return setIsDisclaimerVisible(true);
      } else {
        setDisclaimer("Es ist ein Fehler beim Modifizieren der Aktivität aufgetreten");
        return setIsDisclaimerVisible(true);
      }
    });
  };

  // Löscht Aktivität aus Datenbank
  const deleteActivity = () => {
    const url = backendUrl + "/activity/" + activityInfo._id;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        navigate(`/`);
      } else if (response.status === 503) {
        setDisclaimer("Das Hinzufügen oder Verändern von Daten ist aufgrund von datenschutzrechtlichen Gründen deaktiviert");
        setWarningModalVisible(false);
        return setIsDisclaimerVisible(true);
      } else {
        setWarningModalVisible(false);
        setDisclaimer("Es ist ein Fehler beim Löschen der Aktivität aufgetreten");
        return setIsDisclaimerVisible(true);
      }
    });
  };

  // Fetched Vorauswahl für Sprachen, Mitbringsel und Sportarten aus dem Backend
  const getPreselectOptions = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(`${backendUrl}/language`, requestOptions)
      .then((response) => response.json())
      .then((data) => setLanguages(createSelectArray(data)));
    fetch(`${backendUrl}/required-item`, requestOptions)
      .then((response) => response.json())
      .then((data) => setRequiredItems(createSelectArray(data)));
    fetch(`${backendUrl}/sport`, requestOptions)
      .then((response) => response.json())
      .then((data) => setSports(createSelectArray(data)));
    // TODO: error-handling
  };

  // Wandelt die bereits getätigten Angaben des Nutzers für Sport, Geschlecht und Sprachen in Objekte um, welche von
  // der react-select-Library als defaultValues verwendet werden können
  const transformDefaultValues = () => {
    // Erstellen einer tiefen Kopie, um Mutation von activityInfo zu verhindern
    const defaultInfo = structuredClone(activityInfo);
    let transformedValues;
    if (editMode) {
      transformedValues = {
        sport: createSelectObject(defaultInfo.sport),
        gender: createSelectObject(defaultInfo.gender),
        languages: createSelectArray(defaultInfo.languages),
      };
      if (defaultInfo.required_items.length > 0) {
        transformedValues = { ...transformedValues, required_items: createSelectArray(defaultInfo.required_items) };
      } else {
        transformedValues = { ...transformedValues, required_items: null };
      }
    } else {
      // Keine defaultValues für CreateActivity.jsx notwendig
      transformedValues = {
        sport: null,
        gender: null,
        languages: null,
        required_items: null,
      };
    }
    setDefaultValues(transformedValues);
  };

  if (!languages || !requiredItems || !sports || defaultValues === {}) {
    return null;
  }
  return (
    <>
      <ActiveeDisclaimer
        isDisclaimerVisible={isDisclaimerVisible}
        setIsDisclaimerVisible={setIsDisclaimerVisible}
        type="closable">
        {disclaimer}
      </ActiveeDisclaimer>
      {isWarningModalVisible && (
        <>
          <WarningModal
            onClick={() => deleteActivity()}
            isWarningModalVisible={isWarningModalVisible}
            setWarningModalVisible={setWarningModalVisible}
            title={"Aktivität löschen"}
            action={"löschen"}>
            <b>Willst du diese Aktivität wirklich löschen?</b> <br /> Diese Handlung kann nicht rückgängig gemacht werden.
          </WarningModal>
        </>
      )}
      <input
        className={validation.name ? "modify-activity-name" : "modify-activity-name warning"}
        placeholder="Neue Aktivität..."
        defaultValue={activityInfo.name}
        onChange={(e) => setNameInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
      />
      <Subtitle>{activityInfo.club}</Subtitle>
      <h2>Hauptangaben</h2>
      {!editMode && (
        <CautionDisclaimer>
          <b>Sportart</b>, <b>Geschlecht</b> und <b>Alter</b> können nach Erstellung nicht mehr geändert werden!
        </CautionDisclaimer>
      )}
      <div className="modify-activity-general-info">
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Sportart{!editMode && " *"}</span>
          <span className="modify-activity-general-info-data">
            <Select
              className="react-select modify-activity-select sport"
              placeholder="Sportart..."
              defaultValue={defaultValues.sport}
              styles={SingleValueStyles}
              options={sports}
              onChange={(option) => setSportInput(option, activityInfo, setActivityInfo, validation, setValidation)}
              isDisabled={editMode}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Geschlecht{!editMode && " *"}</span>
          <span className="modify-activity-general-info-data">
            <Select
              placeholder="Geschlecht..."
              className="react-select modify-activity-select gender"
              defaultValue={defaultValues.gender}
              options={genders}
              styles={SingleValueStyles}
              onChange={(option) => setGenderInput(option, activityInfo, setActivityInfo, validation, setValidation)}
              isDisabled={editMode}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Alter{!editMode && " *"}</span>
          <span className="modify-activity-general-info-data">
            <input
              placeholder="Alter..."
              className={validation.age ? "modify-activity-age" : "modify-activity-age warning"}
              defaultValue={activityInfo.age.age}
              onChange={(e) => setAgeInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
              disabled={editMode}
            />
            <Select
              className="react-select modify-activity-select age-direction"
              defaultValue={activityInfo.isOlderThan ? ageDirection[1] : ageDirection[0]}
              options={ageDirection}
              styles={SingleValueStyles}
              isDisabled={editMode}
              onChange={(option) => setAgeDirectionInput(option, activityInfo, setActivityInfo)}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container language">
          <span className="modify-activity-general-info-name">Sprachen *</span>
          <span className="modify-activity-general-info-data">
            <Select
              className="react-select modify-activity-select"
              placeholder="Sprachen..."
              defaultValue={defaultValues.languages}
              components={{ MultiValue: MultiValueLanguage }}
              isMulti
              styles={MultiValueStyles}
              options={languages}
              onChange={(option) => setLanguagesInput(option, activityInfo, setActivityInfo, validation, setValidation)}
              isOptionDisabled={() => activityInfo.languages.length >= 3}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Liga</span>
          <span className="modify-activity-general-info-data league">
            <input
              placeholder="Liga..."
              className={validation.league ? "modify-activity-league" : "modify-activity-league warning"}
              value={activityInfo.league}
              onChange={(e) => setLeagueInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
              disabled={isIntegrationChecked}
            />
            <div>
              <ActiveeCheckbox
                defaultValue={isIntegrationChecked}
                onChange={() => {
                  setIntegrationChecked(!isIntegrationChecked);
                  setLeagueInput("Integrationskurs", activityInfo, setActivityInfo, validation, setValidation);
                }}>
                Integrationskurs
              </ActiveeCheckbox>
            </div>
          </span>
        </div>
      </div>
      <h2>Voraussetzungen</h2>
      <div className="modify-activity-general-info-container">
        <span className="modify-activity-general-info-name">Maximale Teilnehmeranzahl</span>
        <span className="modify-activity-general-info-data league">
          <input
            placeholder=""
            className={validation.maximum_participants ? "modify-activity-count" : "modify-activity-count warning"}
            defaultValue={activityInfo.maximum_participants}
            onChange={(e) =>
              setMaximumParticipantsInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)
            }
          />
        </span>
      </div>
      <textarea
        className={validation.requirements ? "" : "warning"}
        placeholder="Voraussetzungen für die Aktivität..."
        defaultValue={activityInfo.requirements}
        onChange={(e) => setRequirementsInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
      />
      <h2>Mitbringsel</h2>
      <Select
        className="react-select modify-activity-select items"
        placeholder="Vorausgesetzte Mitbringsel..."
        components={{ MultiValue: MultiValueRequiredItems }}
        isMulti
        styles={MultiValueStyles}
        defaultValue={defaultValues.required_items}
        options={requiredItems}
        onChange={(option) => setRequiredItemsInput(option, activityInfo, setActivityInfo, validation, setValidation)}
      />
      <h2>Infos vom Verein</h2>
      <textarea
        className={validation.additional_info ? "" : "warning"}
        placeholder="Zusätzliche Informationen..."
        defaultValue={activityInfo.additional_info}
        onChange={(e) => setAdditionalInfoInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
      />
      <h2>Termine *</h2>
      <DatePicker data={activityInfo} setData={setActivityInfo} validation={validation} setValidation={setValidation} />
      <h2>Adresse *</h2>
      <AddressPicker
        data={activityInfo}
        setData={setActivityInfo}
        validation={validation}
        setValidation={setValidation}
        isActivity={true}
      />
      <h2>Mitgliedsbeitrag</h2>
      <textarea
        className={validation.membership_fee ? "modify-activity-membership-fee" : "modify-activity-membership-fee warning"}
        placeholder="Mitgliedsbeitrag..."
        defaultValue={activityInfo.membership_fee}
        onChange={(e) => setMembershipFeeInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
      />
      <h2>Übungsleiter:innen</h2>
      {activityInfo.trainers.map((trainer, key) => (
        <div key={key}>
          <h4>
            {trainer.first_name} {trainer.last_name}
          </h4>
          <div className="modify-activity-trainer-checkboxes">
            <ActiveeCheckbox
              defaultValue={trainer.show_email}
              onChange={() => setShowEmailInput(trainer.show_email, key, activityInfo, setActivityInfo)}>
              E-Mail anzeigen
            </ActiveeCheckbox>
            <ActiveeCheckbox
              defaultValue={trainer.show_phone_number}
              onChange={() => setShowPhoneNumberInput(trainer.show_phone_number, key, activityInfo, setActivityInfo)}>
              Telefonnummer anzeigen
            </ActiveeCheckbox>
          </div>
        </div>
      ))}
      <h2>Sichtbarkeit</h2>
      <ActiveeCheckbox
        defaultValue={activityInfo.only_logged_in}
        onChange={() => setActivityInfo({ ...activityInfo, only_logged_in: !activityInfo.only_logged_in })}>
        Aktivität nur für angemeldete Nutzer sichtbar machen
      </ActiveeCheckbox>
      <div className="register-mandatory-disclaimer">* Pflichtfelder</div>
      <div className="modify-activity-button">
        {editMode ? (
          <ActiveeButton buttonType="warning" onClick={() => setWarningModalVisible(true)}>
            Aktivität löschen
          </ActiveeButton>
        ) : (
          <ActiveeButton buttonType="primary" onClick={() => modifyActivity()}>
            Aktivität erstellen
          </ActiveeButton>
        )}
      </div>
      {editMode && <EditControls onConfirmClick={() => modifyActivity()} />}
    </>
  );
}
