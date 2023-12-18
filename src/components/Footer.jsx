import React from "react";
import "../assets/css/Footer.css";
import { NavLink } from "react-router-dom";

/**
 * Footer von Activee
 * @returns {JSX.Element}
 * @constructor
 */
export function Footer() {
  return (
    <div id="footer">
      <div className="footer-section">
        <NavLink to="/about-us">Über uns</NavLink>
      </div>
      <div className="footer-section">
        <NavLink to="/impressum">Impressum</NavLink>
      </div>
    </div>
  );
}
