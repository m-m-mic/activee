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
import { DatePicker } from "./DatePicker";
import { AddressPicker } from "./AddressPicker";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "./ActiveeButton";
import { EditControls } from "./EditControls";
import { backendUrl } from "../index";

export function ModifyActivity({ editMode = false, activityInfo, setActivityInfo, validation, setValidation }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken"]);
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
        console.log("Validation failed");
        return;
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
      {editMode && <EditControls onConfirmClick={() => modifyActivity()} />}

      <input
        className={validation.name ? "modify-activity-name" : "modify-activity-name warning"}
        placeholder="Neue Aktivität..."
        defaultValue={activityInfo.name}
        onChange={(e) => setNameInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
      />
      <div className="modify-activity-club">{activityInfo.club}</div>
      <h2>Hauptangaben</h2>
      <div className="modify-activity-general-info">
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Sportart</span>
          <span className="modify-activity-general-info-data">
            <Select
              className="modify-activity-select sport"
              placeholder="Sportart..."
              defaultValue={defaultValues.sport}
              options={sports}
              onChange={(option) => setSportInput(option, activityInfo, setActivityInfo, validation, setValidation)}
              isDisabled={editMode}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Geschlecht</span>
          <span className="modify-activity-general-info-data">
            <Select
              placeholder="Geschlecht..."
              className="modify-activity-select gender"
              defaultValue={defaultValues.gender}
              options={genders}
              onChange={(option) => setGenderInput(option, activityInfo, setActivityInfo, validation, setValidation)}
              isDisabled={editMode}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Alter</span>
          <span className="modify-activity-general-info-data">
            <input
              placeholder="Alter..."
              className={validation.age ? "modify-activity-age" : "modify-activity-age warning"}
              defaultValue={activityInfo.age.age}
              onChange={(e) => setAgeInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
              disabled={editMode}
            />
            <Select
              className="modify-activity-select age-direction"
              defaultValue={activityInfo.isOlderThan ? ageDirection[1] : ageDirection[0]}
              options={ageDirection}
              isDisabled={editMode}
              onChange={(option) => setAgeDirectionInput(option, activityInfo, setActivityInfo)}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Sprachen</span>
          <span className="modify-activity-general-info-data">
            <Select
              className="modify-activity-select languages"
              placeholder="Sprachen..."
              defaultValue={defaultValues.languages}
              isMulti
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
              <input
                type="checkbox"
                defaultValue={isIntegrationChecked}
                checked={isIntegrationChecked}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIntegrationChecked(!isIntegrationChecked);
                  setLeagueInput("Integrationskurs", activityInfo, setActivityInfo, validation, setValidation);
                }}
              />
              Integrationskurs
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
      <Select
        className="modify-activity-select items"
        placeholder="Vorausgesetzte Mitbringsel..."
        isMulti
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
      <h2>Termine</h2>
      <DatePicker data={activityInfo} setData={setActivityInfo} validation={validation} setValidation={setValidation} />
      <h2>Adresse</h2>
      <AddressPicker data={activityInfo} setData={setActivityInfo} validation={validation} setValidation={setValidation} />
      <h2>Übungsleiter:innen</h2>
      {activityInfo.trainers.map((trainer, key) => (
        <div key={key}>
          <h4>
            {trainer.first_name} {trainer.last_name}
          </h4>
          <input
            type="checkbox"
            checked={trainer.show_email}
            onChange={() => setShowEmailInput(trainer.show_email, key, activityInfo, setActivityInfo)}
          />
          <label>E-Mail anzeigen</label>
          <input
            type="checkbox"
            checked={trainer.show_phone_number}
            onChange={() => setShowPhoneNumberInput(trainer.show_phone_number, key, activityInfo, setActivityInfo)}
          />
          <label>Telefonnummer anzeigen</label>
        </div>
      ))}
      {editMode ? (
        <ActiveeButton buttonType="warning" onClick={() => deleteActivity()}>
          Aktivität löschen
        </ActiveeButton>
      ) : (
        <ActiveeButton buttonType="primary" onClick={() => modifyActivity()}>
          Aktivität erstellen
        </ActiveeButton>
      )}
    </>
  );
}
