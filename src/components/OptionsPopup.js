import React from "react";
import { NavLink } from "react-router-dom";

export function OptionsPopup() {
  return (
    <div className="options-popup">
      <NavLink className="options-selection" to="/profile">
        Dein Profil
      </NavLink>
      <hr />
      <NavLink className="options-selection" to="/my-activities">
        Deine Aktivitäten
      </NavLink>
      <hr />
      <NavLink className="options-selection" to="/sports">
        Sportarten
      </NavLink>
      <hr />
      <NavLink className="options-selection" to="/settings">
        Einstellungen
      </NavLink>
    </div>
  );
}
