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
import { createSelectArray } from "../scripts/createSelectArray";
import Select from "react-select";
import { agePreselect, genderPreselect } from "../scripts/inputTemplates";
import { DatePicker } from "./DatePicker";
import { AddressPicker } from "./AddressPicker";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "./ActiveeButton";

export function ModifyActivity({ mode, activityInfo, setActivityInfo, validation, setValidation }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [languages, setLanguages] = useState();
  const [requiredItems, setRequiredItems] = useState();
  const [sports, setSports] = useState();
  const [ageDirection, setAgeDirection] = useState(agePreselect);
  const [genders, setGenders] = useState(genderPreselect);
  const [isIntegrationChecked, setIntegrationChecked] = useState(activityInfo.league === "Integrationskurs");
  useEffect(() => getPreselectOptions(), []);
  const getPreselectOptions = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:3033/language", requestOptions)
      .then((response) => response.json())
      .then((data) => setLanguages(createSelectArray(data)));
    fetch("http://localhost:3033/required-item", requestOptions)
      .then((response) => response.json())
      .then((data) => setRequiredItems(createSelectArray(data)));
    fetch("http://localhost:3033/sport", requestOptions)
      .then((response) => response.json())
      .then((data) => setSports(createSelectArray(data)));
  };

  const createActivity = () => {
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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify(activityInfo),
    };
    fetch("http://localhost:3033/activity", requestOptions).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => navigate(`/activity/${data._id}`));
      } else {
        console.log("Error while creating activity.");
      }
    });
  };
  console.log(activityInfo);
  console.log(validation);
  if (!languages || !requiredItems || !sports) {
    return null;
  }
  return (
    <>
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
              options={sports}
              onChange={(option) => setSportInput(option, activityInfo, setActivityInfo, validation, setValidation)}
            />
          </span>
        </div>
        <div className="modify-activity-general-info-container">
          <span className="modify-activity-general-info-name">Geschlecht</span>
          <span className="modify-activity-general-info-data">
            <Select
              placeholder="Geschlecht..."
              className="modify-activity-select gender"
              options={genders}
              onChange={(option) => setGenderInput(option, activityInfo, setActivityInfo, validation, setValidation)}
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
            />
            <Select
              className="modify-activity-select age-direction"
              defaultValue={ageDirection[0]}
              options={ageDirection}
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
              defaultValue={activityInfo.league}
              onChange={(e) => setLeagueInput(e.target.value, activityInfo, setActivityInfo, validation, setValidation)}
              disabled={isIntegrationChecked}
            />
            <div>
              <input
                type="checkbox"
                defaultValue={isIntegrationChecked}
                onChange={(e) => {
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
      <ActiveeButton buttonType="primary" onClick={() => createActivity()}>
        Aktivität erstellen
      </ActiveeButton>
    </>
  );
}
