import React from "react";
import "../assets/css/WarningDisclaimer.css";
import WarningIconBlack from "../assets/svgs/warning_icon_black.svg";

export function WarningDisclaimer({ children, isDisclaimerVisible }) {
  return (
    <div className={isDisclaimerVisible ? "warning-disclaimer" : "warning-disclaimer hidden"}>
      <img className="warning-icon" src={WarningIconBlack} alt="Warning icon" />
      <span className="warning-text">{children}</span>
    </div>
  );
}
