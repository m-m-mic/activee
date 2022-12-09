import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { LandingPage } from "../components/LandingPage";
import { useCookies } from "react-cookie";

export function Home() {
  const [cookies, setCookies] = useCookies(["userId", "userType", "userFirstName"]);
  useEffect(() => {
    if (cookies.userType === "participant" || cookies.userType === "organisation") {
      document.title = "Übersicht - activee";
    } else {
      document.title = "activee";
    }
  });
  if (cookies.userType === "participant") {
    return (
      <>
        <h1>Guten Tag, Name!</h1>
        <div>
          <NavLink to={`/activity/0`}>
            <ActiveeButton buttonType="primary">Activity</ActiveeButton>
          </NavLink>
        </div>
      </>
    );
  } else if (cookies.userType === "organisation") {
    return (
      <>
        <h1>Guten Tag, Name!</h1>
        <div>
          <NavLink to={`/activity/0`}>
            <ActiveeButton buttonType="primary">Activity</ActiveeButton>
          </NavLink>
          <NavLink to={`/activity/new`}>
            <ActiveeButton buttonType="primary">New Activity</ActiveeButton>
          </NavLink>
        </div>
      </>
    );
  } else {
    return <LandingPage />;
  }
}
