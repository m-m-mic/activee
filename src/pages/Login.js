import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import "../assets/css/Login.css";

export function Login() {
  useEffect(() => {
    document.title = "Anmelden - activee";
  });
  return (
    <>
      <div className="login-hero">Willkommen zurück</div>
      <div className="login-wrapper">
        <div className="login-input-wrapper">
          <input className="login-input" placeholder="E-Mail" />
          <input className="login-input" type="password" placeholder="Password" />
        </div>
        <div className="login-buttons">
          <NavLink to={`/?user=participant`}>
            <ActiveeButton buttonType="primary">Teilnehmer</ActiveeButton>
          </NavLink>
          <NavLink to={`/?user=organisation`}>
            <ActiveeButton buttonType="primary">Verein</ActiveeButton>
          </NavLink>
        </div>
      </div>
    </>
  );
}
