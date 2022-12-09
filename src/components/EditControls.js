import React from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "../assets/svgs/edit_icon_white.svg";

export function EditControls() {
  return (
    <div className="profile-edit-options">
      <NavLink className="profile-edit-link" to={`/profile`}>
        <img className="profile-edit-icon" src={EditIcon} alt="Edit icon" />
      </NavLink>
      <span className="profile-edit-divider" />
      <NavLink className="profile-edit-link" to={`/profile`}>
        <img className="profile-edit-icon" src={EditIcon} alt="Edit icon" />
      </NavLink>
    </div>
  );
}
