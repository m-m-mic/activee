import React, { useState } from "react";
import "../assets/css/DatePicker.css";
import Select from "react-select";
import { setDateDayInput, setDateEndingTime, setDateStartingTime } from "../scripts/handleInputs";
import { dateTemplate, weekdayPreselect } from "../scripts/inputTemplates";
import { ActiveeButton } from "./ActiveeButton";
import DeleteIconWhite from "../assets/svgs/delete_icon_white.svg";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";

export function DatePicker({ data, setData }) {
  const [weekdays, setWeekdays] = useState(weekdayPreselect);
  return (
    <div className="date-picker">
      {data.dates.map((date, key) => (
        <div key={date.id} className="date-picker-item">
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
          {data.dates.length > 1 && (
            <ActiveeButton
              buttonType="warning"
              iconSrc={DeleteIconWhite}
              onClick={() => {
                const dates = data.dates;
                dates.splice(key, 1);
                setData({ ...data, dates: dates });
              }}></ActiveeButton>
          )}
        </div>
      ))}
      {data.dates.length <= 4 && (
        <ActiveeButton
          buttonType="blank"
          iconSrc={AddIconBlack}
          onClick={() => {
            setData({ ...data, dates: [...data.dates, { ...dateTemplate, id: crypto.randomUUID() }] });
          }}>
          Termin hinzufügen
        </ActiveeButton>
      )}
    </div>
  );
}
