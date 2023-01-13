import React, { useEffect } from "react";
import { ActiveeButton } from "./ActiveeButton";
import "../assets/css/WarningModal.css";

/**
 * Modal, welches den Nutzer vor einer irreversiblen Aktion warnt
 * @param isWarningModalVisible
 * @param setWarningModalVisible
 * @param onClick
 * @param title
 * @param action
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
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
    <>
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
      <div className="modal-background" onClick={() => setWarningModalVisible(false)}></div>
    </>
  );
}
