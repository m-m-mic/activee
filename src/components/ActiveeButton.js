import React from "react";
import "../assets/css/ActiveeButton.css";

export function ActiveeButton({ onClick, buttonType, iconSrc, children }) {
  if (iconSrc != null) {
    return (
      <button onClick={onClick} className={`activee-button ${buttonType}`}>
        <img className="activee-button-icon" src={iconSrc} alt="Button icon" />
        {children}
      </button>
    );
  } else {
    return (
      <button onClick={onClick} className={`activee-button ${buttonType}`}>
        {children}
      </button>
    );
  }
}
