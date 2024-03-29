import React, { useState } from "react";
import "../assets/css/ActiveeCheckbox.css";
import CheckmarkIconWhite from "../assets/svgs/checkmark_icon_white.svg";

/**
 * Checkbox-Komponente von Activee
 * @param onChange
 * @param defaultValue
 * @param disabled
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeCheckbox({ onChange, defaultValue, disabled, children }) {
  const [value, setValue] = useState(defaultValue);
  const [checked, setChecked] = useState(defaultValue);

  // Dreht Value und Check der Box um, wenn Nutzer auf das oberste div der Komponente klicken
  const handleCheck = () => {
    if (!disabled) {
      setValue(!value);
      setChecked(!checked);
      onChange();
    }
  };

  return (
    <div className="activee-checkbox-container">
      <div className="activee-checkbox-wrapper" onClick={handleCheck}>
        <input type="checkbox" onChange={onChange} />
        <span className={`activee-checkbox ${checked ? "selected" : "unselected"} ${disabled ? "disabled" : "enabled"}`}>
          <img className={`activee-checkmark ${checked ? "selected" : "unselected"}`} src={CheckmarkIconWhite} alt="Checkmark" />
        </span>
      </div>
      <span className="activee-checkbox-label">{children}</span>
    </div>
  );
}
