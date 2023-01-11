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
import { accountTemplate, agePreselect, genderPreselect } from "../scripts/inputTemplates";
import { DatePicker } from "./DatePicker";
import { AddressPicker } from "./AddressPicker";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "./ActiveeButton";
import { EditControls } from "./EditControls";
import { backendUrl } from "../index";
import { Subtitle } from "./Subtitle";
import { MultiValueLanguage, MultiValueRequiredItems, MultiValueStyles, SingleValueStyles } from "../scripts/reactSelect";
import { ActiveeCheckbox } from "./ActiveeCheckbox";
import { WarningModal } from "./WarningModal";
import { CautionDisclaimer } from "./CautionDisclaimer";
import { WarningDisclaimer } from "./WarningDisclaimer";

export function ModifyActivity({ editMode = false, activityInfo, setActivityInfo, validation, setValidation }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [isWarningModalVisible, setWarningModalVisible] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [languages, setLanguages] = useState();
  const [requiredItems, setRequiredItems] = useState();
  const [sports, setSports] = useState();
  const [ageDirection, setAgeDirection] = useState(agePreselect);
  const [genders, setGenders] = useState(genderPreselect);
  const [isIntegrationChecked, setIntegrationChecked] = useState(activityInfo.league === "Integrationskurs");
  useEffect(() => {
    getPreselectOptions();
    transformDefaultValues();
  }, []);
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
  };

  const transformDefaultValues = () => {
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
      transformedValues = {
        sport: null,
        gender: null,
        languages: null,
        required_items: null,
      };
    }
    setDefaultValues(transformedValues);
  };
  const modifyActivity = () => {
    let validators = validation;
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
    for (const [key, value] of Object.entries(validators)) {
      if (value === false) {
        return setIsDisclaimerVisible(true);
      }
    }
    let url;
    let requestOptions;
    if (editMode) {
      url = backendUrl + "/activity/" + activityInfo._id;
      requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
        body: JSON.stringify(activityInfo),
      };
    } else {
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
      } else {
        console.log("Error while creating activity.");
      }
    });
  };
  const deleteActivity = () => {
    const url = backendUrl + "/activity/" + activityInfo._id;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        navigate(`/`);
      } else {
        console.log("Error while creating activity.");
      }
    });
  };
  if (!languages || !requiredItems || !sports || defaultValues === {}) {
    return null;
  }
  return (
    <>
      <WarningDisclaimer isDisclaimerVisible={isDisclaimerVisible} setIsDisclaimerVisible={setIsDisclaimerVisible} closable>
        Bitte überprüfe deine Angaben
      </WarningDisclaimer>
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
            className={validation.maximum_participants ? "" : "warning"}
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
      <h2>Mitgliedsbeitrag</h2>
      <textarea
        className={validation.membership_fee ? "modify-activity-membership-fee" : "modify-activity-membership-fee warning"}
        placeholder="Mitgliedsbeitrag..."
        defaultValue={activityInfo.membership_fee}
        onChange={(e) => setMembershipFeeInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
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
      <div className="register-mandatory-disclaimer">* Pflichtfeld</div>
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
