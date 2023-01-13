import React from "react";
import "../assets/css/ActiveeChip.css";

/**
 * Chip-Komponente von Activee
 * @param iconUrl
 * @param children
 * @param primary
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeChip({ iconUrl, children, primary }) {
  return (
    <span className={`activee-tag ${!iconUrl && "without-icon"} ${primary && "primary"}`}>
      {iconUrl && <img className="activee-tag-icon" src={iconUrl} alt="tag icon" />}
      <div className="activee-tag-text">{children}</div>
    </span>
  );
}
