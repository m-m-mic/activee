import React from "react";
import "../assets/css/Disclaimers.css";
import WarningIconBlack from "../assets/svgs/warning_icon_black.svg";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";

export function WarningDisclaimer({ children, isDisclaimerVisible, setIsDisclaimerVisible, closable = false }) {
  if (closable) {
    return (
      <div className={isDisclaimerVisible ? "warning-disclaimer-container" : "warning-disclaimer-container hidden"}>
        <div className="warning-disclaimer closable">
          <img className="warning-icon" src={WarningIconBlack} alt="Warning icon" />
          <span className="warning-text">{children}</span>
          <img
            className="warning-icon pointer"
            src={CancelIconBlack}
            onClick={() => setIsDisclaimerVisible(false)}
            alt="Cancel icon"
          />
        </div>
      </div>
    );
  }
  return (
    <div className={isDisclaimerVisible ? "warning-disclaimer" : "warning-disclaimer hidden"}>
      <img className="warning-icon" src={WarningIconBlack} alt="Warning icon" />
      <span className="warning-text">{children}</span>
    </div>
  );
}
