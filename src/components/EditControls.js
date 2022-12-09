import React from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "../assets/svgs/edit_icon_white.svg";

export function EditControls({ user }) {
  return (
    <div className="profile-edit-options">
      <NavLink className="profile-edit-link" to={`/profile?user=${user}`}>
        <img className="profile-edit-icon" src={EditIcon} alt="Edit icon" />
      </NavLink>
      <span className="profile-edit-divider" />
      <NavLink className="profile-edit-link" to={`/profile?user=${user}`}>
        <img className="profile-edit-icon" src={EditIcon} alt="Edit icon" />
      </NavLink>
    </div>
  );
}
