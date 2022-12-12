import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { LandingPage } from "../components/LandingPage";
import { useCookies } from "react-cookie";
import { Subtitle } from "../components/Subtitle";
import { UnderConstruction } from "../components/UnderConstruction";

export function Home() {
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  useEffect(() => {
    if (cookies.userToken) {
      document.title = "Übersicht - activee";
    } else {
      document.title = "activee";
    }
  });
  if (cookies.userToken) {
    return (
      <>
        <h1>Guten Tag, Name!</h1>
        {cookies.userType === "organisation" && <Subtitle>Club name</Subtitle>}
        <div>
          <NavLink to={`/activity/0`}>
            <ActiveeButton buttonType="primary">Activity</ActiveeButton>
          </NavLink>
          {cookies.userType === "organisation" && (
            <NavLink to={`/activity/new`}>
              <ActiveeButton buttonType="primary">New Activity</ActiveeButton>
            </NavLink>
          )}
        </div>
        <h2>Anstehende Termine</h2>
        <UnderConstruction />
        <h2>Deine Aktivitäten</h2>
        <UnderConstruction />
        <h2>Sportarten</h2>
        <UnderConstruction />
        <h2>Empfehlungen für Dich</h2>
        <UnderConstruction />
      </>
    );
  } else {
    return <LandingPage />;
  }
}
