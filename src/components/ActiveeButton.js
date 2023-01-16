import React from "react";
import "../assets/css/ActiveeButton.css";

/**
 * Button-Komponente von Activee
 * @param onClick
 * @param buttonType
 * @param iconSrc
 * @param children
 * @param isDisabled
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeButton({ onClick, buttonType, iconSrc, children, isDisabled }) {
  // Struktur, wenn ein Icon mitgegeben wird
  if (iconSrc != null) {
    return (
      <button onClick={onClick} disabled={isDisabled} className={`activee-button ${buttonType} ${children ? "gap" : ""}`}>
        <img className="activee-button-icon" src={iconSrc} alt="Button icon" />
        <span>{children}</span>
      </button>
    );
  } else {
    // Struktur ohne Icon
    return (
      <button onClick={onClick} className={`activee-button ${buttonType}`} disabled={isDisabled}>
        {children}
      </button>
    );
  }
}
