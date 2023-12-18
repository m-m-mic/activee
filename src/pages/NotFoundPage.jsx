import React from "react";
import "../assets/css/NotFoundPage.css";
import { NavLink } from "react-router-dom";
import NotFoundSmileyBlack from "../assets/svgs/404_smiley_black.svg";

/**
 * Seite für 404-Redirects
 * @returns {JSX.Element}
 * @constructor
 */
export function NotFoundPage() {
  return (
    <div className="not-found-container">
      <img className="not-found-smiley" src={NotFoundSmileyBlack} alt="Sad face" />
      <div className="not-found-hero">Etwas ist schief gegangen!</div>
      <div className="not-found-subtitle">Keine Aktivitäten weit und breit...</div>
      <NavLink className="not-found-link" to="/">
        Zurück zur Startseite
      </NavLink>
    </div>
  );
}
