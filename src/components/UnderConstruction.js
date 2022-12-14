import React from "react";
import WarningIconBlack from "../assets/svgs/warning_icon_black.svg";
export const UnderConstruction = () => {
  return (
    <div className="under-construction">
      <img className="under-construction-icon" alt="Warning" src={WarningIconBlack} />
      <span>Under construction!</span>
    </div>
  );
};
