import React, { useEffect } from "react";
import CancelIconBlack from "../assets/svgs/cancel_icon_black.svg";
import { ActiveeButton } from "./ActiveeButton";
import "../assets/css/WarningModal.css";

export function WarningModal({ isWarningModalVisible, setWarningModalVisible, onClick, title, action, children }) {
  useEffect(() => {
    if (isWarningModalVisible) {
      document.body.style.overflow = "hidden";
    }
    return function cleanup() {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="warning-modal">
      <div className="warning-modal-container">
        <div className="warning-modal-header">
          <span>{title}</span>
        </div>
        <div>{children}</div>
        <div className="warning-modal-options">
          <ActiveeButton buttonType="outline" onClick={() => setWarningModalVisible(false)}>
            Abbrechen
          </ActiveeButton>
          <ActiveeButton buttonType="warning" onClick={onClick}>
            Ja, {action}
          </ActiveeButton>
        </div>
      </div>
    </div>
  );
}
