import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { UnderConstruction } from "../components/UnderConstruction";

export function YourActivities() {
  const [cookies, setCookies] = useCookies(["userToken"]);
  if (cookies.userToken) {
    return (
      <>
        <h1>Deine Aktivitäten</h1>
        <h2>Terminkalender</h2>
        <UnderConstruction />
        <h2>Anstehende Termine</h2>
        <UnderConstruction />
        <h2>Gemerkte Aktivitäten</h2>
        <UnderConstruction />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
