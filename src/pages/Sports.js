import React from "react";
import { useCookies } from "react-cookie";
import { UnderConstruction } from "../components/UnderConstruction";
import { Navigate } from "react-router-dom";

/**
 * Seite mit allen Sportarten von Activee
 * @returns {JSX.Element}
 * @constructor
 */
export function Sports() {
  const [cookies, setCookies] = useCookies(["userToken"]);

  if (cookies.userToken) {
    return (
      <>
        <h1>Sportarten</h1>
        <UnderConstruction />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
