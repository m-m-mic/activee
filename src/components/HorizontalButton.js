import React from "react";
import "../assets/css/HorizontalButton.css";

export function HorizontalButton({ iconUrl, children }) {
  return (
    <span className="horizontal-button">
      <img className="horizontal-button-icon" src={iconUrl} alt="button icon" />
      <div className="horizontal-button-title">{children}</div>
    </span>
  );
}
