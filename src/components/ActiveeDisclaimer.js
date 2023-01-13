import React, { useEffect } from "react";
import "../assets/css/Disclaimers.css";
import WarningIconBlack from "../assets/svgs/warning_icon_black.svg";
import ThumbsUpFilledBlack from "../assets/svgs/thumbs_up_filled_icon_black.svg";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";

/**
 * Disclaimer-Komponente von Activee. Kann entweder type = fixed oder type = closable sein. Schließt sich bei timed = true
 * nach 5000ms.
 * @param children
 * @param isDisclaimerVisible
 * @param setIsDisclaimerVisible
 * @param variant
 * @param type
 * @param timed
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeDisclaimer({
  children,
  isDisclaimerVisible,
  setIsDisclaimerVisible,
  variant = "warning",
  type = "fixed",
  timed = false,
}) {
  // Schließt Disclaimer nach 5000ms, wenn timed = true ist
  useEffect(() => {
    if (timed && isDisclaimerVisible) {
      timer().then(() => setIsDisclaimerVisible(false));
    }
  }, [isDisclaimerVisible]);

  async function timer() {
    return new Promise((res) => setTimeout(res, 5000));
  }

  // Schließbarer Disclaimer
  if (type === "closable") {
    return (
      <div
        className={`disclaimer-container ${!isDisclaimerVisible && "hidden"} ${type}`}
        onClick={() => setIsDisclaimerVisible(false)}>
        <div className={`disclaimer ${variant} ${type}`}>
          <img
            className="disclaimer-icon"
            src={variant === "warning" ? WarningIconBlack : ThumbsUpFilledBlack}
            alt="Warning icon"
          />
          <span className={`disclaimer-text ${variant === "warning" && "warning"}`}>{children}</span>
          <img className="disclaimer-icon pointer" src={CancelIconBlack} alt="Cancel icon" />
        </div>
      </div>
    );
  }
  // Fester Disclaimer
  if (type === "fixed") {
    return (
      <div className={`disclaimer-container ${!isDisclaimerVisible && "hidden"} ${type}`}>
        <div className={`disclaimer ${variant} ${type}`}>
          <img
            className="disclaimer-icon"
            src={variant === "warning" ? WarningIconBlack : ThumbsUpFilledBlack}
            alt="Warning icon"
          />
          <span className={`disclaimer-text ${variant === "warning" && "warning"}`}>{children}</span>
        </div>
      </div>
    );
  }
}
