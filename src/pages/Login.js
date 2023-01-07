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
  const [wrongEmailDisclaimerVisible, setWrongEmailDisclaimerVisible] = useState(false);
  const [wrongPasswordDisclaimerVisible, setWrongPasswordDisclaimerVisible] = useState(false);
  useEffect(() => {
    document.title = "Anmelden - activee";
  });
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
        return;
      } else if (response.status === 403) {
        setWrongEmailDisclaimerVisible(false);
        setWrongPasswordDisclaimerVisible(true);
        return;
      }
      response
        .json()
        .then((data) => handleCookieChange(setCookie, data.token, data.id, data.type, data.tier))
        .then(() => navigate("/"));
    });
  };
  if (!cookies.userToken) {
    return (
      <>
        <div className="login-hero">Willkommen zurück</div>
        <div className="login-wrapper">
          <WarningDisclaimer isDisclaimerVisible={wrongEmailDisclaimerVisible}>
            E-Mail konnte nicht gefunden werden
          </WarningDisclaimer>
          <WarningDisclaimer isDisclaimerVisible={wrongPasswordDisclaimerVisible}>
            Es wurde ein falsches Password eingegeben
          </WarningDisclaimer>
          <div className="login-input-wrapper">
            <input
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              className="login-input"
              type="email"
              placeholder="E-Mail"
            />
            <input
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
              className="login-input"
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
        <div className="login-no-account-wrapper">
          <NavLink to="/" className="login-no-account-button">
            Noch kein Konto?
          </NavLink>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
