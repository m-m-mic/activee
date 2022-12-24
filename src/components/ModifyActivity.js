import React, { useEffect, useState } from "react";
import "../assets/css/ModifyActivity.css";
import {
  setAgeDirectionInput,
  setAgeInput,
  setGenderInput,
  setLanguagesInput,
  setLeagueInput,
  setNameInput,
  setSportInput,
} from "../scripts/validateInputs";
import { useCookies } from "react-cookie";
import { createSelectArray } from "../scripts/createSelectArray";
import Select from "react-select";
import { agePreselect, genderPreselect } from "../scripts/inputTemplates";

export function ModifyActivity({ mode, activityInfo, setActivityInfo, validation, setValidation }) {
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
              className="modify-activity-select sport"
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
              className="modify-activity-select"
              defaultValue={ageDirection[0]}
              options={ageDirection}
              onChange={(option) => setAgeDirectionInput(option, activityInfo, setActivityInfo, validation, setValidation)}
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
    </>
  );
}
