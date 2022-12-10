import React from "react";
import "../assets/css/VerticalButton.css";

export function VerticalButton({ iconUrl, isChecked, onClick, children }) {
  return (
    <span onClick={onClick} className={isChecked ? "vertical-button" : "vertical-button unchecked"}>
      <img className="vertical-button-icon" src={iconUrl} alt="button icon" />
      <div className="vertical-button-title">{children}</div>
    </span>
  );
}
