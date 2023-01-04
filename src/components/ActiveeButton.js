import React from "react";
import "../assets/css/ActiveeButton.css";

export function ActiveeButton({ onClick, buttonType, iconSrc, children, isDisabled }) {
  if (iconSrc != null) {
    return (
      <button
        onClick={onClick}
        className={`activee-button ${buttonType} ${isDisabled ? "disabled" : ""} ${children ? "gap" : ""}`}>
        <img className="activee-button-icon" src={iconSrc} alt="Button icon" />
        <span>{children}</span>
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={isDisabled ? "activee-button disabled" : `activee-button ${buttonType}`}
        disabled={isDisabled}>
        {children}
      </button>
    );
  }
}
