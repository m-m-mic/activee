import React from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { useUser } from "../layouts/Layout";
import { LandingPage } from "../components/LandingPage";

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
    return <LandingPage />;
  }
}
