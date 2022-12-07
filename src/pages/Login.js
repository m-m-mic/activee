import React from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import "../assets/css/Login.css";

export function Login() {
  return (
    <>
      <h1>Anmelden</h1>
      <div className="login-buttons">
        <NavLink to={`/?user=participant`}>
          <ActiveeButton buttonType="primary">Teilnehmer</ActiveeButton>
        </NavLink>
        <NavLink to={`/?user=organisation`}>
          <ActiveeButton buttonType="primary">Verein</ActiveeButton>
        </NavLink>
      </div>
    </>
  );
}
