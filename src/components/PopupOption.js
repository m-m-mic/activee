import React from "react";
import { NavLink } from "react-router-dom";

export function PopupOption({ ImageSrc, LinkUrl, children, isLast }) {
  return (
    <div>
      <NavLink className="options-selection" to={LinkUrl}>
        <img className="options-icon" src={ImageSrc} alt="Options icon" />
        {children}
      </NavLink>
      {!isLast && <hr />}
    </div>
  );
}
