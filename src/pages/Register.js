import React, { useState } from "react";
import "../assets/css/Register.css";
import { ActiveeButton } from "../components/ActiveeButton";
import { accountTemplate } from "../scripts/inputTemplates";
import {
  NewAccountInputValidator,
  setBirthdayInput,
  setClubNameInput,
  setEmailInput,
  setFirstNameInput,
  setLastNameInput,
  setPasswordInput,
  setPasswordRepeatInput,
} from "../scripts/handleInputs";
import { WarningDisclaimer } from "../components/WarningDisclaimer";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { registerAccount } from "../scripts/fetchRequests";

export function Register() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [accountInfo, setAccountInfo] = useState(accountTemplate);
  const [validation, setValidation] = useState(NewAccountInputValidator);
  const [warningVisibility, setWarningVisibility] = useState(false);
  const [warning, setWarning] = useState("Error");

  if (!cookies.userToken) {
    return (
      <>
        <div className="login-hero">Account erstellen</div>
        <WarningDisclaimer isDisclaimerVisible={warningVisibility}>{warning}</WarningDisclaimer>
        <div className="register-inputs">
          <h4>Art des Accounts *</h4>
          <div className="register-type">
            <span>
              <ActiveeButton
                buttonType={accountInfo.type === "participant" ? "primary" : "disabled"}
                onClick={() => {
                  setAccountInfo({ ...accountInfo, type: "participant", tier: "parent", club: null });
                  setValidation({ ...validation, club: true });
                }}>
                Teilnehmer:in
              </ActiveeButton>
            </span>
            <span>
              <ActiveeButton
                buttonType={accountInfo.type === "organisation" ? "primary" : "disabled"}
                onClick={() => {
                  setAccountInfo({ ...accountInfo, type: "organisation", tier: "child" });
                  setValidation({ ...validation, club: false });
                }}>
                Übungsleiter:in
              </ActiveeButton>
            </span>
          </div>
          <h4>Name *</h4>
          <div className="register-names">
            <input
              className={validation.first_name ? "" : "warning"}
              placeholder="Vorname..."
              onChange={(e) => setFirstNameInput(e.target.value, accountInfo, setAccountInfo, validation, setValidation)}
            />
            <input
              className={validation.last_name ? "" : "warning"}
              placeholder="Nachname..."
              onChange={(e) => setLastNameInput(e.target.value, accountInfo, setAccountInfo, validation, setValidation)}
            />
          </div>
          {accountInfo.type === "organisation" && (
            <>
              <h4>Verein *</h4>
              <input
                className={validation.club ? "" : "warning"}
                placeholder="Vereinsname..."
                onChange={(e) => setClubNameInput(e.target.value, accountInfo, setAccountInfo, validation, setValidation)}
              />
            </>
          )}
          <h4>Geburtsdatum</h4>
          <input
            className={validation.birthday ? "" : "warning"}
            type="date"
            onChange={(e) => setBirthdayInput(e.target.value, accountInfo, setAccountInfo, validation, setValidation)}
          />
          <h4>E-Mail *</h4>
          <input
            className={validation.email ? "" : "warning"}
            type="email"
            autoComplete="off"
            placeholder="E-Mail"
            onChange={(e) => setEmailInput(e.target.value, accountInfo, setAccountInfo, validation, setValidation)}
          />
          <h4>Passwort *</h4>
          <input
            className={validation.password ? "" : "warning"}
            type="password"
            placeholder="Passwort..."
            onChange={(e) => setPasswordInput(e.target.value, accountInfo, setAccountInfo, validation, setValidation)}
          />
          <input
            className={validation.password_repeat ? "" : "warning"}
            type="password"
            placeholder="Passwort wiederholen..."
            onChange={(e) => setPasswordRepeatInput(e.target.value, accountInfo, validation, setValidation)}
          />
          <div className="register-mandatory-disclaimer">* Pflichtfeld</div>
        </div>
        <div className="register-button">
          <ActiveeButton
            buttonType="primary"
            onClick={() => registerAccount(accountInfo, validation, setCookie, navigate, setWarningVisibility, setWarning)}>
            Registrieren
          </ActiveeButton>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
