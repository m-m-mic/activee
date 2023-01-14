import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/css/Sports.css";
import { Navigate } from "react-router-dom";
import { getSports } from "../scripts/fetchRequests";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { ActiveeCard } from "../components/ActiveeCard";

/**
 * Seite mit allen Sportarten von Activee
 * @returns {JSX.Element}
 * @constructor
 */
export function Sports() {
  const [cookies, setCookies] = useCookies(["userToken"]);
  const [sports, setSports] = useState([]);
  useEffect(() => {
    if (cookies.userToken) {
      document.title = "Sportarten - activee";
      getSports(cookies.userToken, setSports);
    }
  }, []);

  if (cookies.userToken) {
    if (!sports) {
      return <LoadingAnimation />;
    }
    return (
      <>
        <h1>Sportarten</h1>
        <div className="sports-list">
          {sports.map((item, key) => (
            <ActiveeCard item={item} sport={true} compact={true} key={key} />
          ))}
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
