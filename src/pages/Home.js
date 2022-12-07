import React from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { useUser } from "../layouts/Layout";

export function Home() {
  const user = useUser();
  if (user === "participant") {
    return (
      <>
        <h1>Guten Tag, Participant</h1>
        <div>
          <NavLink to={`/activity/0?user=${user}`}>
            <ActiveeButton buttonType="primary">Activity</ActiveeButton>
          </NavLink>
        </div>
      </>
    );
  } else if (user === "organisation") {
    return (
      <>
        <h1>Guten Tag, Organisation</h1>
        <div>
          <NavLink to={`/activity/0?user=${user}`}>
            <ActiveeButton buttonType="primary">Activity</ActiveeButton>
          </NavLink>
          <NavLink to={`/activity/new?user=${user}`}>
            <ActiveeButton buttonType="primary">New Activity</ActiveeButton>
          </NavLink>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>Landing page</h1>
        <NavLink to={`/?user=participant`}>
          <ActiveeButton buttonType="primary">Als Teilnehmer anmelden</ActiveeButton>
        </NavLink>
        <NavLink to={`/?user=organisation`}>
          <ActiveeButton buttonType="primary">Als Verein anmelden</ActiveeButton>
        </NavLink>
        <div className="filler-div"></div>
      </div>
    );
  }
}
