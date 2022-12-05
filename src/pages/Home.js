import React from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";

export function Home() {
  return (
    <>
      <h1>Guten Tag, Max</h1>
      <div>
        <NavLink to="/activity/0">
          <ActiveeButton buttonType="primary">Activity</ActiveeButton>
        </NavLink>
      </div>
    </>
  );
}
