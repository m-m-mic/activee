import React from "react";
import "../assets/css/Footer.css";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <div id="footer">
      <NavLink to="/about">Über uns</NavLink>
      <NavLink to="/impressum">Impressum</NavLink>
    </div>
  );
}
