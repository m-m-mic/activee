import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import "../assets/css/Login.css";
import { useCookies } from "react-cookie";

export function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userId", "userType", "userFirstName", "userLastName"]);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  useEffect(() => {
    document.title = "Anmelden - activee";
  });
  const handleLogin = (email, password) => {
    const url = "http://localhost:1337/account";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => handleCookies(data.id, data.type, data.first_name, data.last_name))
      .then(() => navigate("/"));
  };
  const handleCookies = (userId, userType, userFirstName, userLastName) => {
    setCookie("userId", userId, {
      path: "/",
    });
    setCookie("userType", userType, {
      path: "/",
    });
    setCookie("userFirstName", userFirstName, {
      path: "/",
    });
    setCookie("userLastName", userLastName, {
      path: "/",
    });
  };
  return (
    <>
      <div className="login-hero">Willkommen zurück</div>
      <div className="login-wrapper">
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
            placeholder="Password"
          />
        </div>
        <div className="login-buttons">
          <ActiveeButton buttonType="primary" onClick={() => handleLogin(emailInput, passwordInput)}>
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
}
