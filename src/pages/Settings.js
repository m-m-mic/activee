import React from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";

export function Settings() {
  return (
    <>
      <h1>Einstellungen</h1>
      <NavLink to="/">
        <ActiveeButton buttonType="warning">Ausloggen</ActiveeButton>
      </NavLink>
    </>
  );
}
