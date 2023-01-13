import React from "react";
import "../assets/css/HorizontalButton.css";

/**
 * Plain-Buttons mit einem Icon und Text
 * @param iconUrl
 * @param children
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export function HorizontalButton({ iconUrl, children, onClick }) {
  return (
    <span className="horizontal-button" onClick={onClick}>
      <img className="horizontal-button-icon" src={iconUrl} alt="button icon" />
      <div className="horizontal-button-title">{children}</div>
    </span>
  );
}
