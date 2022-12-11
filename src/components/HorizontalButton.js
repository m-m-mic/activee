import React from "react";
import "../assets/css/HorizontalButton.css";
import DeleteIconWhite from "../assets/svgs/delete_icon_white.svg";

export function HorizontalButton({ iconUrl, children, editMode, onClick, value }) {
  if (editMode) {
    return (
      <span className="horizontal-button-edit-mode">
        <span className="horizontal-button-data">
          <img className="horizontal-button-icon" src={iconUrl} alt="button icon" />
          <div className="horizontal-button-title">{children}</div>
        </span>
        <img onClick={onClick} className="horizontal-delete-icon" src={DeleteIconWhite} alt="button icon" />
      </span>
    );
  } else {
    return (
      <span className="horizontal-button">
        <img className="horizontal-button-icon" src={iconUrl} alt="button icon" />
        <div className="horizontal-button-title">{children}</div>
      </span>
    );
  }
}
