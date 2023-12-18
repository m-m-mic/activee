import React, { useState } from "react";
import "../assets/css/DatePicker.css";
import Select from "react-select";
import { setDateDayInput, setDateEndingTime, setDateStartingTime } from "../scripts/handleInputs";
import { dateTemplate, weekdayPreselect } from "../scripts/inputTemplates";
import { ActiveeButton } from "./ActiveeButton.jsx";
import DeleteIconWhite from "../assets/svgs/delete_icon_white.svg";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";
import { SingleValueStyles } from "../scripts/reactSelect.jsx";
import { v4 } from "uuid";

/**
 * Komponente, mit welcher Termine zu Aktivitäten bearbeitet, hinzugefügt oder entfernt werden können
 * @param data
 * @param setData
 * @returns {JSX.Element}
 * @constructor
 */
export function DatePicker({ data, setData }) {
  const [weekdays, setWeekdays] = useState(weekdayPreselect);

  return (
    <div className="date-picker">
      {data.dates.map((date, key) => (
        <div key={date.id} className="date-picker-item">
          <div className="date-picker-inputs">
            <Select
              className="react-select date-picker-day"
              placeholder="Tag..."
              styles={SingleValueStyles}
              defaultValue={date.day.value ? date.day : null}
              options={weekdays}
              onChange={(option) => setDateDayInput(key, option, data, setData)}
            />
            <div className="date-picker-times">
              <input
                className="date-picker-time"
                type="time"
                defaultValue={date.starting_time}
                onChange={(e) => setDateStartingTime(key, e.target.value, data, setData)}
              />
              -
              <input
                className="date-picker-time"
                type="time"
                defaultValue={date.ending_time}
                onChange={(e) => setDateEndingTime(key, e.target.value, data, setData)}
              />
            </div>
          </div>
          {data.dates.length > 1 && (
            <div className="date-picker-delete">
              <ActiveeButton
                buttonType="warning"
                iconSrc={DeleteIconWhite}
                onClick={() => {
                  const dates = data.dates;
                  dates.splice(key, 1);
                  setData({ ...data, dates: dates });
                }}></ActiveeButton>
            </div>
          )}
        </div>
      ))}
      {data.dates.length <= 4 && (
        <ActiveeButton
          buttonType="blank"
          iconSrc={AddIconBlack}
          onClick={() => {
            setData({ ...data, dates: [...data.dates, { ...dateTemplate, id: v4() }] });
          }}>
          Termin hinzufügen
        </ActiveeButton>
      )}
    </div>
  );
}
