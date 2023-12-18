import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton.jsx";
import "../assets/css/Login.css";
import { useCookies } from "react-cookie";
import { ActiveeDisclaimer } from "../components/ActiveeDisclaimer.jsx";
import { handleCookieChange } from "../scripts/handleCookieChange";
import { backendUrl } from "../index.jsx";
import FetchingAnimation from "../assets/apngs/fetching_100px.png";
import { CautionDisclaimer } from "../components/CautionDisclaimer.jsx";

/**
 * Login Seite
 * @returns {JSX.Element}
 * @constructor
 */
export function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [disclaimerMessage, setDisclaimerMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

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
    setIsFetching(true);
    const url = backendUrl + "/account/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 404) {
        // Error-Handling für falsche E-Mail
        setIsDisclaimerVisible(true);
        setDisclaimerMessage("E-Mail konnte nicht gefunden werden");
        setEmailWarning(true);
        setIsFetching(false);
        return;
      } else if (response.status === 403) {
        // Error-Handling für falsche Password
        setIsDisclaimerVisible(true);
        setDisclaimerMessage("Es wurde ein falsches Password eingegeben");
        setPasswordWarning(true);
        setIsFetching(false);
        return;
      }
      response
        .json()
        .then((data) => handleCookieChange(setCookie, data.token, data.id, data.type, data.tier))
        .then(() => {
          setIsFetching(false);
          navigate(-1);
        });
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
              iconSrc={isFetching ? FetchingAnimation : null}
              onClick={() => handleLogin(emailInput, passwordInput)}
              isDisabled={emailInput === "" || passwordInput === "" || isFetching}>
              {!isFetching && "Anmelden"}
            </ActiveeButton>
          </div>
        </div>
        <ActiveeDisclaimer isDisclaimerVisible={isDisclaimerVisible}>{disclaimerMessage}</ActiveeDisclaimer>
        <div className="login-no-account-wrapper">
          <NavLink to="/register" className="login-no-account-button">
            Noch kein Konto?
          </NavLink>
        </div>
        <div className="login-options">
          <h3>Testprofile</h3>
          <div className="login-option">
            <h4>Teilnehmer:in</h4>
            <div>E-Mail: roza.kovaci@gmail.com</div>
            <div>Passwort: password</div>
          </div>
          <div className="login-option">
            <h4>Übungsleiter:in</h4>
            <div>E-Mail: adele.vogt@tsv-muenchen.de</div>
            <div>Passwort: password</div>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
