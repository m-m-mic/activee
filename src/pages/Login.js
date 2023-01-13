import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import "../assets/css/Login.css";
import { useCookies } from "react-cookie";
import { WarningDisclaimer } from "../components/WarningDisclaimer";
import { handleCookieChange } from "../scripts/handleCookieChange";
import { backendUrl } from "../index";

export function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [wrongEmailDisclaimerVisible, setWrongEmailDisclaimerVisible] = useState(false);
  const [wrongPasswordDisclaimerVisible, setWrongPasswordDisclaimerVisible] = useState(false);

  // Fügt Keydown EventListener bei ComponentMount hinzu und entfernt ihn wieder bei Unmount
  useEffect(() => {
    document.title = "Anmelden - activee";
    document.addEventListener("keydown", confirmInputs);
    return () => {
      document.removeEventListener("keydown", confirmInputs);
    };
  });

  // Login wird durchgeführt, wenn Nutzer 'Enter' drückt
  const confirmInputs = (e) => {
    if (e.key === "Enter") handleLogin(emailInput, passwordInput);
  };

  // Versucht Nutzer einzuloggen. Bei Erfolg gibt das Backend einen Token, Nutzer-ID, Nutzer-Typ und Nutzer-Tier zurück,
  // welche in die Cookies geschrieben werden
  const handleLogin = (email, password) => {
    const url = backendUrl + "/account/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 404) {
        setWrongEmailDisclaimerVisible(true);
        setWrongPasswordDisclaimerVisible(false);
        setEmailWarning(true);
        return;
      } else if (response.status === 403) {
        setWrongEmailDisclaimerVisible(false);
        setWrongPasswordDisclaimerVisible(true);
        setPasswordWarning(true);
        return;
      }
      response
        .json()
        .then((data) => handleCookieChange(setCookie, data.token, data.id, data.type, data.tier))
        .then(() => navigate(-1));
    });
  };

  if (!cookies.userToken) {
    return (
      <>
        <div className="login-hero">Willkommen zurück</div>
        <div className="login-wrapper">
          <div className="login-input-wrapper">
            <input
              value={emailInput}
              onChange={(e) => {
                setEmailWarning(false);
                setEmailInput(e.target.value);
              }}
              className={emailWarning ? "login-input warning" : "login-input"}
              type="email"
              placeholder="E-Mail"
            />
            <input
              value={passwordInput}
              onChange={(e) => {
                setPasswordWarning(false);
                setPasswordInput(e.target.value);
              }}
              className={passwordWarning ? "login-input warning" : "login-input"}
              type="password"
              placeholder="Passwort"
            />
          </div>
          <div className="login-buttons">
            <ActiveeButton
              buttonType="primary"
              onClick={() => handleLogin(emailInput, passwordInput)}
              isDisabled={emailInput === "" || passwordInput === ""}>
              Anmelden
            </ActiveeButton>
          </div>
        </div>
        <WarningDisclaimer isDisclaimerVisible={wrongEmailDisclaimerVisible}>
          Email konnte nicht gefunden werden
        </WarningDisclaimer>
        <WarningDisclaimer isDisclaimerVisible={wrongPasswordDisclaimerVisible}>
          Es wurde ein falsches Password eingegeben
        </WarningDisclaimer>
        <div className="login-no-account-wrapper">
          <NavLink to="/register" className="login-no-account-button">
            Noch kein Konto?
          </NavLink>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
