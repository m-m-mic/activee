import React from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "./ActiveeButton";
import ActiveeLogo50 from "../assets/pngs/50px_activee_logo.png";
import "../assets/css/LandingPage.css";

export function LandingPage() {
  return (
    <>
      <div className="activee-banner">
        <img src={ActiveeLogo50} alt="activee Logo" />
        <span className="activee-name-large">activee</span>
      </div>
      <div>
        Sport kann eine sehr wichtige Rolle bei der Integration spielen! Sport ist wie Klebstoff; ein verbindendes Element.
        <br />
        Egal welche Sportart, mit <b>activee</b> findest du deinen Verein.
      </div>
      <h1>Sei dabei!</h1>
      <div className="action-buttons">
        <ActiveeButton buttonType="primary">Registrieren</ActiveeButton>
        <NavLink to="/login">
          <ActiveeButton buttonType="outline">Anmelden</ActiveeButton>
        </NavLink>
      </div>
    </>
  );
}
