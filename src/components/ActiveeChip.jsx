import React from "react";
import "../assets/css/ActiveeChip.css";

/**
 * Chip-Komponente von Activee
 * @param iconUrl
 * @param children
 * @param primary
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeChip({ iconUrl, children, primary, onClick }) {
  return (
    <span onClick={onClick} className={`activee-chip ${!iconUrl && "without-icon"} ${primary && "primary"}`}>
      {iconUrl && <img className="activee-chip-icon" src={iconUrl} alt="chip icon" />}
      <div className="activee-chip-text">{children}</div>
    </span>
  );
}
