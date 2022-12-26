import React, { useState } from "react";
import "../assets/css/DatePicker.css";
import Select from "react-select";
import { setDateDayInput, setDateEndingTime, setDateStartingTime } from "../scripts/handleInputs";
import { dateTemplate, weekdayPreselect } from "../scripts/inputTemplates";
import { ActiveeButton } from "./ActiveeButton";

export function DatePicker({ data, setData, validation, setValidation }) {
  const [weekdays, setWeekdays] = useState(weekdayPreselect);
  let dateList = data.dates;
  return (
    <div className="date-picker">
      {data.dates.map((date, key) => (
        <div key={key} className="date-picker-item">
          <Select
            className="date-picker-day"
            placeholder="Tag..."
            defaultValue={date.day.value ? date.day : null}
            options={weekdays}
            onChange={(option) => setDateDayInput(key, option, data, setData)}
          />
          <div className="date-picker-times">
            <input
              className="date-picker-starting-time"
              type="time"
              defaultValue={date.starting_time}
              onChange={(e) => setDateStartingTime(key, e.target.value, data, setData)}
            />
            -
            <input
              className="date-picker-ending-time"
              type="time"
              defaultValue={date.ending_time}
              onChange={(e) => setDateEndingTime(key, e.target.value, data, setData)}
            />
          </div>

          {key > 0 && (
            <ActiveeButton
              buttonType="warning"
              onClick={() => {
                dateList.splice(key, 1);
                setData({ ...data, dates: dateList });
              }}>
              Löschen
            </ActiveeButton>
          )}
        </div>
      ))}
      {dateList.length <= 5 && (
        <ActiveeButton
          buttonType="primary"
          onClick={() => {
            dateList.push(dateTemplate);
            setData({ ...data, dates: dateList });
          }}>
          Termin hinzufügen
        </ActiveeButton>
      )}
    </div>
  );
}
